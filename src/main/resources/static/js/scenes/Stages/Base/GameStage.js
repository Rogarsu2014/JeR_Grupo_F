import {Timer} from "../../../util/Timer.js";
import {Player} from "../../../objects/Player.js";
import {KeyboardProcessor} from "../../../util/InputProcessors/KeyboardProcessor.js";
import {SweepVerticalTransitionIn, SweepVerticalTransitionOut} from "../../../util/cameraEffects.js";
import {Door} from "../../../objects/Door.js";

export class GameStage extends Phaser.Scene {


    constructor(sceneKey, nextLevelKey, timerTime, tilemapKey, sceneWidth) {
        super(sceneKey);
        this.nextLevelKey = nextLevelKey
        this.players = [];
        this.bump = false;
        this.scores = [];
        this.door = null;
        this.music = null;
        this.sceneWidth = sceneWidth;
        this.backgroundMusicKey = 'coopStageMusic';

        this.tilemapKey = tilemapKey;
        this.timer = new Timer(this, timerTime)
        this.timer.onComplete(() => {
            this.timeOver()
        })
    }

    init() {

    }

    create(data) {

        this.loadBackgroundMusic()
        this.playBackgroundMusic()

        this.setCanvasWidth(this.sceneWidth)
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        let floor = this.createFloor(this.tilemapKey);


        this.definePlayers();

        this.players[0].depth = 2
        this.players[1].depth = 2
        this.definePlayersPosition();
        this.setPlayersData(data)
        this.disableAllPlayersMovement()

        this.scores[0] = this.add.text(75, 32, "Player 1: " + this.players[0].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);
        this.scores[1] = this.add.text(this.game.canvas.width - 75, 32, "Player 2: " + this.players[1].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);

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

        //***** between players
        this.physics.add.collider(this.players[0], this.players[1], () => {
            this.bump = true;
        });
        //***** between players and floor
        this.addStageFloorCollisions(floor);

    }

    update() {
        this.players[0].update(this.bump, this.players[1]);
        this.players[1].update(this.bump, this.players[0]);

        this.bump = false;

        this.timerText.setText(this.timer.getRemainingSeconds(true));

    }

    setPlayersData(data) {
        if (Object.keys(data).length !== 0) {  // if object has information
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].points = data.playerPoints[i];
            }
        }
    }

    definePlayers() {
        this.players[0] = new Player(this, 0, 0, "dude");
        // data.input1.setPlayer(player1)
        // player1.setPlayerInput(data.input1);
        this.players[0].setPlayerInput(new KeyboardProcessor(this, this.players[0], 'W', 0, 'A', 'D', 'S', 'F'));

        this.players[1] = new Player(this, 0, 0, "dude2");
        this.players[1].setPlayerInput(new KeyboardProcessor(this, this.players[1], 'U', 0, 'H', 'K', 'J', 'L'));
    }

    setPlayerPosition(playerIndex, x, y) {
        this.players[playerIndex].setPosition(x, y);
    }

    setDoorPosition(x, y) {
        this.door.setPosition(x, y);
    }

    setCanvasWidth(width) {
        this.game.canvas.width = width;
        this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height)
    }

    createFloor(tilemapKey) {
        //*************** tilemap
        let map = this.make.tilemap({key: tilemapKey});
        let tileset = map.addTilesetImage('Tileset', 'tileset');

        ///************** floor
        let floor = map.createLayer('Level', tileset);
        map.createLayer('Background', tileset);
        floor.setCollisionByProperty({collides: true});
        floor.depth = 2
        return floor;
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

    timeOver() {
        this.timer.pauseTimer();
        this.disableAllPlayersMovement()
        this.onTimeOverPrimitive();

    }

    onTimeOverPrimitive() {
        throw new Error("timeOver() method must be defined");
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
        this.scene.start(this.nextLevelKey, {playerPoints: [this.players[0].points, this.players[1].points]})
    }


    addStageFloorCollisions(floor) {
        this.physics.add.collider(this.players[0], floor);
        this.physics.add.collider(this.players[1], floor);
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

    definePlayersPosition() {
        throw new Error("Players position must be set")
    }

    stageCompleted() {
        throw new Error("Players position must be set")
    }
}