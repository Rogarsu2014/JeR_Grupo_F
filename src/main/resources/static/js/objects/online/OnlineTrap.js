import {Trap} from "../Trap.js";
import {Timer} from "../../util/Timer.js";

export class OnlineTrap extends Trap{
     
    
    primitiveHarm(player) {
        player.setDeath();
        let timer = new Timer(this.context, 2000, () => {
            player.removeDeath();
            player.body.moves = true;
        });
        timer.startTimer();
    }

}