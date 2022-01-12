import {Timer} from "../util/Timer.js";
import {cameraShake} from "../util/cameraEffects.js";

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
        player.instantiateDeathAnimation()
        player.setPosition(player.initialPositionX, player.initialPositionY);
        player.scale=0;
        
        player.body.moves = false;
        
        this.setDeathTimer(player)
    }
    
    playEffect(){
        this.context.cameras.main.zoomTo(1.1,100)
        cameraShake( this.context,200, ()=>this.context.cameras.main.zoomTo(1,100),0.01)
    }
    
    primitiveHarm(player){
        this.playEffect()
    }
    
    setDeathTimer(player){
        let timer = new Timer(this.context, 2000, () => {
            this.timerAction(player);
        });

        timer.startTimer();
    }
    timerAction(player){
        player.body.moves = true;
        this.playerScaleTween(player)
    }
    
    playerScaleTween(player){
        this.context.tweens.add({
            targets:player,
            scale:0.07,
            duration:200,
            ease:'Quad.easeIn'
        })
    }
}