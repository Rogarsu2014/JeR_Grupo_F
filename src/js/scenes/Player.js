export class Player extends Phaser.Physics.Arcade.Sprite {
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
    }
    update(keys) {

        if (this.numero == 0) {
            console.log("entra");
            if (keys.A.isDown)//Move left
            {
                this.setVelocityX(-300);

                this.anims.play('left', true);
            }
            else if (keys.D.isDown)//Move right
            {
                this.setVelocityX(300);

                this.anims.play('right', true);
            }
            else //Stay still
            {
                this.setVelocityX(0);

                this.anims.play('turn');
            }

            if (keys.W.isDown && this.body.onFloor())//Jump as long as you are on the floor
            {
                this.setVelocityY(-500);
            }
            if (keys.S.isDown)//Optional go down key
            {
                this.setVelocityY(600);
            }

        } else if (this.numero == 1) {


            if (keys.H.isDown)//Move left
            {
                this.setVelocityX(-300);

                this.anims.play('left', true);
            }
            else if (keys.K.isDown)//Move right
            {
                this.setVelocityX(300);

                this.anims.play('right', true);
            }
            else //Stay still
            {
                this.setVelocityX(0);

                this.anims.play('turn');
            }

            if (keys.U.isDown && this.body.onFloor())//Jump as long as you are on the floor
            {
                this.setVelocityY(-500);
            }
            if (keys.J.isDown)//Optional go down key
            {
                this.setVelocityY(600);
            }

        }
    }
}