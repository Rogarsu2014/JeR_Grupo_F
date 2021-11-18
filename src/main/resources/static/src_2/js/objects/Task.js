export class Task {
    constructor(playerId,onCompleted) {
        this.completed=false;
        this.playerAssigned=playerId;
        this.onCompleted=onCompleted;
        this.onCompleteTween=null
    }

    getPlayer(){
        return this.playerAssigned;
    }
    setOnCompleteTween(onCompleteTween){
        this.onCompleteTween=onCompleteTween;
    }
    completeTask(){
        if(this.onCompleted!==null)
            this.onCompleted();
        if(this.onCompleteTween!==null){
            this.onCompleteTween.play()
        }
        this.completed=true;
    }

    isCompleted(){
        return this.completed;
    }


}