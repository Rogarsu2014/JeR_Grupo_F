import {GameCompletedScene} from "./GameCompletedScene.js";
import {getConnection, getPlayerIndex} from "../server/Websockets/SocketIntilalizer.js";
import {getUsername} from "../server/PlayersDataManager.js";


export class OnlineGameCompletedScene extends GameCompletedScene {
    constructor() {
        super("OnlineGameCompletedScene");
    }

    create(data) {
        super.create(data);
        this.checkWinner();
    }

    checkWinner() {
        
        let connection = getConnection()
        
        let playerIndex = getPlayerIndex()
        
        if (this.winnerIndex === playerIndex) {
            
          let playerVictoryMessage={
              type:"PlayerVictory",
              username:getUsername()
          }
          
          connection.send(JSON.stringify(playerVictoryMessage))
        }
    }

}