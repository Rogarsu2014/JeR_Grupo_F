export class CharacterTestScene extends Phaser.Scene {
    constructor() {
        super("CharacterTestScene");
    }
    init() {
    }
    preload() {
        this.load.spritesheet("dude","./Resources/assets/items/dude.png", { frameWidth: 32, frameHeight: 48 });//Current sprites from tutorial
    }
    create() {
        console.log("Character Test Scene created");

        //Create the character at 0,0 and change its origin
        this.player = this.physics.add.sprite(0, 0, 'dude').setOrigin(0,0);
        
        //Particular player object gravity
        this.player.setGravityY(1500);
        //Add a little bounce effect
        this.player.setBounce(0.2);
        //Make the player collide with the screen border
        this.player.setCollideWorldBounds(true);


        //Create the character animations (current ones are from tutorial)
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //Create the variable cursors
        this.cursors = this.input.keyboard.createCursorKeys();


    }

    update() {
        
        if (this.cursors.left.isDown)//Move left
    {
        this.player.setVelocityX(-300);

        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)//Move right
    {
        this.player.setVelocityX(300);

        this.player.anims.play('right', true);
    }
    else //Stay still
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.onFloor())//Jump as long as you are on the floor
    {
        this.player.setVelocityY(-500);
    }
    if (this.cursors.down.isDown)//Optional go down key
    {
        this.player.setVelocityY(600);
    }
    }
}