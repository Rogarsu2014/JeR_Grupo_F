import { Player_I } from '../objects/Player_I.js'
import { Skull } from '../objects/Skull.js'
import { Trampa } from '../objects/Trampa.js'
import { GamepadProcessor } from "../util/InputProcessors/GamepadProcessor.js";
import { KeyboardProcessor } from "../util/InputProcessors/KeyboardProcessor.js";
import { Button } from "../objects/Button.js";
import { Platform } from "../objects/Platform.js";
import { Timer } from "../util/Timer.js";

var players = [];
var skulls = [];
var traps = [];
var bump;
var scores = [];
var counter = 0;

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

        this.game.canvas.width = (1408);
        this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height);

        const map = this.make.tilemap({ key: 'Comp1Map' });
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createLayer('Backgound', tileset);
        const floor = map.createLayer('Level', tileset);

        floor.setCollisionByProperty({ collides: true });


        //Create the character at 0,0 and change its origin
        var player1 = new Player_I(this, 20, 300, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this, player1, 'W', 0, 'A', 'D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 1400, 300, "dude2");
        player2.setPlayerInput(new KeyboardProcessor(this, player2, 'U', 0, 'H', 'K', 'J', 'L'));
        players[1] = player2;
        players[0].points = data.jug1;
        players[1].points = data.jug2;

        this.physics.add.collider(players[0], players[1], function () {
            bump = true;
        });

        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);

        scores[0] = this.add.text(30, 0, "Jugador 1: " + players[0].points);
        scores[1] = this.add.text(1175, 0, "Jugador 2: " + players[1].points);

        this.addStageFloorCollisions(floor);

        //Creación de todas las skulls
        skulls.push(new Skull(this, 250, 325, "calavera"));
        skulls.push(new Skull(this, 225, 550, "calavera"));
        skulls.push(new Skull(this, 420, 350, "calavera"));
        skulls.push(new Skull(this, 545, 350, "calavera"));
        skulls.push(new Skull(this, 610, 475, "calavera"));
        skulls.push(new Skull(this, 670, 285, "calavera"));
        skulls.push(new Skull(this, 830, 185, "calavera"));
        skulls.push(new Skull(this, 800, 490, "calavera"));
        skulls.push(new Skull(this, 1050, 285, "calavera"));
        skulls.push(new Skull(this, 1115, 485, "calavera"));
        skulls.push(new Skull(this, 1150, 185, "calavera"));
        skulls.push(new Skull(this, 1185, 350, "calavera"));
        skulls.push(new Skull(this, 1350, 550, "calavera"));
        counter = 13;

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

        traps.push(new Trampa(this, 150, 435, "trampa"));
        traps.push(new Trampa(this, 350, 500, "trampa"));
        traps.push(new Trampa(this, 1000, 307, "trampa"));
        traps.push(new Trampa(this, 1000, 500, "trampa"));

        for (let i = 0; i < traps.length; i += 1) {
            this.physics.add.collider(players[0], traps[i], function () {
                traps[i].dañar(players[0]);
                scores[0].setText("Jugador 1: " + players[0].points);
            });
            this.physics.add.collider(players[1], traps[i], function () {
                traps[i].dañar(players[1]);
                scores[1].setText("Jugador 2: " + players[1].points);
            });
        }

        this.timer.startTimer();
        this.timerText = this.add.text(this.game.config.width * 0.5, 20, 'test');


        console.log("Escena 2 creada");
    }

    update() {
        players[0].update(bump, players[1]);
        players[1].update(bump, players[0]);
        bump = false;
        this.timerText.setText(this.timer.getRemainingSeconds(true));

        if (counter == 0) {
            this.scene.start("Coop1", { jug1: players[0].points, jug2: players[1].points });
        }
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