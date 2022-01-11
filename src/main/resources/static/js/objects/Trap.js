import {Timer} from "../util/Timer.js";

export class Trap extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //Particular player object gravity
        this.setGravityY(-300);
        this.setScale(0.7);
        this.setImmovable(1);
        this.setCollideWorldBounds(true);
        this.context = scene;
        this.spriteKey = spriteKey;
        this.pointsRemoved = -50;
        this.music = this.context.sound.add("hit", this.context.game.config.musicConfig);
        this.onPlayerContact = () => {
            player.body.moves = true;
        };
    }

    init() {

    }

    preload() {

    }

    create() {

    }

    update() {

    }

    harm(player) {
        this.baseHarm(player)
        this.primitiveHarm(player)
   
    }

    baseHarm(player) {
        player.addPoints(this.pointsRemoved);
        this.music.play();
        player.setPosition(player.initialPositionX, player.initialPositionY);
        player.body.moves = false;
    }
    
    primitiveHarm(player){
        let timer = new Timer(this.context, 2000, () => {
            player.body.moves = true;
        });
        timer.startTimer();
    }
}