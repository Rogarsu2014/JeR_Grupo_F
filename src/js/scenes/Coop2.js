import {Player_I} from '../objects/Player_I.js'
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";

var players = [];
var chocarse;

export class Coop2 extends Phaser.Scene{

    constructor() {
        super("Coop2");
    }

    preload(){
        this.load.spritesheet("dude","./Resources/assets/items/dude.png", { frameWidth: 32, frameHeight: 48 });//Current sprites from tutorial
        this.load.tilemapTiledJSON('Coop2Map', '../Resources/assets/level/Coop2.json');
        }

    create(){
        const map = this.make.tilemap({ key: 'Coop2Map'});
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createStaticLayer('Background', tileset);
        const floor = map.createStaticLayer('Level', tileset);

        floor.setCollisionByProperty({ collides: true });

        let plat;
        let door;

        //faltan colisiones con el pj, son estilo;
        // this.physics.add.collider(player, obj);

        let butIniArriba = this.add.image(384,384,'botonR').setOrigin(0,0);       

        //Create the character at 0,0 and change its origin
        var player1 = new Player_I(this, 100, 100, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this,player1,'W',0,'A','D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 200, 100, "dude");
        player2.setPlayerInput(new KeyboardProcessor(this,player2,'U',0,'H','K', 'J', 'L'));
        players[1] = player2;

        this.physics.add.collider(players[0], players[1], function(){
            chocarse = true;
        });

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
        
        console.log("Escena 2 creada");
    }

    update(){
        players[0].update(chocarse, players[1]);
        players[1].update(chocarse, players[0]);
        chocarse = false;
    //Añadir colisiones con los botones, lo que va debajo es lo que genera cada boton
            //Se pulsa el boton rojo 1
        //    butIniArriba.setVisible(false);
        // let butAbajo = this.add.image(448,512,'botonL').setOrigin(0,0);
        
            //Se pulsa el boton 2
        //   butAbajo.setVisible(false);
        // let butFinal = this.add.image(512,320,'botonR').setOrigin(0,0);
        // plat =  this.physics.add.staticGroup();
        // plat.create(512,384,'1x1').setOrigin(0,0);

                //Fin nivel
        //    butFinal.setVisible(false);
        // this.door = this.add.image(896,448,'door').setOrigin(0,0);
    }
}