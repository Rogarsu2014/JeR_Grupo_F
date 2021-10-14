import {TaskManager} from "../objects/TaskManager.js";
import {Player} from "../objects/Player.js";
import {SpriteObject} from "../objects/SpriteObject.js";
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";

export class CooperativeStage  extends Phaser.Scene{

    constructor() {
        super("CooperativeStage");
    }

    init(){
        this.taskManager= new TaskManager(4,["J1","J2","J1","J2"],[
            ()=>console.log("Task 1 completed"),
            ()=>console.log("Task 2 completed"),
            ()=>console.log("Task 3 completed"),
            ()=>console.log("Task 4 completed")
        ],()=>console.log("All tasks completed"));

        this.player = new Player(this)

        this.player.setPlayerInput(new GamepadProcessor(this,this.player,0,0));
    }

    preload(){
        this.player.preload();
    }
    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player.create();
        var keyObj = this.input.keyboard.addKey('C');  // Get key object
        keyObj.on('down',()=>this.taskManager.taskCompleted());

        var keyObj = this.input.keyboard.addKey('T');  // Get key object
        keyObj.on('down',()=>console.log(this.taskManager.getPlayerWithMoreTasksCompleted()));
    }
    update(){
        this.player.update();
        console.log("update")
        // this.gamepadProcessor.update();
    }
}