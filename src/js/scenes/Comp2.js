import {Player_I} from '../objects/Player_I.js'
import { Skull } from '../objects/Skull.js'
import { Trampa } from '../objects/Trampa.js'
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";

var players = [];
var skulls = [];
var bump;
var scores = [];
var counter = 0;

export class Comp2 extends Phaser.Scene{

    constructor() {
        super("Comp2");
    }

    init(){
        this.timer= new Timer(this,60000,()=>console.log("completed"))
    }

    preload(){
        }

    create(data){

        this.game.canvas.width = (960);
        this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height);

        const map = this.make.tilemap({ key: 'Comp2Map'});
        const tileset = map.addTilesetImage('Tileset', 'tileset');
        const platf = map.addTilesetImage('platform', 'plat');

        map.createStaticLayer('Background', tileset);
        const floor = map.createStaticLayer('Level', tileset);
        const platformsTile = map.createStaticLayer('Platform', platf);

        floor.setCollisionByProperty({ collides: true });

        var player1 = new Player_I(this, 300, 500, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this,player1,'W',0,'A','D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 800, 500, "dude2");
        player2.setPlayerInput(new KeyboardProcessor(this,player2,'U',0,'H','K', 'J', 'L'));
        players[1] = player2;
        players[0].puntos = data.jug1;
        players[1].puntos = data.jug2;

        this.physics.add.collider(players[0], players[1], function(){
            bump = true;
        });
        
        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);
        this.physics.add.collider(players[0], platformsTile);
        this.physics.add.collider(players[1], platformsTile);

        //Creación de todas las skulls
        skulls.push(new Skull(this, 30, 50, "calavera"));
        skulls.push(new Skull(this, 30, 165, "calavera"));
        skulls.push(new Skull(this, 95, 415, "calavera"));
        skulls.push(new Skull(this, 290, 325, "calavera"));

        skulls.push(new Skull(this, 345, 40, "calavera"));
        skulls.push(new Skull(this, 500, 225, "calavera"));
        skulls.push(new Skull(this, 620, 40, "calavera"));

        skulls.push(new Skull(this, 610, 415, "calavera"));
        skulls.push(new Skull(this, 800, 325, "calavera"));
        skulls.push(new Skull(this, 930, 165, "calavera"));
        skulls.push(new Skull(this, 930, 50, "calavera"));

        counter = 11;

        for (let i = 0; i < skulls.length; i += 1) {
            this.physics.add.collider(players[0], skulls[i], function () {
                skulls[i].desaparicion(players[0]);
                scores[0].setText("Jugador 1: " + players[0].points);
                counter--;
            });
            this.physics.add.collider(players[1], skulls[i], function () {
                skulls[i].desaparicion(players[1]);
                scores[1].setText("Jugador 2: " + players[1].points);
                counter--;
            });
        }

        scores[0] = this.add.text(30, 0, "Jugador 1: "+ players[0].puntos);
        scores[1] = this.add.text(735, 0, "Jugador 2: "+ players[1].puntos);

        this.addStageFloorCollisions(floor);

        this.timer.startTimer();
        this.timerText= this.add.text(this.game.config.width *0.5, 20,'test');


        console.log("Escena comp 2 creada");
    }

    update(){
        players[0].update(bump, players[1]);
        players[1].update(bump, players[0]);
        bump = false;
        this.timerText.setText(this.timer.getRemainingSeconds(true));

        if (counter == 0) {
            this.scene.start("Coop1", { jug1: players[0].points, jug2: players[1].points });
        }
    }

    setPlatformsColliders(){

        for (let i = 0; i < this.platforms.length; i++) {
            this.physics.add.collider(players[0],  this.platforms[i],()=>console.log("over platform" ))
            this.physics.add.collider(players[1],  this.platforms[i],()=>console.log("over platform" ))
        }
    }

    addStageFloorCollisions(floor) {
        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);
    }



    UpdatePlatforms(){
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].movePlatform()
        }
    }
}