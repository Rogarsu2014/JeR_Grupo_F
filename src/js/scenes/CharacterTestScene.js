import {Player} from './Player.js'

var players = [];
var keys;

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
        var player1 = new Player(this, 100, 100, "dude", 0);
        players[0] = player1;
        var player2 = new Player(this, 200, 100, "dude", 1);
        players[1] = player2;

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

        //Create the variable cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys("W, A, S, D, U, H, J, K, L, F");


    }

    update() {
        players[0].update(keys);
        players[1].update(keys);
    }
}