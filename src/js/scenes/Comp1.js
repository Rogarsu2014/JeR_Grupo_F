import { Player_I } from '../objects/Player_I.js'
import { Skull } from '../objects/Skull.js'
import { GamepadProcessor } from "../util/InputProcessors/GamepadProcessor.js";
import { KeyboardProcessor } from "../util/InputProcessors/KeyboardProcessor.js";
import { Button } from "../objects/Button.js";
import { Platform } from "../objects/Platform.js";
import { Timer } from "../util/Timer.js";

var players = [];
var calaveras = [];
var chocarse;
var puntuaciones = [];

export class Comp1 extends Phaser.Scene {

    constructor() {
        super("Comp1");
    }

    init() {
        this.timer = new Timer(this, 60000, () => console.log("completed"))
    }

    preload() {
    }

    create(data) {
        const map = this.make.tilemap({ key: 'Comp1Map' });
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createLayer('Backgound', tileset);
        const floor = map.createLayer('Level', tileset);

        floor.setCollisionByProperty({ collides: true });


        //Create the character at 0,0 and change its origin
        var player1 = new Player_I(this, 0, 300, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this, player1, 'W', 0, 'A', 'D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 1400, 300, "dude2");
        player2.setPlayerInput(new KeyboardProcessor(this, player2, 'U', 0, 'H', 'K', 'J', 'L'));
        players[1] = player2;
        players[0].puntos = data.jug1;
        players[1].puntos = data.jug2;

        this.physics.add.collider(players[0], players[1], function () {
            chocarse = true;
        });


        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);

        puntuaciones[0] = this.add.text(30, 0, "Jugador 1: " + players[0].puntos);
        puntuaciones[1] = this.add.text(790, 0, "Jugador 2: " + players[1].puntos);

        this.addStageFloorCollisions(floor);

        //this.setPlatformsColliders();

        this.timer.startTimer();
        this.timerText = this.add.text(this.game.config.width * 0.5, 20, 'test');


        console.log("Escena 2 creada");
    }

    update() {
        players[0].update(chocarse, players[1]);
        players[1].update(chocarse, players[0]);
        chocarse = false;
        this.timerText.setText(this.timer.getRemainingSeconds(true));
        //this.UpdatePlatforms();
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