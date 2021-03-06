import {GameCompletedScene} from "./GameCompletedScene.js";
import {getConnection, getPlayerIndex, getRoomCode, setRoomCode} from "../server/Websockets/SocketIntilalizer.js";
import {getUser} from "../server/PlayersDataManager.js";
import {isHost, removeHostProperty} from "../server/HostData.js";


export class OnlineGameCompletedScene extends GameCompletedScene {
    constructor() {
        super("OnlineGameCompletedScene");
        
    }

    create(data) {
        super.create(data);
        
        this.checkWinner();

        if (isHost()) {
            this.removeRoom();
            removeHostProperty();
        }
        setRoomCode(undefined);
    }

    removeRoom() {
        let connection = getConnection()
        let message = {
            type: "Room",
            type2: "RemoveRoom",
            RoomCode: getRoomCode()
        }
        connection.send(JSON.stringify(message))
    }

    checkWinner() {

        let connection = getConnection()

        let playerIndex = getPlayerIndex()

        if (this.winnerIndex === playerIndex) {

            let playerVictoryMessage = {
                type: "PlayerVictory",
                username: getUser().username
            }

            connection.send(JSON.stringify(playerVictoryMessage))

        } else if (this.winnerIndex !== -1) {
            this.stopBackgroundMusic()
            this.backgroundMusicKey = 'DefeatMusic'
            this.loadBackgroundMusic(true)
            this.playBackgroundMusic()
        }

    }

    setPlayAgainAction() {
        this.playAgainSceneKey = 'HostOrJoin'
    }
}