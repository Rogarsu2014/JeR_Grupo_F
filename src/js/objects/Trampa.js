import { Timer } from "../util/Timer.js";

export class Trampa extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //Particular player object gravity
        this.setGravityY(-300);
        this.setScale(0.05);
        this.setImmovable(1);
        this.setCollideWorldBounds(true);
        this.context = scene;
        this.spriteKey = spriteKey;
        this.puntos = -50;
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
        jugador.sumarPuntos(this.puntos);
        jugador.setPosition(jugador.position);
        jugador.body.moves = false;
        var timer = new Timer(this.context, 2000, () => jugador.body.moves = true);
        timer.startTimer();
    }
}