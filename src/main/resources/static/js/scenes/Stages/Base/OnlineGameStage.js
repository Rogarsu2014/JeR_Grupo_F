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
        this.sendReadyStatus();
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
            if (i === playerIndex){
                this.players[i].setPlayerInput(new KeyboardProcessor(this, this.players[i], 'W', 0, 'A', 'D', 'S', 'F'));
                this.players[i].sendPos200();
            }else{
                this.players[i].setOnMovementMessage();
            }
        }
    }

    sendReadyStatus() {
        let connection = getConnection();
        connection.addEventListener('message', (msg) => {
            let message=JSON.parse(msg.data)
            if (message.type === "StageSynchronizer") {
                console.log("stage status received")
                let stageStatus = JSON.parse(msg.data)
                let bothPlayersReady = Boolean(stageStatus.bothPlayersReady);
                if (bothPlayersReady) {
                    this.resumeStartTransition()
                }
            }
        })
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

    receivePoints(){
        let connection2 = getConnection();
        connection2.addEventListener('message', (msg) => {
            let message=JSON.parse(msg.data)
            if (message.type === "Points") {
                let points = Number(message.points);
                this.players[getPlayerIndex()].addPoints((this.players[getPlayerIndex()].points - points) / 2)
            }
        })
    }
}