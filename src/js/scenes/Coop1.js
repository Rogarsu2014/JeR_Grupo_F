import {Player_I} from '../objects/Player_I.js';
import {Skull} from '../objects/Skull.js';
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {TaskManager} from "../objects/TaskManager.js";
import {Button} from "../objects/Button.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";
import {Door} from "../objects/Door.js";
import {cameraFadeIn, cameraShake, SweepTransition, SweepTransitionHorizontal} from "../util/cameraEffects.js";


var players = [];
var calaveras = [];
var chocarse;
var pointsCounter = [];
var door;

/// Player 1 is upper layer player.
/// Player 2 is down layer player

export class Coop1 extends Phaser.Scene {


    constructor() {
        super("Coop1");
    }

    init() {

        this.timer = new Timer(this, 5000)

        this.taskManager = new TaskManager(this, 4, [1, 0, 1, 0], () => {
            console.log("All tasks completed");
            door.open()
        }, this.timer, players, this.updatePoints, 500);

        this.timer.onComplete(() => {
            console.log(
                this.taskManager.getPlayerWithMoreTasksCompleted()
            );
            this.timeOver()
            this.timer.pauseTimer();
        })
    }

    preload() {
    }


        //this.physics.world.setFPS(120);
        
        const map = this.make.tilemap({ key: 'Coop1Map' });

        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createLayer('Background', tileset);

        // ************** platforms
        this.platforms = []
        var platform1 = new Platform(this, 896, 128, 'horizontal4x1', -64 * 4, 0)
        this.platforms.push(platform1)
        var platform2 = new Platform(this, 768, 448, 'horizontal4x1', -64 * 4, 0)
        this.platforms.push(platform2)
        var platform3 = new Platform(this, 192, 256, 'horizontal2x1', -64 * 2, 0)
        this.platforms.push(platform3)
        var platform4 = new Platform(this, 384, 384, '1x1', 0, 64)
        this.platforms.push(platform4)

        ///************** floor
        const floor = map.createStaticLayer('Level', tileset);
        floor.setCollisionByProperty({collides: true});

        //**************** door
        door = new Door(this, 64, 448, 'door', this.timer)

        ///************** players
        var player1 = new Player_I(this, 928, 64, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this, player1, 'W', 0, 'A', 'D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 820, 384, "dude");
        // player2.setPlayerInput(new KeyboardProcessor(this, player2, 'U', 0, 'H', 'K', 'J', 'L'));
        player2.setPlayerInput(new GamepadProcessor(this, player2, 0, 0, 1));
        players[1] = player2;

        players[0].points = data.jug1;
        players[1].points = data.jug2;

        players[0].disableMovement()
        players[1].disableMovement()
        ///******* players points
        pointsCounter[0] = this.add.text(75, 32, "Jugador 1: " + players[0].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);
        pointsCounter[1] = this.add.text(790 + 60 + 30, 32, "Jugador 2: " + players[1].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);

        //*************** buttons

        var button1_P1 = new Button(this, 480, 123, 'botonL', () => {
            platform2.enable();
            this.taskManager.taskCompleted();
            button1_P1.setVisible(false);
            var button1_P1P = new Button(this, 478, 123, 'botonLP');
        }, players[0]);

        var button2_P1 = new Button(this, 360, 443 + 128, 'botonL', () => {
            platform4.enable();
            this.taskManager.taskCompleted();
            button2_P1.setVisible(false);
            var button2_P1P = new Button(this, 358, 443 + 128, 'botonLP');
        }, players[0]);

        var button1_P2 = new Button(this, 780, 443, 'botonR', () => {
            platform1.enable();
            this.taskManager.taskCompleted();
            button1_P2.setVisible(false);
            var button1_P2P = new Button(this, 778, 443, 'botonRP');
        }, players[1]);

        var button2_P2 = new Button(this, 480, 443, 'botonR', () => {
            platform3.enable();
            this.taskManager.taskCompleted();
            button2_P2.setVisible(false);
            var button2_P2P = new Button(this, 478, 443, 'botonRP');
        }, players[1]);

        //*************** timer

        this.timer.startTimer();
        this.timer.pauseTimer();
        this.loadTransition = new SweepTransitionHorizontal(this);
        this.loadTransition.addToScene()
        this.loadTransition.playTransition(() => {

                this.timer.resumeTimer();
                this.enableAllPlayersMovement()
            }, 500, 500
        )


        this.timerText = this.add.text(this.game.config.width * 0.5, 40, 'test', {
            fontFamily: 'ink-free-normal',
            fontSize: '40px'
        }).setOrigin(0.5, 0.5);

        let timerTween = this.tweens.add({
            targets: this.timerText,
            paused: true,
            scale: 2,
            y: '-=10',
            ease: 'Bounce.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 125,
            yoyo: true,
            repeat: 0,            // -1: infinity
        });


        this.taskManager.setOnTaskCompletedTween(timerTween)

        ///************** collisions
        //***** door and players
        this.physics.add.collider(players[0], door, () => door.playerEntered(players[0]))
        this.physics.add.collider(players[1], door, () => door.playerEntered(players[1]))
        //***** between players
        this.physics.add.collider(players[0], players[1], function () {
            chocarse = true;
        });

        //***** players and floor
        this.addStageFloorCollisions(floor);
        //**** players and platforms
        this.setPlatformsColliders();

        console.log("Escena 1 creada");
    }

