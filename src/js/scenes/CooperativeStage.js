import {TaskManager} from "../objects/TaskManager.js";
import {Player_I} from "../objects/Player_I.js";
import {SpriteObject} from "../objects/SpriteObject.js";
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {Button} from "../objects/Button.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";

var players = [];
var chocarse;

export class CooperativeStage extends Phaser.Scene {

    constructor() {
        super("CooperativeStage");
        this.buttons = []
    }

    init() {
        this.timer= new Timer(this,20000,()=>console.log("completed"))

        this.taskManager = new TaskManager(4, ["J1", "J2", "J1", "J2"], [
            () => this.timer.addSeconds(5000),
            () => this.timer.addSeconds(5000),
            () => this.timer.addSeconds(5000),
            () => this.timer.addSeconds(5000)
        ], () => console.log("All tasks completed"));


    }

    preload() {

        this.load.tilemapTiledJSON('Coop1Map', '../Resources/assets/level/Coop1.json');
        this.load.spritesheet("dude", "./Resources/assets/items/dude.png", {frameWidth: 32, frameHeight: 48});//Current sprites from tutorial
    }

    create() {


        this.timer.startTimer()


        /// map and floor
        const map = this.make.tilemap({key: 'Coop1Map'});
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createLayer('Background', tileset);
        const floor = map.createLayer('Level', tileset);


        floor.setCollisionByProperty({collides: true});

        // ************** platforms
        this.platforms=[]
        var platform1= new Platform(this, 896, 128, '1x1', -64*4, 0)
        this.platforms.push(platform1)
        var platform2= new Platform(this, 768, 448, '1x1', -64*4, 0)
        this.platforms.push(platform2)
        var platform3 = new Platform(this, 192, 256, '1x1', -64*2, 0)
        this.platforms.push(platform3)
        var platform4 = new Platform(this, 384, 384, '1x1', 0, 64)
        this.platforms.push(platform4)

        var player1 = new Player_I(this, 928, 64, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this, player1, 'W', 0, 'A', 'D', 'S', 'F'));
        players[0] = player1;

        var player2 = new Player_I(this, 820, 384, "dude");
        player2.setPlayerInput(new KeyboardProcessor(this, player2, 'U', 0, 'J', 'L', 'K', 'I'));
        players[1] = player2;



        var button1_P1 = new Button(this, 480, 123, 'botonL', () => {
            platform2.enable();
            this.taskManager.taskCompleted()
        }, players[0]);

        var button2_P1 = new Button(this, 360, 443 + 128, 'botonL',  () => {
            platform4.enable();
            this.taskManager.taskCompleted()
        }, players[0]);

        var button1_P2 = new Button(this, 780, 443, 'botonR',  () => {
            platform1.enable();
            this.taskManager.taskCompleted()
        }, players[1]);

        var button2_P2 = new Button(this, 480, 443, 'botonR',  () => {
            platform3.enable();
            this.taskManager.taskCompleted();
        }, players[1]);


        //Colisiones
        this.physics.add.collider(players[0], players[1], function () {
            chocarse = true;

        });

        this.addStageFloorCollisions(floor)

        this.physics.add.collider(players[0],  this.platform1,()=>console.log("over platform" ))
        this.physics.add.collider(players[1],  this.platform1 )
        this.setPlatformsColliders()

        this.timerText= this.add.text(100,10,'test')
    }
    update() {
        this.timerText.setText(this.timer.getRemainingSeconds(true))
        players[0].update(chocarse, players[1]);
        players[1].update(chocarse, players[0]);
        this.UpdatePlatforms()

        chocarse = false;
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