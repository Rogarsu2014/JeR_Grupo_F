import {Player} from "./Player.js";

export class OnlinePlayer extends Player{
    constructor(scene, x, y, spriteKey, points = 0, connection) {
        super(scene, x, y, spriteKey, points = 0);
        this.connection=connection;
        this.connection.onmessage=(msg)=>{
            let movement=JSON.parse(msg.data)
            this.xDir=Number(movement.xDir);
        }

        this.animations={
            [0]:()=> {
                this.anims.play('turn' + this.spriteKey);
            },
            [1]:()=> {
                this.flipX=false;
                this.anims.play('movement' + this.spriteKey, true);
            },
            [-1]:()=> {
                this.flipX=true;
                this.anims.play('movement' + this.spriteKey, true)
            }
        }
        this.xDir=0;
        this.isJumping=false
    }
    // jump(bump){
    //     super.jump(bump)
    //     this.sendDirection(this.xDir,true)
    // }
    moveLeft() {
        // super.moveLeft();
        this.flipX=true;
        //this.anims.play('movement' + this.spriteKey, true);
        this.xDir=-1
        this.sendDirection(-1,false)
    }
    
    moveRight() {
        // super.moveRight();

        //this.anims.play('movement' + this.spriteKey, true);
        this.xDir=1
        this.sendDirection(1,false)
    }
    
    idle() {
        // super.idle();

        //this.anims.play('turn' + this.spriteKey);
        this.xDir=0
        this.sendDirection(0,false)
    }

    moveTo(){
        console.log("Move To done")
        // this.dirActions[this.xDir]()
        this.animations[this.xDir]()
        this.setVelocityX(this.xDir*300)
        // this.isJumping
    }
    
    sendDirection(dir,isJumping){
        let direction={
            type:"Movement",
            xDir:dir,
            isJumping:true
        }
        this.connection.send(JSON.stringify(direction))
    }
    
}