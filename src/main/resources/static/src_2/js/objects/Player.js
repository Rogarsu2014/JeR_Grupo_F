import {cameraShake} from "../util/cameraEffects.js";
import {Timer} from "../util/Timer.js";

export class Player extends Phaser.Physics.Arcade.Sprite {
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
        this.setScale(0.07);
        this.context = scene;
        this.spriteKey = spriteKey;
        this.points = points;
        this.initialPositionX = x;
        this.initialPositionY = y;


        //Create the character animations (current ones are from tutorial)
        this.context.anims.create({
            key: 'left' + this.spriteKey,
            frames: this.anims.generateFrameNumbers(this.spriteKey, {start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        });

        this.context.anims.create({
            key: 'turn' + this.spriteKey,
            frames: [{key: this.spriteKey, frame: 7}],
            frameRate: 20
        });

        this.context.anims.create({
            key: 'right' + this.spriteKey,
            frames: this.anims.generateFrameNumbers(this.spriteKey, {start: 8, end: 14}),
            frameRate: 10,
            repeat: -1
        });


    }

    setPlayerInput(playerInput) {
        this.playerInput = playerInput;
    }

    setPlayerInitialPosition(x, y) {
        this.initialPositionX = x;
        this.initialPositionY = y;
    }

    update(bump, playerp) {
        this.playerInput.update(bump, playerp);
    }

    moveLeft() {//Move left
        this.setVelocityX(-300);

        this.anims.play('left' + this.spriteKey, true);
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

    disableMovement() {
        this.body.moves = false
    }

    enableMovement() {
        this.body.moves = true
    }

    jump(bump) {//Jump as long as you are on the floor
        if (this.isOnFloor()) {
            this.setVelocityY(-550);
        } else if (bump == true) {
            if (this.body.touching.down == true) {
                this.setVelocityY(-500);
            }
        }
    }

    isOnFloor() {//Optional go down key
        return this.body.onFloor();
    }

    selfPush(bump) {
        if (bump == true) {
            if (this.body.touching.left == true) {
                this.setAccelerationX(100000);
                var timer = new Timer(this.context, 50, () => this.setAccelerationX(0));
                timer.startTimer();
            } else if (this.body.touching.right == true) {
                this.setAccelerationX(-100000);
                var timer = new Timer(this.context, 50, () => this.setAccelerationX(0));
                timer.startTimer();
            }

        }
    }

    addPoints(cantidad) {
        this.points += cantidad;
    }
}