export class Button extends Phaser.Physics.Arcade.Sprite {
    constructor(context, x, y, spriteKey, onPressedCallback, targetPlayer) {
        super(context,x, y, spriteKey);
        this.context= context;
        this.context.add.existing(this,true);
        this.context.physics.add.existing(this,true);
        this.setOrigin(.5,1)
        this.isPressed = false;
        this.onPressed = onPressedCallback;
        this.context.physics.add.collider(this, targetPlayer,()=> this.press());
        this.sfx = this.context.sound.add("buttonClick", this.context.game.config.musicConfig);
        // this.setIgnoreGravity(true)
    }


    press() {
        this.isPressed = true;
        this.sfx.play()
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
