export class Skull extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey,frameRate=2) {
        super(scene, x, y, spriteKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //Particular player object gravity
        this.setGravityY(-300);
        this.setScale(0.1);
        this.setImmovable(1);
        this.setCollideWorldBounds(true);
        this.context= scene;
        this.spriteKey = spriteKey;
        this.puntos = 100;
        this.music = this.context.sound.add("points+", this.context.game.config.musicConfig);
         //Create the character animations (current ones are from tutorial)
        this.anim=this.context.anims.create({
            key: 'idle' + this.spriteKey,
            frames: this.anims.generateFrameNumbers(this.spriteKey, { start: 0, end: 4 }),
            frameRate: frameRate,
            repeat: -1,
            yoyo: true
        });
        this.anims.play('idle'+ this.spriteKey, true);
    }

    init() {

    }
    preload() {

    }
    create() {

    }
    update() {
        
    }
    remove(player){
        this.music.play();
        player.addPoints(this.puntos);
        this.destroy();
    }
}