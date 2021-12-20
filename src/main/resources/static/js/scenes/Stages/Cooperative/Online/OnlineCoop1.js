import {TaskManager} from "../../../../objects/TaskManager.js";
import {Button} from "../../../../objects/Button.js";
import {Platform} from "../../../../objects/Platform.js";

import {getConnection, getRoomCode} from "../../../../server/Websockets/SocketIntilalizer.js";
import {OnlineCooperativeScene} from "../Base/OnlineCooperativeScene.js";


/// Player 1 is upper layer player.
/// Player 2 is down layer player

export class OnlineCoop1 extends OnlineCooperativeScene {


    constructor() {
        //TODO-> CAMBIAR TIEMPO A 15000
        super("OnlineCoop1", "Comp1", 9999000, 'Coop1Map');
    }

    init() {

        this.taskManager = new TaskManager(this, 4, [1, 0, 1, 0], () => {
            console.log("All tasks completed");
            this.door.open()
        }, this.timer, this.players, this.updatePoints, 50);


    }


    create(data) {

        super.create(data)

        // ************** platforms
        this.platforms = []
        var platform1 = new Platform(this, 896 - 64, 128 + 64, 'horizontal3x1', -64 * 3, 0)
        this.platforms.push(platform1)
        var platform2 = new Platform(this, 768 - 64, 448 + 64, 'horizontal3x1', -64 * 3, 0)
        this.platforms.push(platform2)
        var platform3 = new Platform(this, 192, 256, 'horizontal2x1', -64 * 2, 0)
        this.platforms.push(platform3)
        var platform4 = new Platform(this, 384, 384, '1x1', 0, 64)
        this.platforms.push(platform4)


        //**************** door
        this.setDoorPosition(64, 448)

        ///************** players


        //*************** buttons

        this.buttons = []
        var button1_P1 = new Button(this, 480, 128, 'botonR', () => {
            platform2.enable();
            this.taskManager.taskCompleted();
            button1_P1.setTexture('botonRP')
            this.sendButtonInformation(0)
        }, this.players[0]);
        this.buttons.push(button1_P1)

        var button2_P1 = new Button(this, 360, 443 + 128 + 5, 'botonR', () => {
            platform4.enable();
            this.taskManager.taskCompleted()
            button2_P1.setTexture('botonRP')
            this.sendButtonInformation(1)
        }, this.players[0]);
        this.buttons.push(button2_P1)

        var button1_P2 = new Button(this, 780, 448, 'botonL', () => {
            platform1.enable();
            this.taskManager.taskCompleted();
            button1_P2.setTexture('botonLP')
            this.sendButtonInformation(2)
        }, this.players[1]);
        this.buttons.push(button1_P2)

        var button2_P2 = new Button(this, 480, 448, 'botonL', () => {
            platform3.enable();
            this.taskManager.taskCompleted();
            button2_P2.setTexture('botonLP')
            this.sendButtonInformation(3)
        }, this.players[1]);
        this.buttons.push(button2_P2)


        this.setPlatformsColliders();
        this.setOnButtonInfoReceived();
    }

    definePlayersPosition() {
        this.setPlayerPosition(0, 928, 64)
        this.setPlayerPosition(1, 820, 384)
    }

    sendButtonInformation(buttonIndex) {
        let connection = getConnection()
        let buttonInfo = {
            type: "CooperativeButton",
            buttonIndex: buttonIndex,
            RoomCode: getRoomCode()
        }

        if (connection.readyState !== WebSocket.OPEN) {
            connection.addEventListener('open', () => {
                connection.send(JSON.stringify(buttonInfo))
            })
        } else {
            connection.send(JSON.stringify(buttonInfo))
        }
    }

    setOnButtonInfoReceived() {
        let connection = getConnection()
        connection.addEventListener('message', (msg) => {
            let message = JSON.parse(msg.data)
            if (message.type === "CooperativeButton") {
                let pressedButtonIndex = message.buttonIndex
                this.buttons[pressedButtonIndex].press();
            }
        })
    }

}
