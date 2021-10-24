import { Player_I } from '../objects/Player_I.js'
import { Skull } from '../objects/Skull.js'
import { Trampa } from '../objects/Trampa.js'
import { GamepadProcessor } from "../util/InputProcessors/GamepadProcessor.js";
import { KeyboardProcessor } from "../util/InputProcessors/KeyboardProcessor.js";

var players = []
var calaveras = [];
var chocarse;
var puntuaciones = [];
var contador = 0;

export class CharacterTestScene extends Phaser.Scene {
    constructor() {
        super("CharacterTestScene");
    }
    init() {
    }
    preload() {
    }
    create() {
        console.log("Character Test Scene created");

        //Create the character at 0,0 and change its origin
        var player1 = new Player_I(this, 100, 100, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this, player1, 'W', 0, 'A', 'D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player_I(this, 200, 100, "dude");
        player2.setPlayerInput(new KeyboardProcessor(this, player2, 'U', 0, 'H', 'K', 'J', 'L'));
        players[1] = player2;
        this.physics.add.collider(players[0], players[1], function () {
            chocarse = true;
        });


        puntuaciones[0] = this.add.text(30, 0, "Jugador 1: "+ players[0].puntos);
        puntuaciones[1] = this.add.text(790, 0, "Jugador 2: "+ players[1].puntos);

        //Creación de todas las calaveras
       calaveras.push(new Skull(this, 300, 600, "calavera"));
       calaveras.push(new Skull(this, 350, 600, "calavera"));
       calaveras.push(new Skull(this, 400, 600, "calavera"));
       calaveras.push(new Skull(this, 450, 600, "calavera"));
       calaveras.push(new Skull(this, 500, 600, "calavera"));
       contador = 5;
        
        for(let i = 0; i < calaveras.length; i+=1){
            this.physics.add.collider(players[0], calaveras[i], function () {
                calaveras[i].desaparicion(players[0]);
                puntuaciones[0].setText("Jugador 1: "+players[0].puntos);
                contador--;
            });
            this.physics.add.collider(players[1], calaveras[i], function () {
                calaveras[i].desaparicion(players[1]);
                puntuaciones[1].setText("Jugador 2: "+players[1].puntos);
                contador--;
            });
        }
            
        var trampa = new Trampa(this, 600, 600, "trampa");
        this.physics.add.collider(players[0], trampa, function () {
            trampa.dañar(players[0]);
            puntuaciones[0].setText("Jugador 1: "+players[0].puntos);
        });
        this.physics.add.collider(players[1], trampa, function () {
            trampa.dañar(players[1]);
            puntuaciones[1].setText("Jugador 2: "+players[1].puntos);
        });


    }

    update() {
        puntuaciones
        players[0].update(chocarse, players[1]);
        players[1].update(chocarse, players[0]);
        chocarse = false;
        if(contador == 0){
            this.scene.start("Coop2", {jug1:players[0].puntos, jug2:players[1].puntos});
        }
    }
}