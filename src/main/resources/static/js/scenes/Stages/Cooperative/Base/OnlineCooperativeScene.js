import {OnlineGameStage} from "../../Base/OnlineGameStage.js";
import {Door} from "../../../../objects/Door.js";
import {Timer} from "../../../../util/Timer.js";
import {SweepVerticalTransitionIn} from "../../../../util/cameraEffects.js";
import {getConnection, getRoomCode} from "../../../../server/Websockets/SocketIntilalizer.js";
import {getNextRandomComp} from "../../../../util/ScenesRandomizer.js";

export class OnlineCooperativeScene extends OnlineGameStage {
    constructor(sceneKey, timerTime, tilemapKey, sceneWidth = 960) {
        super(sceneKey, timerTime, tilemapKey, 960);

        this.backgroundMusicKey = 'coopStageMusic';


    }

    create(data) {

        super.create(data)
        this.buttons = []
        /// only coop
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
        this.door = new Door(this, 0, 0, this.timer)
        this.door.depth = 1

        this.taskManager.setOnTaskCompletedTween(timerTween)

        this.physics.add.collider(this.players[0], this.door, () => this.door.playerEntered(this.players[0]))
        this.physics.add.collider(this.players[1], this.door, () => this.door.playerEntered(this.players[1]))


        this.setOnButtonInfoReceived()
        this.nextLevelKey = "Online" + getNextRandomComp();
        //**** players and platforms
        // this.setPlatformsColliders();
    }

    update() {
        super.update();
        this.UpdatePlatforms();
    }


    setDoorPosition(x, y) {
        this.door.setPosition(x, y);
    }


    updatePoints(context, playerIndex, points) {
        if ((context.players[playerIndex].points + points) <= 0) {
            context.players[playerIndex].points = 0;
        } else {
            context.players[playerIndex].points += points;
        }
        context.scores[playerIndex].setText("Player " + (playerIndex + 1) + ": " + context.players[playerIndex].points);

        let textTween = context.tweens.add({
            targets: context.scores[playerIndex],
            paused: true,
            scaleX: .9,
            ease: 'Sine.easeIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 100,
            yoyo: true,
            repeat: 0,            // -1: infinity
        });
        textTween.play()
    }

    onTimeOverPrimitive() {

        let playerIndexWithMoreTasksCompleted = this.taskManager.getPlayerWithMoreTasksCompleted();
        this.timerOverUpdatePoints(this, playerIndexWithMoreTasksCompleted, 100)

        let playerWithLessTasksCompleted = this.taskManager.getPlayerWithLessTasksCompleted();
        this.timerOverUpdatePoints(this, playerWithLessTasksCompleted, -100)

        let timeOverTimer = new Timer(this, 1000, () => {
            let endTransition = new SweepVerticalTransitionIn(this);
            endTransition.addToScene()
            endTransition.playTransition(() => {
                this.startNextLevel()
            }, 1000, 2000)
        })
        timeOverTimer.startTimer()

    }

    stageCompleted() {
        super.stageCompleted()
        this.timer.pauseTimer();
        let timeOverTimer = new Timer(this, 1000, () => {
            let endTransition = new SweepVerticalTransitionIn(this);
            endTransition.addToScene()
            endTransition.playTransition(() => {
                this.startNextLevel()
            }, 1000)
        })
        timeOverTimer.startTimer()
    }

    timerOverUpdatePoints(context, playerIndex, points) {
        if ((this.players[playerIndex].points + points) <= 0) {
            this.players[playerIndex].points = 0;
        } else {
            this.players[playerIndex].points += points;
        }
        this.scores[playerIndex].setText("Player " + (playerIndex + 1) + ": " + this.players[playerIndex].points);

        let textTween;
        if (points < 0)
            textTween = context.tweens.add({
                targets: this.scores[playerIndex],
                paused: true,
                rotation: .5,
                // scaleX:1.5,
                scaleY: 1.2,
                y: '+=5',
                ease: 'Sine.easeIn',
                onStart: () => {
                    this.scores[playerIndex].setTint(Phaser.Display.Color.GetColor(255, 0, 0));
                },
                onComplete: (tween) => {
                    this.scores[playerIndex].setTint(Phaser.Display.Color.GetColor(255, 255, 255));
                },
                // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 100,
                yoyo: true,
                repeat: 1,            // -1: infinity
            });
        else
            textTween = context.tweens.add({
                targets: this.scores[playerIndex],
                paused: true,
                scaleX: 1.5,
                y: '+=15',
                ease: 'Quart.in',
                onStart: () => {
                    this.scores[playerIndex].setTint(Phaser.Display.Color.GetColor(0, 255, 255));
                },
                onComplete: () => {
                    this.scores[playerIndex].setTint(Phaser.Display.Color.GetColor(255, 255, 255));
                },
                // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 200,
                yoyo: true,
                repeat: 0,            // -1: infinity
            });
        textTween.play()
    }

    enableAllPlayersMovement() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].enableMovement()
        }
    }


    addPointsToPlayer(playerIndex, points) {
        this.players[0].puntos += points;
    }


    setPlatformsColliders() {

        for (let i = 0; i < this.platforms.length; i++) {
            this.physics.add.collider(this.players[0], this.platforms[i], () => {
            })
            this.physics.add.collider(this.players[1], this.platforms[i], () => {
            })
        }
    }

    setPlayerDoorInteraction() {
        for (let i = 0; i < this.players.length; i++) {
            this.physics.add.collider(this.players[i], this.door.playerEntered(this.players[i]))
        }
    }

    addStageFloorCollisions(floor) {
        this.physics.add.collider(this.players[0], floor);
        this.physics.add.collider(this.players[1], floor);
    }

    UpdatePlatforms() {
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].movePlatform()
        }
    }

    setOnButtonInfoReceived() {
        let connection = getConnection()
        let btnPressedMsg = (msg) => {

            let message = JSON.parse(msg.data)
            if (message.type === "CooperativeButton") {
                let pressedButtonIndex = message.buttonIndex
                this.buttons[pressedButtonIndex].press();
            }
        }
        connection.addEventListener('message', btnPressedMsg)

        this.events.on('shutdown', () => connection.removeEventListener('message',btnPressedMsg))

    }
}