import { Player_I } from '../objects/Player_I.js';
import { Skull } from '../objects/Skull.js';
import { GamepadProcessor } from "../util/InputProcessors/GamepadProcessor.js";
import { KeyboardProcessor } from "../util/InputProcessors/KeyboardProcessor.js";

var players = [];
var calaveras = [];
var chocarse;
var puntuaciones = [];

export class Coop1 extends Phaser.Scene {

    constructor() {
        super("Coop1");
    }
    init(){
    }
    preload() {
    }

    create(data) {
        
        const map = this.make.tilemap({ key: 'Coop1Map' });
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createStaticLayer('Background', tileset);
        const floor = map.createStaticLayer('Level', tileset);

        floor.setCollisionByProperty({ collides: true });

        this.platform1 = this.physics.add.staticGroup();
        this.platform1.create(384, 384, '1x1').setOrigin(0, 0);

        this.platform2 = this.physics.add.staticGroup();
        this.platform2.create(192, 256, 'horizontal').setOrigin(0, 0);

        let butIniAbajo = this.add.image(800, 384, 'botonR').setOrigin(0, 0);

        //Colisiones

        this.physics.add.collider(players[0], players[1], function(){
            chocarse = true;
        });

        this.physics.add.collider(players[0], floor);
        this.physics.add.collider(players[1], floor);

        
        puntuaciones[0] = this.add.text(30, 0, "Jugador 1: "+ players[0].puntos);
        puntuaciones[1] = this.add.text(790, 0, "Jugador 2: "+ players[1].puntos);

        //Creación de todas las calaveras
       calaveras.push(new Skull(this, 20, 500, "calavera"));
       calaveras.push(new Skull(this, 20, 100, "calavera"));
       calaveras.push(new Skull(this, 700, 100, "calavera"));
       calaveras.push(new Skull(this, 750, 400, "calavera"));
       calaveras.push(new Skull(this, 350, 550, "calavera"));
        
        for(let i = 0; i < calaveras.length; i+=1){
            this.physics.add.collider(players[0], calaveras[i], function () {
                calaveras[i].desaparicion(players[0]);
                puntuaciones[0].setText("Jugador 1: "+players[0].puntos);
            });
            this.physics.add.collider(players[1], calaveras[i], function () {
                calaveras[i].desaparicion(players[1]);
                puntuaciones[1].setText("Jugador 2: "+players[1].puntos);
            });
        }

        console.log("Escena 1 creada");
    }

    update() {

        players[0].update(chocarse, players[1]);
        players[1].update(chocarse, players[0]);
        chocarse = false;
    }
}