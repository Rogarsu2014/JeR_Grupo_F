
import {TaskManager} from "../../../objects/TaskManager.js";
import {Button} from "../../../objects/Button.js";
import {Platform} from "../../../objects/Platform.js";

import {CooperativeScene} from "./Base/CooperativeScene.js";


/// Player 1 is upper layer player.
/// Player 2 is down layer player

export class Coop3 extends CooperativeScene {

    constructor() {
        super("Coop3", "Comp3", 5000,'Coop3Map');
    }

    init() {

        this.taskManager = new TaskManager(this, 4, [0, 1, 0, 1], () => {
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
        this.platforms = []
        var platform1 = new Platform(this, 320, 224, '1x1', 0, -64)
        this.platforms.push(platform1)
        var platform2 = new Platform(this, -64, 0, 'vertical1x4-5', 192, 0)
        this.platforms.push(platform2)
        var platform3 = new Platform(this, 448, 640, 'horizontal4x1', 0, -192)
        this.platforms.push(platform3)
        var platform4 = new Platform(this, 704, 352, 'vertical1x1-5', 0, 96)
        this.platforms.push(platform4)

        var platform5 = new Platform(this, 64 * 12, 64 * 4.5, 'horizontal3x1', 64 * 3, 0)
        this.platforms.push(platform5)


        //**************** door
        this.setDoorPosition(896, 448)


        ///************** players


        ///******* players points

        //*************** buttons
        var button1_P2 = new Button(this, 256, 288, 'botonL', () => {   //ley de +58
            platform2.enable()
            platform3.enable()
            this.taskManager.taskCompleted();
            this.taskManager.taskCompleted();

            button1_P2.setVisible(false);
            var button1_P2P = new Button(this, 256, 290, 'botonLP');

            var button1_P1 = new Button(this, 320, 512, 'botonR', () => {
                platform1.enable();
                this.taskManager.taskCompleted();
                button1_P1.setTexture('botonRP')

                var button1_P2 = new Button(this, 460, 288, 'botonL', () => {
                    platform2.enable()
                    platform4.enable()
                    platform5.enable()
                    this.taskManager.taskCompleted();
                    button1_P2.setTexture('botonLP')
                }, this.players[1]);

            }, this.players[0]);

        }, this.players[1]);




        //**** players and platforms
        this.setPlatformsColliders();


    }

    definePlayersPosition() {
        this.setPlayerPosition(0,100,100)
        this.setPlayerPosition(1,200,100)
    }

}