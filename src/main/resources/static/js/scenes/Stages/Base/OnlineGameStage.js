import {GameStage} from "./GameStage.js";
import {Player} from "../../../objects/Player.js";
import {KeyboardProcessor} from "../../../util/InputProcessors/KeyboardProcessor.js";
import {OnlinePlayer} from "../../../objects/OnlinePlayer.js";
import {getConnection} from "../../../server/Websockets/SocketIntilalizer.js";
import {OnlineKeyboardProcessor} from "../../../util/InputProcessors/OnlineKeyboardProcessor.js";

export class OnlineGameStage extends GameStage{
    definePlayers() {
        let movementConnection=getConnection();
        this.players[0] = new OnlinePlayer(this, 0, 0, "dude",0, movementConnection);
        // data.input1.setPlayer(player1)
        // player1.setPlayerInput(data.input1);
        this.players[0].setPlayerInput(new OnlineKeyboardProcessor(this, this.players[0], 'W', 0, 'A', 'D', 'S', 'F'));

        this.players[1] = new Player(this, 0, 0, "dude2", 0);
        this.players[1].setPlayerInput(new KeyboardProcessor(this, this.players[1], 'U', 0, 'H', 'K', 'J', 'L'));
        // this.players[1] = new OnlinePlayer(this, 0, 0, "dude2", 0,movementConnection);
        // this.players[1].setPlayerInput(new OnlineKeyboardProcessor(this, this.players[1], 'U', 0, 'H', 'K', 'J', 'L'));
    }
}