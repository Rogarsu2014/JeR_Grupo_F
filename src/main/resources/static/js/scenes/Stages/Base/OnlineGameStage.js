import {GameStage} from "./GameStage.js";
import {Player} from "../../../objects/Player.js";
import {KeyboardProcessor} from "../../../util/InputProcessors/KeyboardProcessor.js";
import {OnlinePlayer} from "../../../objects/OnlinePlayer.js";
import {getConnection} from "../../../server/Websockets/SocketIntilalizer.js";
import {OnlineKeyboardProcessor} from "../../../util/InputProcessors/OnlineKeyboardProcessor.js";

let spriteKeys=["dude","dude2"]
export class OnlineGameStage extends GameStage{
    
    definePlayers() {
        
        let movementConnection=getConnection();
        this.setDefinePlayerIndex()
        this.players[0] = new OnlinePlayer(this, 0, 0, "dude",0);
        // data.input1.setPlayer(player1)
        // player1.setPlayerInput(data.input1);
        // this.players[0].setPlayerInput(new OnlineKeyboardProcessor(this, this.players[0], 'W', 0, 'A', 'D', 'S', 'F'));

        this.players[1] = new OnlinePlayer(this, 0, 0, "dude2", 0);
        // this.players[1].setPlayerInput(new KeyboardProcessor(this, this.players[1], 'U', 0, 'H', 'K', 'J', 'L'));
        
        // this.players[1] = new OnlinePlayer(this, 0, 0, "dude2", 0,movementConnection);
        // this.players[1].setPlayerInput(new OnlineKeyboardProcessor(this, this.players[1], 'U', 0, 'H', 'K', 'J', 'L'));
    }
    
    setDefinePlayerIndex(){
        let connection = getConnection()
        connection.addEventListener('message',(msg)=>{
            let message=JSON.parse(msg.data) 
            if (message.type==="TEST_MovementPlayerIndexSetter"){
                let onlinePlayerIndex = message.index
                let playerPoxX=this.players[onlinePlayerIndex].x
                let playerPoxY=this.players[onlinePlayerIndex].y
                
                // this.players[onlinePlayerIndex].destroy()
                for (let i = 0; i < this.players.length; i++) {
                    if (i === onlinePlayerIndex){
                        this.players[i].setConnection(connection)
                        this.players[i].setPlayerInput(new OnlineKeyboardProcessor(this, this.players[onlinePlayerIndex], 'W', 0, 'A', 'D', 'S', 'F'));
                    }else{
                        this.players[i].setConnection(connection)        
                    }
                }
                // this.players[onlinePlayerIndex].setConnection(connection)
                // this.players[onlinePlayerIndex]= new OnlinePlayer(this, playerPoxX, playerPoxY, spriteKeys[onlinePlayerIndex],0, connection);
                // this.players[onlinePlayerIndex].setPlayerInput(new OnlineKeyboardProcessor(this, this.players[onlinePlayerIndex], 'W', 0, 'A', 'D', 'S', 'F'));
            }
        })
    }
}