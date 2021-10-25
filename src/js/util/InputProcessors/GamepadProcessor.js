import {InputProcessor} from "./InputProcessor.js";
import {Gamepad} from "../Gamepad.js";

export class GamepadProcessor extends InputProcessor {

    constructor(context, player, padIndex = 0, jumpButton, dashButton) {
        super(context, player, jumpButton, dashButton);

        this.padIndex = padIndex;
        this.gamepad = new Gamepad(context, padIndex);

        this.gamepad.onConnected(() => {
            this.gamepad.setPad();
            this.setJumpButton();
        })
    }

    onConnected(event) {
        this.context.input.gamepad.once('connected', event);
    }
    getPadIndex(){
        return this.padIndex;
    }

    setJumpButton() {
        this.gamepad.onButtonDown(this.jumpButton, () => this.player.jump())
    }


    update() {
        if (this.gamepad.axis) {

            let leftHorizontalVale = Math.round(this.gamepad.getLeftHorizontalValue);

            if (leftHorizontalVale===-1) {
                this.player.moveLeft()
            }
            else if(leftHorizontalVale===1){
                this.player.moveRight()
            }else{
                this.player.idle()
            }
        }
    }
}