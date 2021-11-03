
import {TaskManager} from "../objects/TaskManager.js";
import {Button} from "../objects/Button.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";
import {
    cameraFadeIn,
    cameraShake,
    SweepVerticalTransitionIn,
    SweepTransitionHorizontalOut,
    SweepVerticalTransitionOut
} from "../util/cameraEffects.js";
import {CooperativeScene} from "./CooperativeScene.js";


/// Player 1 is upper layer player.
/// Player 2 is down layer player

export class Coop1 extends CooperativeScene {


    constructor() {
        super("Coop1","Comp1",15000);
    }

    init() {

        this.taskManager = new TaskManager(this, 4, [1, 0, 1, 0], () => {
            console.log("All tasks completed");
            this.door.open()
        }, this.timer, this.players, super.updatePoints, 50);

    }



    create(data) {

        super.create(data)
        this.setCanvasWidth(960)


        // ************** platforms
        this.platforms = []
        var platform1 = new Platform(this, 896-64, 128+64, 'horizontal3x1', -64 * 3, 0)
        this.platforms.push(platform1)
        var platform2 = new Platform(this, 768-64, 448+64, 'horizontal3x1', -64 * 3, 0)
        this.platforms.push(platform2)
        var platform3 = new Platform(this, 192, 256, 'horizontal2x1', -64 * 2, 0)
        this.platforms.push(platform3)
        var platform4 = new Platform(this, 384, 384, '1x1', 0, 64)
        this.platforms.push(platform4)


        //**************** door
        // door = new Door(this, 64, 448,  this.timer)
        this.setDoorPosition(64,448)

        ///************** players
        this.setPlayerPosition(0,928,64)
        // var player1 = new Player_I(this, 928, 64, "dude");
        // // data.input1.setPlayer(player1)
        // // player1.setPlayerInput(data.input1);
        // player1.setPlayerInput(new KeyboardProcessor(this, player1, 'W', 0, 'A', 'D', 'S', 'F'));
        // players[0] = player1;

        // var player2 = new Player_I(this, 820, 384, "dude2");
        // player2.setPlayerInput(new KeyboardProcessor(this, player2, 'U', 0, 'H', 'K', 'J', 'L'));
        // //player2.setPlayerInput(new GamepadProcessor(this, player2, 0, 0, 1));
        //
        // players[1] = player2;
        this.setPlayerPosition(1,820,384)

        // players[0].points = data.jug1;
        // players[1].points = data.jug2;

        // this.disableAllPlayersMovement()

        ///******* players points
        // scores[0] = this.add.text(75, 32, "Player 1: " + players[0].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);
        // scores[1] = this.add.text(this.game.canvas.width-75, 32, "Player 2: " + players[1].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);

        //*************** buttons
        var button1_P1 = new Button(this, 480, 128, 'botonR', () => {
            platform2.enable();
            this.taskManager.taskCompleted();
            button1_P1.setTexture('botonRP')
        }, this.players[0]);

        var button2_P1 = new Button(this, 360, 443 + 128+5, 'botonR', () => {
            platform4.enable();
            this.taskManager.taskCompleted()
            button2_P1.setTexture('botonRP')
        }, this.players[0]);

        var button1_P2 = new Button(this, 780, 448, 'botonL', () => {
            platform1.enable();
            this.taskManager.taskCompleted();
            button1_P2.setTexture('botonLP')
        }, this.players[1]);

        var button2_P2 = new Button(this, 480, 448, 'botonL', () => {
            platform3.enable();
            this.taskManager.taskCompleted();
            button2_P2.setTexture('botonLP')

        }, this.players[1]);

        //*************** timer
        //
        // this.timer.startTimer();
        // this.timer.pauseTimer();
        // this.loadTransition = new SweepVerticalTransitionOut(this);
        // this.loadTransition.addToScene()
        // this.loadTransition.playTransition(() => {
        //
        //         this.timer.resumeTimer();
        //         this.enableAllPlayersMovement()
        //     }, 500, 500
        // )


        // this.timerText = this.add.text(this.game.canvas.width * 0.5, 40, 'test', {
        //     fontFamily: 'ink-free-normal',
        //     fontSize: '40px'
        // }).setOrigin(0.5, 0.5);
        //
        //
        // let timerTween = this.tweens.add({
        //     targets: this.timerText,
        //     paused: true,
        //     scale: 2,
        //     y: '-=10',
        //     ease: 'Bounce.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        //     duration: 125,
        //     yoyo: true,
        //     repeat: 0,            // -1: infinity
        // });


        // this.taskManager.setOnTaskCompletedTween(timerTween)

        ///************** collisions
        //***** door and players
        // this.physics.add.collider(players[0], door, () => door.playerEntered(players[0]))
        // this.physics.add.collider(players[1], door, () => door.playerEntered(players[1]))
        // //***** between players
        // this.physics.add.collider(players[0], players[1], function () {
        //     bump = true;
        // });

        //***** players and floor
        // this.addStageFloorCollisions(floor);
        //**** players and platforms
        // this.setPlatformsColliders();
        this.setPlatformsColliders();
        console.log("Escena 1 creada");
    }



    // update() {
    //     players[0].update(bump, players[1]);
    //     players[1].update(bump, players[0]);
    //     bump = false;
    //
    //     this.timerText.setText(this.timer.getRemainingSeconds(true));
    //     this.UpdatePlatforms();
    // }


}
