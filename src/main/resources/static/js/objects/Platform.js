export class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(context, x, y, spriteKey,goalXDistance,goalYDistance )  {
        super(context,x, y, spriteKey);
        this.context=context;
        this.goalX=this.x + goalXDistance;
        this.goalY=this.y + goalYDistance;
        this.setOrigin(0,0)
        this.enabled=false;

        this.context.add.existing(this,true);
        this.context.physics.add.existing(this,true);
    }

    movePlatform(){

        if(this.enabled){
            this.x = this.Move(this.x,this.goalX);
            this.body.x=this.x;

            this.y = this.Move(this.y,this.goalY);
            this.body.y=this.y;

        }
    }

    enable(){
        this.enabled=true;
    }
    Move(position,goalPosition){
        let distance =goalPosition - position

        let absDistance=Math.abs(distance);

        if(absDistance > 0) {

                position += distance / Math.abs(distance)
        }
        return position;
    }


    MoveX(){
        let distance =this.goalX - this.x

        let absDistance=Math.abs(distance);

        if(absDistance > 0) {
            if (this.x > this.goalX) {
                this.x += distance / Math.abs(distance)
                this.body.x += distance / Math.abs(distance)
            }
        }
    }
}