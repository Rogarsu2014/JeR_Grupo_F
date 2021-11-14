import { Player } from '../objects/Player.js'
import { Skull } from '../objects/Skull.js'
import { Trap } from '../objects/Trap.js'
import { GamepadProcessor } from "../util/InputProcessors/GamepadProcessor.js";
import { KeyboardProcessor } from "../util/InputProcessors/KeyboardProcessor.js";

var players = []
var skulls = [];
var bump;
var scores = [];
var counter = 0;

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

        this.game.scale.resize(1480, 640);

        //Create the character at 0,0 and change its origin
        var player1 = new Player(this, 100, 100, "dude");
        player1.setPlayerInput(new KeyboardProcessor(this, player1, 'W', 0, 'A', 'D', 'S', 'F'));
        players[0] = player1;
        var player2 = new Player(this, 200, 100, "dude2");
        player2.setPlayerInput(new KeyboardProcessor(this, player2, 'U', 0, 'H', 'K', 'J', 'L'));
        players[1] = player2;
        this.physics.add.collider(players[0], players[1], function () {
            bump = true;
        });


        scores[0] = this.add.text(30, 0, "Jugador 1: "+ players[0].points);
        scores[1] = this.add.text(790, 0, "Jugador 2: "+ players[1].points);

        //Creación de todas las skulls
       skulls.push(new Skull(this, 300, 600, "skull"));
       skulls.push(new Skull(this, 350, 600, "skull"));
       skulls.push(new Skull(this, 400, 600, "skull"));
       skulls.push(new Skull(this, 450, 600, "skull"));
       skulls.push(new Skull(this, 500, 600, "skull"));
       counter = 5;
        
        for(let i = 0; i < skulls.length; i+=1){
            this.physics.add.collider(players[0], skulls[i], function () {
                skulls[i].desaparicion(players[0]);
                scores[0].setText("Jugador 1: "+players[0].points);
                counter--;
            });
            this.physics.add.collider(players[1], skulls[i], function () {
                skulls[i].desaparicion(players[1]);
                scores[1].setText("Jugador 2: "+players[1].points);
                counter--;
            });
        }
            
        var trap = new Trap(this, 600, 615, "trap");
        this.physics.add.collider(players[0], trap, function () {
            trap.harm(players[0]);
            scores[0].setText("Jugador 1: "+players[0].points);
        });
        this.physics.add.collider(players[1], trap, function () {
            trap.harm(players[1]);
            scores[1].setText("Jugador 2: "+players[1].points);
        });


    }

    update() {
        scores
        players[0].update(bump, players[1]);
        players[1].update(bump, players[0]);
        bump = false;
        if(counter == 0){
            this.scene.start("Coop3", {jug1:players[0].points, jug2:players[1].points});
        }
    }
}