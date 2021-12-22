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
        }
        if(bump !== this.context.bump){
            this.context.bump = bump;
            this.sendBump();
        }
    }

    sendBump(){
        let connection = getConnection();
        let bump = {
            type: "Bump",
            bump: this.bump,
            RoomCode: getRoomCode()
        }
        connection.send(JSON.stringify(bump))
    }
}