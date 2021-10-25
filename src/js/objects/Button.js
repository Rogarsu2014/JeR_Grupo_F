export class Button extends Phaser.Physics.Arcade.Sprite {
    constructor(context, x, y, spriteKey, onPressedCallback, targetPlayer) {
        super(context,x, y, spriteKey);
        this.context= context;
        this.context.add.existing(this,true);
        this.context.physics.add.existing(this,true);

        this.isPressed = false;
        this.onPressed = onPressedCallback;
        this.context.physics.add.collider(this, targetPlayer,()=> this.Press());
        // this.setIgnoreGravity(true)
    }


    Press() {
        this.isPressed = true;
        console.log("Button pressed")
        this.removeCollider();
        if (this.onPressed != null) {
            this.onPressed();
        }
    }

    removeCollider(){
        // this.body.destroy()
        this.disableBody()
    }
}
