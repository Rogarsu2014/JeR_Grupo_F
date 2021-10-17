import {TaskManager} from "../objects/TaskManager.js";
import {Player_I} from "../objects/Player_I.js";
import {SpriteObject} from "../objects/SpriteObject.js";
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";

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

        this.player1 = new Player_I(this)
        this.player1.setPlayerInput(new GamepadProcessor(this,this.player1,0,0));

        this.player2 = new Player_I(this)
        this.player2.setPlayerInput(new KeyboardProcessor(this,this.player2,'SPACE',0,'LEFT','RIGHT'));
    }

    preload(){
        this.player1.preload();
        this.player2.preload();
    }
    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player1.create();
        this.player2.create();
        var keyObj = this.input.keyboard.addKey('C');  // Get key object
        keyObj.on('down',()=>this.taskManager.taskCompleted());

        var keyObj = this.input.keyboard.addKey('T');  // Get key object
        keyObj.on('down',()=>console.log(this.taskManager.getPlayerWithMoreTasksCompleted()));
    }
    update(){
        this.player1.update();
        this.player2.update();
        // console.log("update")
        // this.gamepadProcessor.update();
    }
}