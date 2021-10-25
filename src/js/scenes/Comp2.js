import {Player_I} from '../objects/Player_I.js'
import { Skull } from '../objects/Skull.js'
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";

var players = [];
var skulls = [];
var bump;
var scores = [];
var traps = [];
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

        this.game.canvas.width = (1408);
        this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height);

        const map = this.make.tilemap({ key: 'Comp2Map'});
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createStaticLayer('Background', tileset);
        const floor = map.createStaticLayer('Level', tileset);
        
        //this.platforms=[]
        //var platform1= new Platform(this, 0, 0, 'Comp2Platf', 0, 0)
        //this.platforms.push(platform1)

        floor.setCollisionByProperty({ collides: true });

        //Create the character at 0,0 and change its origin
        var player1 = new Player_I(this, 100, 300, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this,player1,'W',0,'A','D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 200, 300, "dude");
        player2.setPlayerInput(new KeyboardProcessor(this,player2,'U',0,'H','K', 'J', 'L'));
        players[1] = player2;
        players[0].puntos = data.jug1;
        players[1].puntos = data.jug2;

        this.physics.add.collider(players[0], players[1], function(){
            bump = true;
        });
        
        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);

        scores[0] = this.add.text(30, 0, "Jugador 1: "+ players[0].puntos);
        scores[1] = this.add.text(790, 0, "Jugador 2: "+ players[1].puntos);

        this.addStageFloorCollisions(floor);

        //this.setPlatformsColliders();

        this.timer.startTimer();
        this.timerText= this.add.text(this.game.config.width *0.5, 20,'test');


        console.log("Escena comp 2 creada");
    }

    update(){
        players[0].update(bump, players[1]);
        players[1].update(bump, players[0]);
        bump = false;
        this.timerText.setText(this.timer.getRemainingSeconds(true));
        //this.UpdatePlatforms();
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