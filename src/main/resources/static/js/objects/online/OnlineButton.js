import {Button} from "../Button.js";
import {getConnection, getPlayerIndex, getRoomCode} from "../../server/Websockets/SocketIntilalizer.js";

export class OnlineButton extends Button{

    constructor(context, x, y, spriteKey, onPressedCallback, targetPlayer, buttonIndex) {
        super(context, x, y, spriteKey, onPressedCallback, targetPlayer);
        this.buttonIndex=buttonIndex
    }

    sendButtonInformation(buttonIndex) {
        let connection = getConnection()
        let buttonInfo = {
            type: "CooperativeButton",
            buttonIndex: buttonIndex,
            RoomCode:getRoomCode()
        }

        if (connection.readyState !== WebSocket.OPEN) {
            connection.addEventListener('open', () => {
                connection.send(JSON.stringify(buttonInfo))
            })
        } else {
            connection.send(JSON.stringify(buttonInfo))
        }
    }
    
    setCollider(targetPlayer) {
        if (this.context.players[getPlayerIndex()] === targetPlayer) {
            this.context.physics.add.collider(this, targetPlayer, () => {
                this.press()
                this.sendButtonInformation(this.buttonIndex)
            });
        }
    }
}