import {Player_I} from '../objects/Player_I.js'
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {TaskManager} from "../objects/TaskManager.js";
import {Button} from "../objects/Button.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";

var players = [];
var chocarse;
var puntuaciones = [];

export class Coop2 extends Phaser.Scene {

    constructor() {
        super("Coop2");
    }

    init() {
        this.timer = new Timer(this, 20000, () => console.log("completed"))

        this.taskManager = new TaskManager(4, ["J1", "J2", "J1", "J2"], [
            () => this.timer.addSeconds(5000),
            () => this.timer.addSeconds(5000),
            () => this.timer.addSeconds(5000),
            () => this.timer.addSeconds(5000)
        ], () => console.log("All tasks completed"));
    }

    preload() {
    }

    create(data) {
        const map = this.make.tilemap({key: 'Coop2Map'});
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createStaticLayer('Background', tileset);

        // ************** platforms
        this.platforms = [];
        var platform1 = new Platform(this, 448, 448, '1x1', 64, -64)
        this.platforms.push(platform1)

        const floor = map.createStaticLayer('Level', tileset);

        floor.setCollisionByProperty({collides: true});

        //Creacion de pjs
        var player1 = new Player_I(this, 100, 500, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this, player1, 'W', 0, 'A', 'D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 200, 500, "dude");
        player2.setPlayerInput(new KeyboardProcessor(this, player2, 'U', 0, 'H', 'K', 'J', 'L'));
        players[1] = player2;
        players[0].points = data.ply1;
        players[1].points = data.ply2;

        this.physics.add.collider(players[0], players[1], function () {
            chocarse = true;
        });
        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);

        puntuaciones[0] = this.add.text(30, 0, "Jugador 1: " + players[0].points);
        puntuaciones[1] = this.add.text(790, 0, "Jugador 2: " + players[1].points);

        //poner botones
//FALTA DETECCIÓN DE LO DE ALTURA
//this.taskManager.taskCompleted();

        var button1_P2 = new Button(this, 416, 443, 'botonR', () => {
            this.taskManager.taskCompleted();
            button1_P2.setVisible(false);
            button1_P1.setVisible(true);
            var button1_P2P = new Button(this, 414, 416, 'botonRP');
        }, players[1]);

        let button1_P1 = new Button(this, 416, 570, 'botonL', () => {
            platform1.enable();
            this.taskManager.taskCompleted();
            button1_P1.setVisible(false);
            var button1_P1P = new Button(this, 414, 543, 'botonLP');
            button2_P2.setVisible(true);
        }, players[0]);
        button1_P1.setVisible(false);

        let button2_P2 = new Button(this, 545, 379, 'botonR', () => {
            this.taskManager.taskCompleted();
            button2_P2.setVisible(false);
            var button1_P1P = new Button(this, 545, 352, 'botonRP');
        }, players[1]);
        button2_P2.setVisible(false);

        this.addStageFloorCollisions(floor);

        this.setPlatformsColliders();

        this.timer.startTimer();
        this.timerText = this.add.text(this.game.config.width * 0.5, 20, 'test');

        console.log("Escena 2 creada");
    }

    update() {
        players[0].update(chocarse, players[1]);
        players[1].update(chocarse, players[0]);
        chocarse = false;
        this.timerText.setText(this.timer.getRemainingSeconds(true));
        this.UpdatePlatforms();

        //Fin nivel
        //    butFinal.setVisible(false);
        // this.door = this.add.image(896,448,'door').setOrigin(0,0);
    }

    setPlatformsColliders() {

        for (let i = 0; i < this.platforms.length; i++) {
            this.physics.add.collider(players[0], this.platforms[i], () => console.log("over platform"))
            this.physics.add.collider(players[1], this.platforms[i], () => console.log("over platform"))
        }
    }

    addStageFloorCollisions(floor) {
        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);
    }


    UpdatePlatforms() {
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].movePlatform()
        }
    }
}