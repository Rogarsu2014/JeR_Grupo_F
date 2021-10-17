import {Task} from "./Task.js";

export class TaskManager {
    constructor(taskCount, playersOrder,onCompletedCallbacks, onAllCompleted) {
        this.tasks =[];
        this.onAllCompleted=onAllCompleted;
        this.playerCompletedTasksCount= {}

        for (let i = 0; i < taskCount; i++) {

            if(this.playerCompletedTasksCount[playersOrder[i]]===undefined)
                this.playerCompletedTasksCount[playersOrder[i]]=0;

            this.tasks.push(new Task(playersOrder[i],onCompletedCallbacks[i]));
        }

        this.taskIndex=-1


    }

    taskCompleted(){

        this.taskIndex++
        this.tasks[this.taskIndex].completeTask();

        if(this.taskIndex==this.tasks.length-1){
            this.onAllCompleted();
        }
    }

    getPlayerWithMoreTasksCompleted(){
        if(this.taskIndex!=-1)
            return this.tasks[this.taskIndex].getPlayer();
        return "None";
    }
}