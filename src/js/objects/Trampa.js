import { Timer } from "../util/Timer.js";

export class Trampa extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //Particular player object gravity
        this.setGravityY(-300);
        this.setScale(0.075);
        this.setImmovable(1);
        this.setCollideWorldBounds(true);
        this.context = scene;
        this.spriteKey = spriteKey;
        this.puntos = -50;
        this.music = this.context.sound.add("dano", this.context.game.config.musicConfig);
    }
    init() {

    }
    preload() {

    }
    create() {

    }
    update() {

    }
    dañar(jugador) {
        jugador.addPoints(this.puntos);
        this.music.play();
        jugador.setPosition(jugador.initialPositionX, jugador.initialPositionY);
        jugador.body.moves = false;
        var timer = new Timer(this.context, 2000, () => jugador.body.moves = true);
        timer.startTimer();
    }
}