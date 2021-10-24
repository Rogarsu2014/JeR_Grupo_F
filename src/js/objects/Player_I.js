import { Timer } from "../util/Timer.js";

export class Player_I extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey, points = 0) {
        super(scene, x, y, spriteKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //Particular player object gravity
        this.setGravityY(1500);
        //Add a little bounce effect
        this.setBounce(0.2);
        //Make the player collide with the screen borderd
        this.setCollideWorldBounds(true);
        this.context= scene;
        this.spriteKey = spriteKey;
        this.points = points;
        this.position = (x, y);


         //Create the character animations (current ones are from tutorial)
         this.context.anims.create({
            key: 'left' + this.spriteKey,
            frames: this.anims.generateFrameNumbers(this.spriteKey, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.context.anims.create({
            key: 'turn' + this.spriteKey,
            frames: [{ key: this.spriteKey, frame: 4 }],
            frameRate: 20
        });

        this.context.anims.create({
            key: 'right' + this.spriteKey,
            frames: this.anims.generateFrameNumbers(this.spriteKey, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


    }
    setPlayerInput(playerInput) {
        this.playerInput = playerInput;
    }
    init() {

    }
    preload() {
        //this.context.load.spritesheet(sprite, "./Resources/assets/items/"+sprite+".png", { frameWidth: 32, frameHeight: 48 });//Current sprites from tutorial
    }

    create() {
    }

    update(chocarse, jugador) {
        this.playerInput.update(chocarse, jugador);
    }

    moveLeft() {//Move left
        this.setVelocityX(-300);

        this.anims.play('left'+ this.spriteKey, true);
    }
    idle() {//Stay still
        this.setVelocityX(0);

        this.anims.play('turn' + this.spriteKey);
    }
    moveRight() {//Move right
        this.setVelocityX(300);

        this.anims.play('right' + this.spriteKey, true);
    }
    moveDown() {
        this.setVelocityY(600);
    }

    jump(chocarse) {//Jump as long as you are on the floor
        if (this.isOnFloor()){
            this.setVelocityY(-550);
        }else if(chocarse == true){
            if(this.body.touching.down == true){
                this.setVelocityY(-500);
            }
        }   
    }
    isOnFloor() {//Optional go down key
        return this.body.onFloor();
    }
    serEmpujado(chocarse){
        if(chocarse == true){
            if(this.body.touching.left == true){
                this.setAccelerationX(100000);
                var timer = new Timer(this.context, 50, ()=>this.setAccelerationX(0));
                timer.startTimer();
            }
            else if(this.body.touching.right == true){
                this.setAccelerationX(-100000);
                var timer = new Timer(this.context, 50, ()=>this.setAccelerationX(0));
                timer.startTimer();
            }
            
        }
    }
    sumarPuntos(cantidad){
        this.puntos += cantidad;
    }
}