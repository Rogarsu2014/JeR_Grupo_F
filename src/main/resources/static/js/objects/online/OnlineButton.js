import {Button} from "../Button.js";
import {getConnection} from "../../server/Websockets/SocketIntilalizer.js";

export class OnlineButton extends Button{

    constructor(context, x, y, spriteKey, onPressedCallback, targetPlayer, buttonIndex) {
        super(context, x, y, spriteKey, onPressedCallback, targetPlayer);
        this.buttonIndex=buttonIndex
    }

    sendButtonInformation(buttonIndex) {
        console.warn("sending button information")
        let connection = getConnection()
        let buttonInfo = {
            type: "CooperativeButton",
            buttonIndex: buttonIndex
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
        this.context.physics.add.collider(this, targetPlayer,()=> {
            this.press()
            this.sendButtonInformation(this.buttonIndex)
        });
    }
}