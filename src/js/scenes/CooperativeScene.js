import {Timer} from "../util/Timer.js";
import {Player_I} from "../objects/Player_I.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {SweepVerticalTransitionOut} from "../util/cameraEffects.js";
import {Door} from "../objects/Door.js";

export class CooperativeScene extends Phaser.Scene {


    constructor(sceneKey, nextLevelKey, timerTime) {
        super(sceneKey);
        this.nextLevelKey = nextLevelKey
        this.players = [];
        this.bump = false;
        this.scores = [];
        this.door = null;
        this.music = null;
        this.backgroundMusicKey = 'coopStageMusic';

        this.timer = new Timer(this, timerTime)
        this.timer.onComplete(() => {
            console.log(
                this.taskManager.getPlayerWithMoreTasksCompleted()
            );
            this.timeOver()
            this.timer.pauseTimer();
        })
    }

    init() {

    }

    create(data) {
        this.loadBackgroundMusic()
        this.playBackgroundMusic()

        this.setCanvasWidth(960)

        let floor = this.createFloor('Coop1Map');

        this.door = new Door(this, 0, 0,  this.timer)

        this.players[0]  = new Player_I(this, 0, 0, "dude");
        // data.input1.setPlayer(player1)
        // player1.setPlayerInput(data.input1);
        this.players[0]  .setPlayerInput(new KeyboardProcessor(this, this.players[0] , 'W', 0, 'A', 'D', 'S', 'F'));

        this.players[1] = new Player_I(this, 0, 0, "dude2");
        this.players[1].setPlayerInput(new KeyboardProcessor(this, this.players[1] , 'U', 0, 'H', 'K', 'J', 'L'));
        //player2.setPlayerInput(new GamepadProcessor(this, player2, 0, 0, 1));
        this.disableAllPlayersMovement()

        this.scores[0] = this.add.text(75, 32, "Player 1: " + this.players[0].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);
        this.scores[1] = this.add.text(this.game.canvas.width-75, 32, "Player 2: " + this.players[1].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);

        this.timer.startTimer();
        this.timer.pauseTimer();

        this.loadTransition = new SweepVerticalTransitionOut(this);
        this.loadTransition.addToScene()
        this.loadTransition.playTransition(() => {

                this.timer.resumeTimer();
                this.enableAllPlayersMovement()
            }, 500, 500
        )

        this.timerText = this.add.text(this.game.canvas.width * 0.5, 40, 'test', {
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

        this.physics.add.collider(this.players[0], this.door, () => this.door.playerEntered(this.players[0]))
        this.physics.add.collider(this.players[1], this.door, () => this.door.playerEntered(this.players[1]))
        //***** between players
        this.physics.add.collider(this.players[0], this.players[1], function () {
            this.bump = true;
        });

        this.addStageFloorCollisions( floor);
        //**** players and platforms
        // this.setPlatformsColliders();
    }

    update() {
        this.players[0].update(this.bump, this.players[1]);
        this.players[1].update(this.bump, this.players[0]);
        this.bump = false;

        this.timerText.setText(this.timer.getRemainingSeconds(true));
        this.UpdatePlatforms();
    }

    setPlayerPosition(playerIndex,x,y){
        this.players[playerIndex].setPosition(x,y);
    }

    setDoorPosition(x,y){
        this.door.setPosition(x,y);
    }

    setCanvasWidth(width) {
        this.game.canvas.width = width;
        this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height)
    }

    createFloor(tilemapKey) {
        //*************** tilemap
        const map = this.make.tilemap({key: tilemapKey});
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        ///************** floor
        const floor = map.createLayer('Level', tileset);
        map.createStaticLayer('Background', tileset);
        floor.setCollisionByProperty({collides: true});
        return floor;
    }

    updatePoints(context, playerIndex, points) {
        if ((this.players[playerIndex].points + points) <= 0) {
            this.players[playerIndex].points = 0;
        } else {
            this.players[playerIndex].points += points;
        }
        this.scores[playerIndex].setText("Player " + (playerIndex + 1) + ": " + this.players[playerIndex].points);

        let textTween = context.tweens.add({
            targets: this.scores[playerIndex],
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

    disableAllPlayersMovement() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].disableMovement()
        }
    }

    addPointsToPlayer(playerIndex, points) {
        this.players[0].puntos += points;
    }

    startNextLevel() {
        this.music.stop()
        this.scene.start(this.nextLevelKey, {ply1: this.players[0].points, ply2: this.players[1].points})
    }

    setPlatformsColliders() {

        for (let i = 0; i < this.platforms.length; i++) {
            this.physics.add.collider(this.players[0], this.platforms[i], () => console.log("over platform"))
            this.physics.add.collider(this.players[1], this.platforms[i], () => console.log("over platform"))
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


    playBackgroundMusic() {
        this.music.play();
    }

    loadBackgroundMusic() {
        this.music = this.sound.add(this.backgroundMusicKey, {volume: 0.18});
    }

    stopBackgroundMusic() {
        this.music.stop()
    }
}