import {GameStage} from "./GameStage.js";
import {Player} from "../../../objects/Player.js";
import {KeyboardProcessor} from "../../../util/InputProcessors/KeyboardProcessor.js";
import {OnlinePlayer} from "../../../objects/online/OnlinePlayer.js";
import {getConnection, getPlayerIndex, getRoomCode} from "../../../server/Websockets/SocketIntilalizer.js";
import {OnlineKeyboardProcessor} from "../../../util/InputProcessors/OnlineKeyboardProcessor.js";

let spriteKeys = ["dude", "dude2"]

export class OnlineGameStage extends GameStage {


    create(data) {
        super.create(data);
        this.pauseStartTransition()
        this.setTimerListener();
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
                this.players[i].setAsControlledPlayer();
            } else {
                this.players[i].setOnMovementMessage();
            }
        }
    }

    setTimerListener() {
//remove the last timer
        this.remainingTime = this.getSceneSeconds()
        // this.timer={}
        this.timer.addSeconds = (ms) => {
            this.remainingTime += ms / 1000
            this.timerText.setText(this.remainingTime)
        }
        let connection = getConnection();
        this.timeListener = (msg) => this.timerListenerFunction(msg);
        // let timerListener=(msg)=>this.timerListener(msg);

        
        this.events.on('shutdown', () => connection.removeEventListener('message', this.timeListener))
    }

    timerListenerFunction(msg) {
        let message = JSON.parse(msg.data)
        if (message.type === "GameTime") {
            this.remainingTime -= 1;
            this.timerText.setText(this.remainingTime)
            if (this.remainingTime === 0) {
                this.timeOver()
                let connection = getConnection()
                connection.removeEventListener('message', this.timeListener)
            }
        }
    }

    sendReadyStatus() {
        let connection = getConnection();
        this.showWaitingForPlayersText();
        // Delegate with the function to be called
        let getMsgDelegate = (msg) => {
            this.getStageReadyMsg(msg)
        }

        // event added when a message ius received
        connection.addEventListener('message', getMsgDelegate)

        // event removed at the end of a scene
        this.events.on('shutdown', () => connection.removeEventListener('message', getMsgDelegate))

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

    
    showWaitingForPlayersText(){
        let centerX=this.game.canvas.width*.5
        let centerY=this.game.canvas.height*.5
        let waitingTextElement="Waiting for other player"
        this.waitingText = this.add.text(centerX, centerY, "Waiting for other player", {fontFamily: 'ink-free-normal',fontSize:50}).setOrigin(.5, .5);
        let i=0;
        this.waitingText.depth = 110;
        
        this.timeTextInterval=setInterval(()=>{
            this.waitingText.text = waitingTextElement + '.'.repeat(i % 4)
            i+=1;
        },1000)
    }
    
    
    addTimeListener(){
        let connection= getConnection()
        connection.addEventListener('message', this.timeListener)
    }
    
    hideWaitingForPlayerText(){
        this.waitingText.setVisible(false)
        clearInterval(this.timeTextInterval)
        
    }
    
    
    getStageReadyMsg(msg) {
        let message = JSON.parse(msg.data)
        if (message.type === "StageSynchronizer") {
            let stageStatus = JSON.parse(msg.data)
            let bothPlayersReady = Boolean(stageStatus.bothPlayersReady);
            if (bothPlayersReady) {
                this.resumeStartTransition()
                this.addTimeListener()
            }
            this.hideWaitingForPlayerText()
        }
    }

    playStartTransition() {
        this.loadTransition.playTransition(() => {

                // this.timer.resumeTimer();
                this.enableAllPlayersMovement()
            }, 500, 500
        )
    }

    receivePoints() {
        let connection = getConnection();
        let pointsMsgListener = (msg) => {
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
        }
        connection.addEventListener('message', pointsMsgListener)
        this.events.on('shutdown', () => connection.removeEventListener('message', pointsMsgListener))
    }


    receiveBump() {
        let connection3 = getConnection();
        connection3.addEventListener('message', (msg) => {
            let message = JSON.parse(msg.data)
            if (message.type === "Bump") {
                let bump = Boolean(message.bump);
                this.bump = bump;
                this.players[getPlayerIndex()].selfPush(bump);
            }
        })
    }


    update() {
        this.players[0].update(this.bump, this.players[1]);
        this.players[1].update(this.bump, this.players[0]);

        this.bump = false;
    }

    timeOver() {
        this.disableAllPlayersMovement()
        this.onTimeOverPrimitive();
    }

    playStartTransition(){

        this.loadTransition.playTransition(() => {
                this.enableAllPlayersMovement()
            }, 500, 500
        )
    }
    
    stageCompleted() {
        let connection = getConnection()
        connection.removeEventListener('message', this.timeListener)
    }
}