import {getConnection, getRoomCode} from "../../server/Websockets/SocketIntilalizer.js";

export class OnlineNotKeyboard{

    // update(bump, playerp) {
    //     this.player.moveTo()
    // }
    constructor(){this.bump = false;}

    update(bump, playerp){
        if (this.empujar.isDown)//Move left
        {
            playerp.selfPush(bump);
        }
        if(bump != this.bump){
            this.bump = bump;
        }
    }
}