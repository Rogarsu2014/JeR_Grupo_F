import {Player} from "./Player.js";
import {getRoomCode} from "../server/Websockets/SocketIntilalizer.js";

export class OnlinePlayer extends Player {
    constructor(scene, x, y, spriteKey, points = 0 ) {
        super(scene, x, y, spriteKey, points = 0);
        
        // this.setConnection(connection)
        
        this.animations = {
            [0]: () => {
                this.anims.play('turn' + this.spriteKey);
            },
            [1]: () => {
                this.flipX = false;
                this.anims.play('movement' + this.spriteKey, true);
            },
            [-1]: () => {
                this.flipX = true;
                this.anims.play('movement' + this.spriteKey, true)
            }
        }
        this.xDir = 0;
        this.isJumping = false
    }
    setConnection(connection){
        this.connection = connection;
        this.connection.onmessage = (msg) => {
            
            let message=JSON.parse(msg.data)
            if (message.type ==="Movement") {
                let movement = JSON.parse(msg.data)
                this.xDir = Number(movement.xDir);
                this.isJumping = Boolean(movement.isJumping);
            }
            
        }
    }
    jump() {
        super.jump()
        this.isJumping=true;
        this.sendDirection()
        // this.sendDirection(this.xDir, this.isJumping=true)
    }

    moveLeft() {
        // super.moveLeft();
        console.log("Move Left")
        this.flipX = true;
        //this.anims.play('movement' + this.spriteKey, true);
        this.xDir = -1
        // this.sendDirection(-1, this.isJumping)
        this.sendDirection()
    }

    moveRight() {
        // super.moveRight();
        console.log("Move Right")
        //this.anims.play('movement' + this.spriteKey, true);
        this.xDir = 1
        // this.sendDirection(1, this.isJumping)
        this.sendDirection()
    }

    idle() {
        // super.idle();

        //this.anims.play('turn' + this.spriteKey);
        if (this.isJumping) {
            this.isJumping = false;
        }
        this.xDir = 0
        // this.sendDirection(0, this.isJumping)
        this.sendDirection()
    }

    moveTo() {
        // console.log("Move To done")
        // this.dirActions[this.xDir]()
        this.animations[this.xDir]()
        this.setVelocityX(this.xDir * 300)

        if (this.isJumping) {
            super.jump()
        }
    }

    sendDirection() {
        let direction = {
            type: "Movement",
            xDir: this.xDir,
            isJumping: this.isJumping,
            RoomCode: getRoomCode()
        }
        this.connection.send(JSON.stringify(direction))
    }

}