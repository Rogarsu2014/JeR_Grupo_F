export class Skull extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey) {
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
        this.context.anims.create({
            key: 'idle' + this.spriteKey,
            frames: this.anims.generateFrameNumbers(this.spriteKey, { start: 0, end: 4 }),
            frameRate: 2,
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
    desaparicion(jugador){
        this.music.play();
        jugador.addPoints(this.puntos);
        this.destroy();
    }
}