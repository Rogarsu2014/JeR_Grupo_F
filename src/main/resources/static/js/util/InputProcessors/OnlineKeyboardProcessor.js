import {KeyboardProcessor} from "./KeyboardProcessor.js";
import {getConnection, getRoomCode} from "../../server/Websockets/SocketIntilalizer.js";

export class OnlineKeyboardProcessor extends  KeyboardProcessor{
    
    // update(bump, playerp) {
    //     this.player.moveTo()
    // }
    constructor(context,player,jumpButton,dashButton,left,right ,down, empujar){
        super(context,player,jumpButton,dashButton,left,right ,down, empujar);
    }

    update(bump, playerp){
        if (this.empujar.isDown)//Move left
        {
            playerp.selfPush(bump);
            if(bump != this.bump){
                this.bump = bump;
                this.sendBump();
            }
        }
    }
    primitiveSetInputListeners(){
        this.left.on('down', () => {
            // console.log("Left Down")
            this.player.moveLeft()
        });

        this.right.on('down', () => {
            // console.log("Right Down")
            this.player.moveRight()
        }); 

        this.jumpButton.on('down', () => {
            // console.log("Right Down")
            this.player.jump(this.bump);
        });
    }
    sendBump(){
        let connection = getConnection();
        let bump = {
            type: "Bump",
            bump: this.bump,
            push: true,
            RoomCode: getRoomCode()
        }
        connection.send(JSON.stringify(bump))
    }
}