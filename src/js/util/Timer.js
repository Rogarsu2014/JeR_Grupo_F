export class Timer extends Phaser.Time.TimerEvent{

    constructor(context,time,callback=null) {
        super();
        this.context=context
        this.time=time
        this.event=undefined
        this.callback=callback
    }
    onComplete(callback){
        this.callback=callback
    }
    startTimer(){
        this.event= this.context.time.addEvent({
            delay:this.time,
            callback:this.callback
        })
    }

    pauseTimer(){
        this.event.paused=true
    }

    resumeTimer(){
        this.event.paused=false
    }

    getRemainingSeconds(rounded=false){
        if(rounded)
            return Math.round(this.event.getRemainingSeconds())
        return this.event.getRemainingSeconds()
    }


    addSeconds(seconds, callback=null) {
        this.event.delay+=seconds

        if(callback!=null){
            callback();
        }
    }
}