    timeOver() {

        let playerIndexWithMoreTasksCompleted = this.taskManager.getPlayerWithMoreTasksCompleted();
        this.timerOverUpdatePoints(this, playerIndexWithMoreTasksCompleted, 500)

        let playerWithLessTasksCompleted = this.taskManager.getPlayerWithLessTasksCompleted();
        this.timerOverUpdatePoints(this, playerWithLessTasksCompleted, -500)

        let timeOverTimer = new Timer(this, 1000, () => {
            let endTransition = new SweepTransition(this);
            endTransition.addToScene()
            endTransition.playTransition(() => {
                this.startNextLevel()
            }, 1000, 2000)
        })
        timeOverTimer.startTimer()

    }

    update() {
        players[0].update(chocarse, players[1]);
        players[1].update(chocarse, players[0]);
        chocarse = false;

        this.timerText.setText(this.timer.getRemainingSeconds(true));
        this.UpdatePlatforms();
    }

    updatePoints(context, playerIndex, points) {
        if ((players[playerIndex].points + points) <= 0) {
            players[playerIndex].points = 0;
        } else {
            players[playerIndex].points += points;
        }
        pointsCounter[playerIndex].setText("Jugador" + (playerIndex + 1) + ": " + players[playerIndex].points);

        let textTween = context.tweens.add({
            targets: pointsCounter[playerIndex],
            paused: true,
            scaleX: .9,
            ease: 'Sine.easeIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 100,
            yoyo: true,
            repeat: 0,            // -1: infinity
        });
        textTween.play()
    }

    timerOverUpdatePoints(context, playerIndex, points) {
        if ((players[playerIndex].points + points) <= 0) {
            players[playerIndex].points = 0;
        } else {
            players[playerIndex].points += points;
        }
        pointsCounter[playerIndex].setText("Jugador" + (playerIndex + 1) + ": " + players[playerIndex].points);

        let textTween;
        if (points < 0)
            textTween = context.tweens.add({
                targets: pointsCounter[playerIndex],
                paused: true,
                rotation: .5,
                // scaleX:1.5,
                scaleY: 1.2,
                y: '+=5',
                ease: 'Sine.easeIn',
                onStart: () => {
                    pointsCounter[playerIndex].setTint(Phaser.Display.Color.GetColor(255, 0, 0));
                },
                onComplete: (tween) => {
                    pointsCounter[playerIndex].setTint(Phaser.Display.Color.GetColor(255, 255, 255));
                },
                // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 100,
                yoyo: true,
                repeat: 1,            // -1: infinity
            });
        else
            textTween = context.tweens.add({
                targets: pointsCounter[playerIndex],
                paused: true,
                scaleX: 1.5,
                y: '+=15',
                ease: 'Quart.in',
                onStart: () => {
                    pointsCounter[playerIndex].setTint(Phaser.Display.Color.GetColor(0, 255, 255));
                },
                onComplete: () => {
                    pointsCounter[playerIndex].setTint(Phaser.Display.Color.GetColor(255, 255, 255));
                },
                // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 200,
                yoyo: true,
                repeat: 0,            // -1: infinity
            });
        textTween.play()
    }

    enableAllPlayersMovement() {
        for (let i = 0; i < players.length; i++) {
            players[i].enableMovement()
        }
    }

    disableAllPlayersMovement() {
        for (let i = 0; i < players.length; i++) {
            players[i].disableMovement()
        }
    }

    addPointsToPlayer(playerIndex, points) {
        players[0].puntos += points;
    }

    startNextLevel() {
        this.scene.start("CharacterTestScene", null)
    }

    setPlatformsColliders() {

        for (let i = 0; i < this.platforms.length; i++) {
            this.physics.add.collider(players[0], this.platforms[i], () => console.log("over platform"))
            this.physics.add.collider(players[1], this.platforms[i], () => console.log("over platform"))
        }
    }

    setPlayerDoorInteraction() {
        for (let i = 0; i < players.length; i++) {
            this.physics.add.collider(players[i], door.playerEntered(players[i]))
        }
    }

    addStageFloorCollisions(floor) {
        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);
    }


    UpdatePlatforms() {
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].movePlatform()
        }
    }
}
