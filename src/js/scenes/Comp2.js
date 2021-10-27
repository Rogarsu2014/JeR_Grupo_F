import {Player_I} from '../objects/Player_I.js'
import { Skull } from '../objects/Skull.js'
import { Trampa } from '../objects/Trampa.js'
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";
import {cameraFadeOut, SweepVerticalTransitionOut} from "../util/cameraEffects.js";

const nextLevelKey = "Coop3"

var players = [];
var skulls = [];
var bump;
var scores = [];
var counter = 0;

var music;
const backgroundMusicKey= 'compStageMusic';

export class Comp2 extends Phaser.Scene{

    constructor() {
        super("Comp2");
    }

    init(){
        this.timer= new Timer(this,30000,()=>this.startNextLevel())
    }

    preload(){
        }

    create(data){

        this.loadBackgroundMusic()
        this.playBackgroundMusic()

        this.game.canvas.width = (960);
        this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height);

        const map = this.make.tilemap({ key: 'Comp2Map'});
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createStaticLayer('Background', tileset);
        const floor = map.createStaticLayer('Level', tileset);

        floor.setCollisionByProperty({ collides: true });

        this.platforms=[]
        var platform1= new Platform(this, 64 * 3, 64*5, 'platS', 0, 0)
        this.platforms.push(platform1)
        var platform2= new Platform(this, 64 * 2, 64*6, 'platS', 0, 0)
        this.platforms.push(platform2)
        var platform3= new Platform(this, 64 * 2, 64*8, 'platS', 0, 0)
        this.platforms.push(platform3)
        var platform4= new Platform(this, 64 * 4, 64*7, 'platS', 0, 0)
        this.platforms.push(platform4)
        var platform5= new Platform(this, 64 * 11, 64*5, 'platS', 0, 0)
        this.platforms.push(platform5)
        var platform6= new Platform(this, 64 * 10, 64*6, 'platS', 0, 0)
        this.platforms.push(platform6)
        var platform7= new Platform(this, 64 * 10, 64*8, 'platS', 0, 0)
        this.platforms.push(platform7)
        var platform8= new Platform(this, 64 * 12, 64*7, 'platS', 0, 0)
        this.platforms.push(platform8)
        var platform9= new Platform(this, 64 * 0, 64*2, 'platS', 0, 0)
        this.platforms.push(platform9)
        var platform10= new Platform(this, 64 * 14, 64*2, 'platS', 0, 0)
        this.platforms.push(platform10)
        var platform11= new Platform(this, 64 * 1, 64*3, 'platM', 0, 0)
        this.platforms.push(platform11)
        var platform12= new Platform(this, 64 * 12, 64*3, 'platM', 0, 0)
        this.platforms.push(platform12)
        var platform13= new Platform(this, 64 * 6.5, 64*4, 'platM', 0, 0)
        this.platforms.push(platform13)
        var platform14= new Platform(this, 64 * 4, 64*2, 'platS', 0, 0)
        this.platforms.push(platform14)
        var platform15= new Platform(this, 64 * 5, 64*3, 'platS', 0, 0)
        this.platforms.push(platform15)
        var platform16= new Platform(this, 64 * 10, 64*2, 'platS', 0, 0)
        this.platforms.push(platform16)
        var platform17= new Platform(this, 64 * 9, 64*3, 'platS', 0, 0)
        this.platforms.push(platform17)
        var platform18= new Platform(this, 64 * 5, 64*1, 'platM', 0, 0)
        this.platforms.push(platform18)
        var platform19= new Platform(this, 64 * 8, 64*1, 'platM', 0, 0)
        this.platforms.push(platform19)
        //const platformsTile = map.createStaticLayer('Platform', platf);



        var player1 = new Player_I(this, 300, 500, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this,player1,'W',0,'A','D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 800, 500, "dude2");
        player2.setPlayerInput(new KeyboardProcessor(this,player2,'U',0,'H','K', 'J', 'L'));
        players[1] = player2;
        players[0].points = data.ply1;
        players[1].points = data.ply2;

        players[0].disableMovement()
        players[1].disableMovement()

        this.physics.add.collider(players[0], players[1], function(){
            bump = true;
        });
        
        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);

        //Creación de todas las skulls
        skulls.push(new Skull(this, 30, 50, "skull"));
        skulls.push(new Skull(this, 30, 165, "skull"));
        skulls.push(new Skull(this, 95, 415, "skull"));
        skulls.push(new Skull(this, 290, 325, "skull"));

        skulls.push(new Skull(this, 345, 30, "skull"));
        skulls.push(new Skull(this, 500, 225, "skull"));
        skulls.push(new Skull(this, 620, 30, "skull"));

        skulls.push(new Skull(this, 610, 415, "skull"));
        skulls.push(new Skull(this, 800, 325, "skull"));
        skulls.push(new Skull(this, 930, 165, "skull"));
        skulls.push(new Skull(this, 930, 50, "skull"));

        counter = 11;

        for (let i = 0; i < skulls.length; i += 1) {
            this.physics.add.collider(players[0], skulls[i],  ()=> {
                skulls[i].desaparicion(players[0]);
                scores[0].setText("Player 1: " + players[0].points);
                counter--;
                if (counter == 0) {
                    this.startNextLevel();
                }
            });
            this.physics.add.collider(players[1], skulls[i], ()=> {
                skulls[i].desaparicion(players[1]);
                scores[1].setText("Player 2: " + players[1].points);
                counter--;
                if (counter == 0) {
                    this.startNextLevel();
                }
            });
        }

        scores[0] = this.add.text(75, 32, "Player 1: "+ players[0].points, {
            fontFamily: 'ink-free-normal'
        }).setOrigin(.5, .5);;
        scores[1] = this.add.text(this.game.canvas.width-75, 32, "Player 2: "+ players[1].points, {
            fontFamily: 'ink-free-normal'
        }).setOrigin(.5, .5);;

        //************** Initial transition

        this.timer.startTimer();
        this.timer.pauseTimer();
        this.loadTransition = new SweepVerticalTransitionOut(this);
        this.loadTransition.addToScene()
        this.loadTransition.playTransition(() => {

                this.timer.resumeTimer();
                this.enableAllPlayersMovement()
            }, 500, 500
        )

        this.timerText= this.add.text(this.game.canvas.width * 0.5, 40,'test', {
            fontFamily: 'ink-free-normal',
            fontSize: '40px'
        }).setOrigin(0.5, 0.5);

        this.addStageFloorCollisions(floor);
        this.setPlatformsColliders();

        console.log("Escena comp 2 creada");
    }

    update(){
        players[0].update(bump, players[1]);
        players[1].update(bump, players[0]);
        bump = false;
        this.timerText.setText(this.timer.getRemainingSeconds(true));
        this.UpdatePlatforms();
    }



    setPlatformsColliders(){

        for (let i = 0; i < this.platforms.length; i++) {
            this.physics.add.collider(players[0],  this.platforms[i],()=>console.log("over platform" ))
            this.physics.add.collider(players[1],  this.platforms[i],()=>console.log("over platform" ))
        }
    }

    addStageFloorCollisions(floor) {
        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);
    }



    UpdatePlatforms(){
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].movePlatform()
        }
    }

    startNextLevel(){
        this.timer.pauseTimer();
        this.disableAllPlayersMovement()
        cameraFadeOut(this, 1000, () => {
            music.stop()
            this.scene.start(nextLevelKey, {
                    ply1: players[0].points,
                    ply2: players[1].points
                }
            )})
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