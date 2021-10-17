export class Player_I extends Phaser.Physics.Arcade.Sprite {

    /*
        constructor(context,playerInput) {
            super(context);
            this.context= context;
            this.player=undefined;
            this.playerInput =undefined;
    */
    constructor(scene, x, y, sprite, numero) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //Particular player object gravity
        this.setGravityY(1500);
        //Add a little bounce effect
        this.setBounce(0.2);
        //Make the player collide with the screen borderd
        this.setCollideWorldBounds(true);
        this.numero = numero;

        this.context= scene;
    }

    setPlayerInput(playerInput) {
        this.playerInput = playerInput;
    }
    init() {

    }
    preload() {
        this.context.load.spritesheet("dude", "./Resources/assets/items/dude.png", { frameWidth: 32, frameHeight: 48 });//Current sprites from tutorial
    }

    create() {
        /*
        this.player = this.context.physics.add.sprite(0, 0, 'dude').setOrigin(0, 0);
        //Particular player object gravity
        this.player.setGravityY(1500);
        //Add a little bounce effect
        this.player.setBounce(0.2);
        //Make the player collide with the screen border
        this.player.setCollideWorldBounds(true);

        this.context.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.context.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.context.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        */

    }

    update() {
        this.playerInput.update();
    }

    // processCursors(){
    //     if (this.context.cursors.left.isDown)//Move left
    //     {
    //         this.player.setVelocityX(-300);
    //
    //         this.player.anims.play('left', true);
    //     }
    //     else if (this.context.cursors.right.isDown)//Move right
    //     {
    //         this.player.setVelocityX(300);
    //
    //         this.player.anims.play('right', true);
    //     }
    //     else //Stay still
    //     {
    //         this.player.setVelocityX(0);
    //
    //         this.player.anims.play('turn');
    //     }
    //
    //     if (this.context.cursors.up.isDown && this.player.body.onFloor())//Jump as long as you are on the floor
    //     {
    //         this.player.setVelocityY(-500);
    //     }
    //     if (this.context.cursors.down.isDown)//Optional go down key
    //     {
    //         this.player.setVelocityY(600);
    //     }
    // }

    moveLeft() {
        this.setVelocityX(-300);

        this.anims.play('left', true);
    }
    idle() {
        this.setVelocityX(0);

        this.anims.play('turn');
    }
    moveRight() {
        this.setVelocityX(300);

        this.anims.play('right', true);
    }

    jump() {
        if (this.isOnFloor())
            this.setVelocityY(-500);
    }
    isOnFloor() {
        return this.body.onFloor();
    }
}