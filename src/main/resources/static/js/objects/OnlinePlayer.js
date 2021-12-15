import {Player} from "./Player.js";

export class OnlinePlayer extends Player{
    constructor(scene, x, y, spriteKey, points = 0, connection) {
        super(scene, x, y, spriteKey, points = 0);
        this.connection=connection;
        this.connection.onmessage=(msg)=>{
            let movement=JSON.parse(msg.data)
            this.xDir=Number(movement.xDir);
        }
        this.xDir=0;
        
    }
    
    moveLeft() {
        // super.moveLeft();
        this.flipX=true;
        this.anims.play('movement' + this.spriteKey, true);
        this.xDir=-1
        this.sendDirection(-1)
    }
    
    moveRight() {
        // super.moveRight();
        this.flipX=false;
        this.anims.play('movement' + this.spriteKey, true);
        this.xDir=1
        this.sendDirection(1)
    }
    
    idle() {
        // super.idle();

        this.anims.play('turn' + this.spriteKey);
        this.xDir=0
        this.sendDirection(0)
    }

    moveTo(){
        console.log("Move To done")
        // this.dirActions[this.xDir]()
        this.setVelocityX(this.xDir*300)
    }
    
    sendDirection(dir){
        let direction={
            xDir:dir
        }
        this.connection.send(JSON.stringify(direction))
    }
    
}