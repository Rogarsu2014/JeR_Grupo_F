import {Task} from "./Task.js";

export class TaskManager {
    constructor(context,taskCount, playersOrder, onAllCompleted,timer, players, updatePoints,onCompletedPoints) {
        this.tasks =[];
        this.onAllCompleted=onAllCompleted;
        this.playerCompletedTasksCount= {}

        for (let i = 0; i < taskCount; i++) {

            let playerIndex=playersOrder[i];
            if(this.playerCompletedTasksCount[playerIndex]===undefined)
                this.playerCompletedTasksCount[playerIndex]=0;


            this.tasks.push(new Task(playersOrder[i],()=>{
                timer.addSeconds(5000);
                updatePoints(context,playerIndex,onCompletedPoints)

            }));
        }

        this.taskIndex=-1


    }

    taskCompleted(){

        this.taskIndex++
        this.tasks[this.taskIndex].completeTask();

        if(this.taskIndex===this.tasks.length-1){
            this.onAllCompleted();
        }
    }
    setOnTaskCompletedTween(onCompleteTween){
        for (let i = 0; i < this.tasks.length; i++) {
            this.tasks[i].setOnCompleteTween(onCompleteTween);
        }
    }


    getPlayerWithMoreTasksCompleted(){
        if(this.taskIndex===-1)
            return this.tasks[this.taskIndex + 2].getPlayer();
        return this.tasks[this.taskIndex].getPlayer();
    }

    getPlayerWithLessTasksCompleted(){
        if(this.taskIndex===-1 || this.taskIndex===0)
            return this.tasks[this.taskIndex + 1].getPlayer();
        return this.tasks[this.taskIndex - 1].getPlayer();
    }
}