import {KeyboardProcessor} from "./KeyboardProcessor.js";

export class OnlineKeyboardProcessor extends  KeyboardProcessor{
    
    update(bump, playerp) {
        this.player.moveTo()
    }
    
}