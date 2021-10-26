import {Player_I} from '../objects/Player_I.js'
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {TaskManager} from "../objects/TaskManager.js";
import {Button} from "../objects/Button.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";
import {Door} from "../objects/Door.js";
import {SweepVerticalTransitionIn, SweepVerticalTransitionOut} from "../util/cameraEffects.js";

const nextLevelKey = "Comp2"
var players = [];
var bump;
var scores = [];
var door;

export class Coop2 extends Phaser.Scene {

    constructor() {
        super("Coop2");
    }

    init() {

        this.timer = new Timer(this, 20000)

        this.taskManager = new TaskManager(this, 3, [0, 1, 0, 1], () => {
            console.log("All tasks completed");
            door.open()
        }, this.timer, players, this.updatePoints, 50);

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

    create(data) {
        this.game.canvas.width = 960;
        this.physics.world.setBounds(0,0,this.game.canvas.width, this.game.canvas.height)

        const map = this.make.tilemap({key: 'Coop2Map'});
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createStaticLayer('Background', tileset);

        // ************** platforms
        this.platforms = [];
        var platform1 = new Platform(this, 448, 448, '1x1', 64, -64)
        this.platforms.push(platform1)

        const floor = map.createLayer('Level', tileset);
        floor.setCollisionByProperty({collides: true});

        //**************** door
        door = new Door(this, 64, 448, 'door', this.timer)

        //Creacion de pjs
        var player1 = new Player_I(this, 100, 500, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this, player1, 'W', 0, 'A', 'D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 200, 500, "dude2");
        player2.setPlayerInput(new KeyboardProcessor(this, player2, 'U', 0, 'H', 'K', 'J', 'L'));
        players[1] = player2;

        players[0].points = data.ply1;
        players[1].points = data.ply2;

        players[0].disableMovement()
        players[1].disableMovement()

        scores[0] = this.add.text(75, 32, "Player 1: " + players[0].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);
        scores[1] = this.add.text(this.game.canvas.width-75, 32, "Player 2: " + players[1].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);

        this.physics.add.collider(players[0], players[1], function () {
            bump = true;
        });
        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);


        //poner botones
//FALTA DETECCIÓN DE LO DE ALTURA
//this.taskManager.taskCompleted();

        var button1_P2 = new Button(this, 416, 443, 'botonL', () => {
            this.taskManager.taskCompleted();
            button1_P2.setTexture('botonLP')
            button1_P1.setVisible(true);
        }, players[1]);

        let button1_P1 = new Button(this, 416, 570, 'botonR', () => {
            platform1.enable();
            this.taskManager.taskCompleted();
            button1_P1.setTexture('botonRP')
            button2_P2.setVisible(true);
        }, players[0]);
        button1_P1.setVisible(false);

        let button2_P2 = new Button(this, 545, 379, 'botonL', () => {
            this.taskManager.taskCompleted();
            button2_P2.setTexture('botonLP')
        }, players[1]);
        button2_P2.setVisible(false);

        this.timer.startTimer();
        this.timer.pauseTimer();

        this.timerText = this.add.text(this.game.canvas.width * 0.5, 40, '', {
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


        this.loadTransition = new SweepVerticalTransitionOut(this);
        this.loadTransition.addToScene()
        this.loadTransition.playTransition(() => {

                this.timer.resumeTimer();
                this.enableAllPlayersMovement()
            }, 500, 500
        )
        this.physics.add.collider(players[0], door, () => door.playerEntered(players[0]))
        this.physics.add.collider(players[1], door, () => door.playerEntered(players[1]))
        //***** between players
        this.physics.add.collider(players[0], players[1], function () {
            bump = true;
        });

        this.addStageFloorCollisions(floor);

        this.setPlatformsColliders();

        this.timer.startTimer();

        console.log("Escena 2 creada");
    }

    timeOver() {

        let playerIndexWithMoreTasksCompleted = this.taskManager.getPlayerWithMoreTasksCompleted();
        this.timerOverUpdatePoints(this, playerIndexWithMoreTasksCompleted, 500)

        let playerWithLessTasksCompleted = this.taskManager.getPlayerWithLessTasksCompleted();
        this.timerOverUpdatePoints(this, playerWithLessTasksCompleted, -500)

        let timeOverTimer = new Timer(this, 1000, () => {
            let endTransition = new SweepVerticalTransitionIn(this);
            endTransition.addToScene()
            endTransition.playTransition(() => {
                this.startNextLevel()
            }, 1000, 2000)
        })
        timeOverTimer.startTimer()

    }

    update() {
        players[0].update(bump, players[1]);
        players[1].update(bump, players[0]);
        bump = false;

        this.timerText.setText(this.timer.getRemainingSeconds(true));
        this.UpdatePlatforms();
    }

    updatePoints(context, playerIndex, points) {
        if ((players[playerIndex].points + points) <= 0) {
            players[playerIndex].points = 0;
        } else {
            players[playerIndex].points += points;
        }
        scores[playerIndex].setText("Player" + (playerIndex + 1) + ": " + players[playerIndex].points);

        let textTween = context.tweens.add({
            targets: scores[playerIndex],
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
        scores[playerIndex].setText("Player" + (playerIndex + 1) + ": " + players[playerIndex].points);

        let textTween;
        if (points < 0)
            textTween = context.tweens.add({
                targets: scores[playerIndex],
                paused: true,
                rotation: .5,
                // scaleX:1.5,
                scaleY: 1.2,
                y: '+=5',
                ease: 'Sine.easeIn',
                onStart: () => {
                    scores[playerIndex].setTint(Phaser.Display.Color.GetColor(255, 0, 0));
                },
                onComplete: (tween) => {
                    scores[playerIndex].setTint(Phaser.Display.Color.GetColor(255, 255, 255));
                },
                // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 100,
                yoyo: true,
                repeat: 1,            // -1: infinity
            });
        else
            textTween = context.tweens.add({
                targets: scores[playerIndex],
                paused: true,
                scaleX: 1.5,
                y: '+=15',
                ease: 'Quart.in',
                onStart: () => {
                    scores[playerIndex].setTint(Phaser.Display.Color.GetColor(0, 255, 255));
                },
                onComplete: () => {
                    scores[playerIndex].setTint(Phaser.Display.Color.GetColor(255, 255, 255));
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
        this.scene.start(nextLevelKey, {ply1:players[0].points, ply2:players[1].points})
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