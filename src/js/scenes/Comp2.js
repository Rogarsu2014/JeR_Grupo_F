import {Player_I} from '../objects/Player_I.js'
import { Skull } from '../objects/Skull.js'
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";

var players = [];
var calaveras = [];
var chocarse;
var puntuaciones = [];

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
        const map = this.make.tilemap({ key: 'Comp2Map'});
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createStaticLayer('Background', tileset);
        const floor = map.createStaticLayer('Level', tileset);
        
        this.platforms=[]
        var platform1= new Platform(this, 64 * 3, 64*5, 'platS', 0, 0)
        this.platforms.push(platform1)
        var platform2= new Platform(this, 64 * 2, 64*6, 'platS', 0, 0)
        this.platforms.push(platform2)
        var platform3= new Platform(this, 64 * 2, 64*8, 'platS', 0, 0)
        this.platforms.push(platform3)
        var platform4= new Platform(this, 64 * 4, 64*7, 'platS', 0, 0)
        this.platforms.push(platform4)
        var platform5= new Platform(this, 64 * 11, 64*5, 'platS', 0, 0)
        this.platforms.push(platform5)
        var platform6= new Platform(this, 64 * 10, 64*6, 'platS', 0, 0)
        this.platforms.push(platform6)
        var platform7= new Platform(this, 64 * 10, 64*8, 'platS', 0, 0)
        this.platforms.push(platform7)
        var platform8= new Platform(this, 64 * 12, 64*7, 'platS', 0, 0)
        this.platforms.push(platform8)
        var platform9= new Platform(this, 64 * 0, 64*2, 'platS', 0, 0)
        this.platforms.push(platform9)
        var platform10= new Platform(this, 64 * 14, 64*2, 'platS', 0, 0)
        this.platforms.push(platform10)
        var platform11= new Platform(this, 64 * 1, 64*3, 'platM', 0, 0)
        this.platforms.push(platform11)
        var platform12= new Platform(this, 64 * 12, 64*3, 'platM', 0, 0)
        this.platforms.push(platform12)
        var platform13= new Platform(this, 64 * 6.5, 64*4, 'platM', 0, 0)
        this.platforms.push(platform13)
        var platform14= new Platform(this, 64 * 4, 64*2, 'platS', 0, 0)
        this.platforms.push(platform14)
        var platform15= new Platform(this, 64 * 5, 64*3, 'platS', 0, 0)
        this.platforms.push(platform15)
        var platform16= new Platform(this, 64 * 10, 64*2, 'platS', 0, 0)
        this.platforms.push(platform16)
        var platform17= new Platform(this, 64 * 9, 64*3, 'platS', 0, 0)
        this.platforms.push(platform17)
        var platform18= new Platform(this, 64 * 5, 64*1, 'platM', 0, 0)
        this.platforms.push(platform18)
        var platform19= new Platform(this, 64 * 8, 64*1, 'platM', 0, 0)
        this.platforms.push(platform19)

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
            chocarse = true;
        });
        
        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);

        puntuaciones[0] = this.add.text(30, 0, "Jugador 1: "+ players[0].puntos);
        puntuaciones[1] = this.add.text(790, 0, "Jugador 2: "+ players[1].puntos);

        this.addStageFloorCollisions(floor);

        this.setPlatformsColliders();

        this.timer.startTimer();
        this.timerText= this.add.text(this.game.config.width *0.5, 20,'test');


        console.log("Escena comp 2 creada");
    }

    update(){
        players[0].update(chocarse, players[1]);
        players[1].update(chocarse, players[0]);
        chocarse = false;
        this.timerText.setText(this.timer.getRemainingSeconds(true));
        this.UpdatePlatforms();
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