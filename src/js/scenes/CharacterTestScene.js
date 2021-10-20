import {Player_I} from '../objects/Player_I.js'
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";

var players = [];
var chocarse;

export class CharacterTestScene extends Phaser.Scene {
    constructor() {
        super("CharacterTestScene");
    }
    init() {
    }
    preload() {
        this.load.spritesheet("dude","./Resources/assets/items/dude.png", { frameWidth: 32, frameHeight: 48 });//Current sprites from tutorial
    }
    create() {
        console.log("Character Test Scene created");

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
        
    }

    update() {
        players[0].update(chocarse, players[1]);
        players[1].update(chocarse, players[0]);
        chocarse = false;
    }
}