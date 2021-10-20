import { Player_I } from '../objects/Player_I.js'
import { GamepadProcessor } from "../util/InputProcessors/GamepadProcessor.js";
import { KeyboardProcessor } from "../util/InputProcessors/KeyboardProcessor.js";

var players = [];
var chocarse;

export class Coop1 extends Phaser.Scene {

    constructor() {
        super("Coop1");
    }
    init(){

    }
    preload() {
        this.load.tilemapTiledJSON('Coop1Map', '../Resources/assets/level/Coop1.json');
        this.load.spritesheet("dude","./Resources/assets/items/dude.png", { frameWidth: 32, frameHeight: 48 });//Current sprites from tutorial
    }

    create() {

        
        const map = this.make.tilemap({ key: 'Coop1Map' });
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createStaticLayer('Background', tileset);
        const floor = map.createStaticLayer('Level', tileset);

        floor.setCollisionByProperty({ collides: true });

        let plat1;
        let plat2;
        let door;


        this.platform1 = this.physics.add.staticGroup();
        this.platform1.create(384, 384, '1x1').setOrigin(0, 0);

        this.platform2 = this.physics.add.staticGroup();
        this.platform2.create(192, 256, 'horizontal').setOrigin(0, 0);

        let butIniAbajo = this.add.image(800, 384, 'botonR').setOrigin(0, 0);
        

        var player1 = new Player_I(this, 400, 100, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this,player1,'W',0,'A','D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 200, 100, "dude");
        player2.setPlayerInput(new KeyboardProcessor(this,player2,'U',0,'H','K', 'J', 'L'));
        players[1] = player2;

        //Colisiones

        this.physics.add.collider(players[0], players[1], function(){
            chocarse = true;
        });

        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);

        //Create the character animations (current ones are from tutorial)
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        console.log("Escena 1 creada");
    }

    update() {

        players[0].update(chocarse, players[1]);
        players[1].update(chocarse, players[0]);
        chocarse = false;

        //Añadir colisiones con los botones, lo que va debajo es lo que genera cada boton
        //Se pulsa el boton rojo 1
        //    butIniAbajo.setVisible(false);
        //    let butArriba = this.add.image(480,64,'botonL').setOrigin(0,0);
        //    plat1 =  this.physics.add.staticGroup();
        //    plat1.create(640,128,'horizontalSpawn').setOrigin(0,0);

        //Se pulsa el boton 2
        //    butArriba.setVisible(false);
        //    let butAbajo2 = this.add.image(448,384,'botonR').setOrigin(0,0);
        //    plat2 =  this.physics.add.staticGroup();
        //    plat2.create(512,448,'horizontalSpawn').setOrigin(0,0);

        //Se pulsa el boton 3
        //    butAbajo2.setVisible(false);
        //    let butAbajo3 = this.add.image(320,512,'botonL').setOrigin(0,0);
        //    this.platform2.setVisible(false);

        //Fin nivel
        //    butAbajo3.setVisible(false);
        //    this.door = this.add.image(0,448,'door').setOrigin(0,0);
        //    this.platform1.setVisible(false);
    }
}