import {TaskManager} from "../../../../objects/TaskManager.js";
import {Platform} from "../../../../objects/Platform.js";

import {OnlineCooperativeScene} from "../Base/OnlineCooperativeScene.js";
import {OnlineButton} from "../../../../objects/online/OnlineButton.js";
import {addCoopScene} from "../../../../util/ScenesRandomizer.js";

let sceneKey="OnlineCoop2"
// addCoopScene(sceneKey)

export class OnlineCoop2 extends OnlineCooperativeScene {

    
    constructor() {
        super(sceneKey,10000,'Coop2Map');
        // super("OnlineCoop2","OnlineComp2",10000,'Coop2Map');
    }

    init() {


        this.taskManager = new TaskManager(this, 3, [0, 1, 0, 1], () => {
            console.log("All tasks completed");
            this.door.open()
        }, this.timer, this.players, this.updatePoints, 50);

    }

    preload() {
    }

    create(data) {

        super.create(data)

        this.setCanvasWidth(960)


        // ************** platforms
        this.platforms = [];
        var platform1 = new Platform(this, 448, 448, '1x1', 64, -64)
        this.platforms.push(platform1)



        //**************** door
        this.setDoorPosition(64,448)

    
        let button1_P2 = new OnlineButton(this, 416, 448, 'botonL', () => {
            this.taskManager.taskCompleted();
            button1_P2.setTexture('botonLP')

            let button1_P1 = new OnlineButton(this, 416, 575, 'botonR', () => {
                platform1.enable();
                this.taskManager.taskCompleted();
                button1_P1.setTexture('botonRP')

                let button2_P2 = new OnlineButton(this, 545, 384, 'botonL', () => {
                    this.taskManager.taskCompleted();
                    // button2_P2.setVisible(false);
                    button2_P2.setTexture('botonLP')
                },this.players[1],2);
                this.buttons.push(button2_P2)
                
            }, this.players[0],1);
            this.buttons.push(button1_P1)
            
        }, this.players[1],0);
        this.buttons.push(button1_P2)

        this.setPlatformsColliders();

    }

    definePlayersPosition() {
        this.setPlayerPosition(0,100,500)

        this.setPlayerPosition(1,200,500)
    }

}