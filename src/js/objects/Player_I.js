import { Timer } from "../util/Timer.js";

export class Player_I extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //Particular player object gravity
        this.setGravityY(1500);
        //Add a little bounce effect
        this.setBounce(0.2);
        //Make the player collide with the screen borderd
        this.setCollideWorldBounds(true);
        this.context= scene;
        this.sprite = sprite;
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

        this.anims.play('left', true);
    }
    idle() {//Stay still
        this.setVelocityX(0);

        this.anims.play('turn');
    }
    moveRight() {//Move right
        this.setVelocityX(300);

        this.anims.play('right', true);
    }
    moveDown() {
        this.setVelocityY(600);
    }

    jump() {//Jump as long as you are on the floor
        if (this.isOnFloor())
            this.setVelocityY(-500);
    }
    isOnFloor() {//Optional go down key
        return this.body.onFloor();
    }
    serEmpujado(chocarse){
        console.log("1");
        if(chocarse == true){
            console.log("2");
            if(this.body.touching.left == true){
                console.log("3");
                //this.setX(this.x +80);
                this.setAccelerationX(100000);
                var timer = new Timer(this.context, 50, ()=>this.setAccelerationX(0));
                timer.startTimer();
            }
            else if(this.body.touching.right == true){
                console.log("4");
                this.setAccelerationX(-100000);
                var timer = new Timer(this.context, 50, ()=>this.setAccelerationX(0));
                timer.startTimer();
            }
            
        }
    }
}