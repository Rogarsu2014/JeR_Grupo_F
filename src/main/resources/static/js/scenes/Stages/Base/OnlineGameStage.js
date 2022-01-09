import {GameStage} from "./GameStage.js";
import {Player} from "../../../objects/Player.js";
import {KeyboardProcessor} from "../../../util/InputProcessors/KeyboardProcessor.js";
import {OnlinePlayer} from "../../../objects/OnlinePlayer.js";
import {getConnection, getPlayerIndex, getRoomCode} from "../../../server/Websockets/SocketIntilalizer.js";
import {OnlineKeyboardProcessor} from "../../../util/InputProcessors/OnlineKeyboardProcessor.js";

let spriteKeys = ["dude", "dude2"]

export class OnlineGameStage extends GameStage {


    create(data) {
        super.create(data);
        console.log("Create")
        this.events.on('shutdown',()=>console.log("shutdown"))
        this.sendReadyStatus();
        this.receivePoints();
        this.receiveBump();
    }

    definePlayers() {

        this.players[0] = new OnlinePlayer(this, 0, 0, "dude", 0);

        this.players[1] = new OnlinePlayer(this, 0, 0, "dude2", 0);

        this.setUserPlayerIndex()
    }

    setUserPlayerIndex() {
        let playerIndex = getPlayerIndex()


        for (let i = 0; i < this.players.length; i++) {
            this.players[i].setConnection(getConnection())
            if (i === playerIndex) {
                this.players[i].setPlayerInput(new OnlineKeyboardProcessor(this, this.players[i], 'W', 0, 'A', 'D', 'S', 'F'));
                this.players[i].sendPos200();
                this.players[i].setRes(0);
            } else {
                this.players[i].setOnMovementMessage();
            }
        }
    }

    sendReadyStatus() {
        let connection = getConnection();
        
        // Delegate with the function to be called
        let getMsgDelegate =  (msg) =>{
            this.getStageReadyMsg(msg)
        }
        
        // event added when a message ius received
        connection.addEventListener('message', getMsgDelegate)

        // event removed at the end of a scene
        this.events.on('shutdown',()=>connection.removeEventListener('message',getMsgDelegate))
        
        var readyObj = {
            type: "StageSynchronizer",
            stageState: "ready",
            RoomCode: getRoomCode()
        }
        if (connection.readyState !== WebSocket.OPEN) {
            connection.addEventListener('open', () => {
                connection.send(JSON.stringify(readyObj))
            })
        } else {
            connection.send(JSON.stringify(readyObj))
        }

    }
    
    getStageReadyMsg(msg){
        let message = JSON.parse(msg.data)
        if (message.type === "StageSynchronizer") {
            console.log("stage status received")
            let stageStatus = JSON.parse(msg.data)
            let bothPlayersReady = Boolean(stageStatus.bothPlayersReady);
            if (bothPlayersReady) {
                this.resumeStartTransition()
            }
        }
    }

    receivePoints() {
        let connection2 = getConnection();
        connection2.addEventListener('message', (msg) => {
            let message = JSON.parse(msg.data)
            if (message.type === "Points") {
                let points = Number(message.points);
                let indice = Math.abs(getPlayerIndex() - 1);
                /*                let cantidad;
                                if(points > this.players[indice].points){
                                    cantidad = points;
                                }else {
                                    cantidad = this.players[indice].points
                                }*/
                this.players[indice].points = points;

            }
        })
    }

    receiveBump() {
        let connection3 = getConnection();
        connection3.addEventListener('message', (msg) => {
            let message = JSON.parse(msg.data)
            if (message.type === "Bump") {
                let bump = Boolean(message.bump);
                console.log(bump);
                this.bump = bump;
                this.players[getPlayerIndex()].selfPush(bump);
            }
        })
    }

}