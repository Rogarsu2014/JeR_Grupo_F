import {Player_I} from '../objects/Player_I.js';
import {Skull} from '../objects/Skull.js';
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {TaskManager} from "../objects/TaskManager.js";
import {Button} from "../objects/Button.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";
import {Door} from "../objects/Door.js";
import {cameraFadeIn, cameraShake, SweepVerticalTransitionIn, SweepTransitionHorizontalOut} from "../util/cameraEffects.js";

const nextLevelKey = "Comp3"

var players = [];
var bump;
var scores = [];
var door;

var music;
const backgroundMusicKey= 'coopStageMusic';
/// Player 1 is upper layer player.
/// Player 2 is down layer player

export class Coop3 extends Phaser.Scene{

    constructor() {
        super("Coop3");
    }

    init(){
        this.timer = new Timer(this, 20000)

        this.taskManager = new TaskManager(this, 4, [0, 1, 0, 1], () => {
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

    preload(){
        }

    create(data){

        this.loadBackgroundMusic()
        this.playBackgroundMusic()

        this.game.canvas.width = 960;
        this.physics.world.setBounds(0,0,this.game.canvas.width, this.game.canvas.height)

        const map = this.make.tilemap({ key: 'Coop3Map'});
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createStaticLayer('Background', tileset);

        // ************** platforms
        this.platforms = []
        var platform1 = new Platform(this, 320, 224, '1x1', 0, -64)
        this.platforms.push(platform1)
        var platform2 = new Platform(this, -64, 0, 'vertical1x4-5', 192, 0)
        this.platforms.push(platform2)
        var platform3 = new Platform(this, 448, 640, 'horizontal4x1', 0, -192)
        this.platforms.push(platform3)
        var platform4 = new Platform(this, 704, 352,'vertical1x1-5', 0, 96)
        this.platforms.push(platform4)

        var platform5 = new Platform(this, 64 * 12, 64 * 4.5,'horizontal3x1', 64*3,0)
        this.platforms.push(platform5)

        /*let platArr1 =  this.physics.add.staticGroup();
        platArr1.create(320,224,'1x1').setOrigin(0,0);
        let platArr2 =  this.physics.add.staticGroup();
        platArr2.create(768,288,'horizontal3x1').setOrigin(0,0);
        let platAbj =  this.physics.add.staticGroup();
        platAbj.create(704,352,'vertical1x1-5').setOrigin(0,0);
        let butIniArr = this.add.image(256,224,'botonR').setOrigin(0,0);
        let butIniAbj = this.add.image(320,448,'botonL').setOrigin(0,0);*/
        
        const floor = map.createStaticLayer('Level', tileset);
        floor.setCollisionByProperty({ collides: true });

        //**************** door
        door = new Door(this, 896,448,this.timer,false)


        //faltan colisiones con el pj, son estilo;
        // this.physics.add.collider(player, obj);

        //let butIniArriba = this.add.image(384,384,'botonR').setOrigin(0,0);       

        ///************** players
        var player1 = new Player_I(this, 100, 100, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this,player1,'W',0,'A','D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 200, 100, "dude2");
        player2.setPlayerInput(new KeyboardProcessor(this,player2,'U',0,'H','K', 'J', 'L'));
        players[1] = player2;

        players[0].points = data.ply1;
        players[1].points = data.ply2;

        players[0].disableMovement()
        players[1].disableMovement()
        ///******* players points
        scores[0] = this.add.text(75, 32, "Player 1: " + players[0].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);
        scores[1] = this.add.text(this.game.canvas.width-75,32, "Player 2: " + players[1].points, {fontFamily: 'ink-free-normal'}).setOrigin(.5, .5);

        //*************** buttons
        var button1_P2 = new Button(this, 256, 288, 'botonL', () => {   //ley de +58
            platform2.enable()
            platform3.enable()
            this.taskManager.taskCompleted();
            this.taskManager.taskCompleted();

            button1_P2.setVisible(false);
            var button1_P2P = new Button(this, 256, 290, 'botonLP');
            
            var button1_P1 = new Button(this, 320,512, 'botonR', () => {
                platform1.enable();
                this.taskManager.taskCompleted();
                button1_P1.setTexture('botonRP')

                var button1_P2 = new Button(this,  460,288, 'botonL', () => {
                    platform2.enable()
                    platform4.enable()
                    platform5.enable()
                    this.taskManager.taskCompleted();
                    button1_P2.setTexture('botonLP')
                }, players[1]);

            }, players[0]);

        }, players[1]);


        //*************** timer

        this.timer.startTimer();
        this.timer.pauseTimer();
        this.loadTransition = new SweepTransitionHorizontalOut(this);
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

        ///************** collisions
        //***** door and players
        this.physics.add.collider(players[0], door, () => door.playerEntered(players[0]))
        this.physics.add.collider(players[1], door, () => door.playerEntered(players[1]))
        //***** between players
        this.physics.add.collider(players[0], players[1], function () {
            bump = true;
        });

        //***** players and floor
        this.addStageFloorCollisions(floor);
        //**** players and platforms
        this.setPlatformsColliders();

        console.log("Escena 3 creada");
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

    update(){
        players[0].update(bump, players[1]);
        players[1].update(bump, players[0]);
        bump = false;

        this.timerText.setText(this.timer.getRemainingSeconds(true));
        this.UpdatePlatforms();
    //Añadir colisiones con los botones, lo que va debajo es lo que genera cada boton
            //Botón de arriba pulsado
        /*butIniArr.setVisible(false);
        let butAbj2 = this.add.image(768,512,'botonL').setOrigin(0,0);
        plat =  this.physics.add.staticGroup();
        plat.create(448,448,'horizontal4x1').setOrigin(0,0);
        plat.create(64,0,'vertical1x4-5').setOrigin(0,0);*/

        //Botón de abajo pulsado
        
        /*butIniAbj.setVisible(false);
        platArr1.setVisible(false);
        let butArr2 = this.add.image(460,224,'botonR').setOrigin(0,0);*/

        //Segundo botón supeior pillado
        /*butArr2.setVisible(false);
        platAbj.setVisible(false);*/

        //Segundo botón inferior pillado
        /*butAbj2.setVisible(false);
        platArr2.setVisible(false);*/

        //la puerta apareceria al tocar la llave
        //this.door = this.add.image(896,448,'door').setOrigin(0,0);
    }
    
    updatePoints(context, playerIndex, points) {
        if ((players[playerIndex].points + points) <= 0) {
            players[playerIndex].points = 0;
        } else {
            players[playerIndex].points += points;
        }
        scores[playerIndex].setText("Player " + (playerIndex + 1) + ": " + players[playerIndex].points);

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
        scores[playerIndex].setText("Player " + (playerIndex + 1) + ": " + players[playerIndex].points);

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
        music.stop()
        this.scene.start(nextLevelKey,{ply1:players[0].points, ply2:players[1].points})
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
    playBackgroundMusic(){
        music.play();
    }
    loadBackgroundMusic(){
        music = this.sound.add(backgroundMusicKey,{volume:0.18});
    }
    stopBackgroundMusic(){
        music.stop()
    }
}