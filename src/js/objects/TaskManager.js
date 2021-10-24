import {Task} from "./Task.js";

export class TaskManager {
    constructor(context,taskCount, playersOrder, onAllCompleted,timer, players, onCompletedPoints, pointsCounter) {
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
                let timerTween=context.tweens.add({
                    targets: pointsCounter[playerIndex],
                    paused:true,
                    scaleX:1.3,
                    ease: 'Sine.easeIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 250,
                    yoyo:true,
                    repeat: 0,            // -1: infinity
                });
                timerTween.play()
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
    setOnTaskCompletedTween(onCompleteTween){
        for (let i = 0; i < this.tasks.length; i++) {
            this.tasks[i].setOnCompleteTween(onCompleteTween);
        }
    }
    getPlayerWithMoreTasksCompleted(){
        if(this.taskIndex!=-1)
            return this.tasks[this.taskIndex].getPlayer();
        return "None";
    }
}