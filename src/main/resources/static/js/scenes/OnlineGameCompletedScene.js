import {GameCompletedScene} from "./GameCompletedScene.js";
import {getConnection, getPlayerIndex} from "../server/Websockets/SocketIntilalizer.js";
import {getUser} from "../server/PlayersDataManager.js";


export class OnlineGameCompletedScene extends GameCompletedScene {
    constructor() {
        super("OnlineGameCompletedScene");
    }

    create(data) {
        super.create(data);
        this.checkWinner();
        
        this.playAgainButton.removeAllListeners('selected')
        this.playAgainButton.on('selected',()=>{
            this.scene.start('HostOrJoin');
        })
    }

    checkWinner() {
        
        let connection = getConnection()
        
        let playerIndex = getPlayerIndex()
        
        if (this.winnerIndex === playerIndex) {
            
          let playerVictoryMessage={
              type:"PlayerVictory",
              username:getUser().username
          }
          
          connection.send(JSON.stringify(playerVictoryMessage))
        }
    }

}