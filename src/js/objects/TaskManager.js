import {Task} from "./Task.js";

export class TaskManager {
    constructor(taskCount, playersOrder, onAllCompleted,timer, players, onCompletedPoints, pointsCounter) {
        this.tasks =[];
        this.onAllCompleted=onAllCompleted;
        this.playerCompletedTasksCount= {}

        for (let i = 0; i < taskCount; i++) {

            let playerIndex=playersOrder[i];
            if(this.playerCompletedTasksCount[playerIndex]===undefined)
                this.playerCompletedTasksCount[playerIndex]=0;

            this.tasks.push(new Task(playersOrder[i],()=>{
                timer.addSeconds(5000);
                players[playerIndex].points += onCompletedPoints;
                pointsCounter[playerIndex].setText( "Jugador"+(playerIndex+1)+ ": "+ players[playerIndex].points)
            }));
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