export class Door extends Phaser.Physics.Arcade.Sprite{
    constructor(context, x, y, spriteKey )  {
        super(context,x, y, spriteKey);
        this.context=context;
        this.setOrigin(0,0)
        this.enabled=false;

        this.context.add.existing(this,true);

    }

    openDoor(){
        this.enabled=true;
        this.context.physics.add.existing(this,true);
    }
}