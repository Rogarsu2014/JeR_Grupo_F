import {Timer} from "../util/Timer.js";

export class TimerTestScene extends Phaser.Scene{

    init(){
        this.timer= new Timer(this,3000,()=>console.log("completed"))
    }
    create(){
        this.timerText= this.add.text(100,10,'test')

        this.timer.startTimer()
        var keyObj = this.input.keyboard.addKey('R');  // Get key object
        keyObj.on('down',()=>this.timer.resumeTimer());

        var keyObj = this.input.keyboard.addKey('P');  // Get key object
        keyObj.on('down',()=>this.timer.pauseTimer());

        var keyObj = this.input.keyboard.addKey('A');  // Get key object
        keyObj.on('down',()=>this.timer.addSeconds(5000));
    }

    update(){
        this.timerText.setText(this.timer.getRemainingSeconds(true))
        console.log(this.timer.getRemainingSeconds(true))
    }
}