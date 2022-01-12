import {Trap} from "../Trap.js";
import {Timer} from "../../util/Timer.js";

export class OnlineTrap extends Trap{
     
    
    primitiveHarm(player) {
        player.setDeath();
        if (player.isControlledPlayer)
            this.playEffect()
    }
    
    timerAction(player) {
        super.timerAction(player);
        player.removeDeath();
    }
}