export class Task {
    constructor(playerId,onCompleted) {
        this.completed=false;
        this.playerAssigned=playerId;
        this.onCompleted=onCompleted;
    }

    getPlayer(){
        return this.playerAssigned;
    }

    completeTask(){
        if(this.onCompleted!==null)
            this.onCompleted();
        this.completed=true;
    }

    isCompleted(){
        return this.completed;
    }


}