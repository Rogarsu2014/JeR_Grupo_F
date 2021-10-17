export class Gamepad {

    constructor(context, padIndex = 0) {

        this.padIndex=padIndex;
        // this.setPad(padIndex);
        this.context = context;

    }

    setPad(){
        this.gamepad = this.context.input.gamepad.getPad(this.padIndex);
    }
    onConnected(event){
        this.context.input.gamepad.once('connected',event);
    }


    onButtonDown(buttonIndex, event) {
        if (this.gamepadButtons === undefined) {
            this.gamepadButtons = this.gamepad.buttons;
        }
        this.gamepadButtons[buttonIndex].events = new Phaser.Events.EventEmitter();
        this.gamepadButtons[buttonIndex].events.on("down", event,this.context);
    }

    get getPad() {
        return this.gamepad;
    }

    get getLeftHorizontalValue(){
        return this.gamepad.axes[0].getValue()
    }
    get getLeftVerticalValue(){
        return this.gamepad.axes[1].getValue()
    }

    get getRightHorizontalValue(){
        return this.gamepad.axes[2].getValue()
    }
    get getRightVerticalValue(){
        return this.gamepad.axes[3].getValue()
    }

    get axis(){
        if(this.gamepad===undefined)
            return false
        return this.gamepad.axes.length;
    }
}