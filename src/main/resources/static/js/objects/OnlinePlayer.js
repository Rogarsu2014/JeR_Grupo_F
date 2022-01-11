import {Player} from "./Player.js";
import {getPlayerIndex, getRoomCode} from "../server/Websockets/SocketIntilalizer.js";
import {Timer} from "../util/Timer.js";

export class OnlinePlayer extends Player {
    constructor(scene, x, y, spriteKey, points = 0) {
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
            },
            [2]: () => {
                this.flipX = false;
                this.anims.play('jump' + this.spriteKey, true);
            },
            [-2]: () => {
                this.flipX = true;
                this.anims.play('jump' + this.spriteKey, true)
            },[3]: () => {
                this.flipX = false;
                this.anims.play('death' + this.spriteKey, true)
            },[-3]: () => {
                this.flipX = true;
                this.anims.play('death' + this.spriteKey, true)
            }
        }
        this.xDir = 0;
        this.isJumping = false;
        this.res = -1;
    }
    setConnection(connection){
        this.connection = connection;
    }
    setOnMovementMessage(){
        let movementMsg=(msg)=>{
            let message=JSON.parse(msg.data)
            if (message.type ==="Movement") {
                let movement = JSON.parse(msg.data)
                this.xDir = Number(movement.xDir);
                this.isJumping = Boolean(movement.isJumping);
            }else if(message.type === "Position"){
                let position = JSON.parse(msg.data)
                this.x = Number(position.x);
                this.y = Number(position.y);
            }
        }
        this.connection.addEventListener('message',movementMsg)
        this.scene.events.on('shutdown',()=>this.connection.removeEventListener('message',movementMsg))
    }
    jump() {
        super.jump()
        this.isJumping=true;
        this.sendDirection();
        // this.sendDirection(this.xDir, this.isJumping=true)
    }
    update(bump, playerp) {
        super.update(bump, playerp);
        this.moveTo();
    }

    moveLeft() {
        // super.moveLeft();
        this.flipX = true;
        //this.anims.play('movement' + this.spriteKey, true);
        this.xDir = -1
        // this.sendDirection(-1, this.isJumping)
        this.sendDirection()
    }

    moveRight() {
        // super.moveRight();
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
        if(this.isJumping == true){
            if(this.xDir == 1) this.xDir = 2;
            if(this.xDir == -1) this.xDir = -2;
        }
        this.animations[this.xDir]()
        if(this.xDir == 2){
            this.setVelocityX(300);
        }else if(this.xDir == -2){
            this.setVelocityX(-300);
        }else{
            this.setVelocityX(this.xDir * 300);
        }


        if (this.isJumping) {
            super.jump()
        }
    }

    setDeath(){
        if(getPlayerIndex() == 0){
            this.xDir = 3;
        }else{
            this.xDir = -3;
        }
    }

    removeDeath(){
        this.xDir = 0;
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
    sendPos(){
        let position = {
            type: "Position",
            x: this.x,
            y: this.y,
            RoomCode: getRoomCode()
        }
        this.connection.send(JSON.stringify(position))
    }

    sendPos200(){

        var timer = new Timer(this.context, 10, () => {
            this.sendPos();
            timer.startTimer();
            }
        );
        timer.startTimer();
    }

    addPoints(cantidad) {
        if(this.res == 0){
            super.addPoints(cantidad);
            this.sendPoints();
        }
    }
    setRes(resp){
        this.res = resp;
    }

    sendPoints(){
        let points = {
            type: "Points",
            points: this.points,
            RoomCode: getRoomCode()
        }
        this.connection.send(JSON.stringify(points))
    }
}