import {Player_I} from '../objects/Player_I.js'
import {cameraFadeOut} from "../util/cameraEffects.js";
import {Skull} from "../objects/Skull.js";

var players = [];
var scores = [];

export class FinPartida extends Phaser.Scene {
    constructor() {
        super("FinPartida");
    }

    init() {
        this.buttons = Phaser.GameObjects.Image = []
        this.selectedButtonIndex = 0
        this.cursors = this.input.keyboard.createCursorKeys();
        this.selectSprite = null


    }

    preload() {
    }

    create(data) {
        console.log("Fin Partida Scene created");
        this.game.canvas.width = 960;
        var width = this.game.canvas.width;
        var height = this.game.canvas.height;

        players[0] = data.ply1;
        players[1] = data.ply2;

        this.add.image(0, 0, 'victoryImage').setOrigin(0).setDepth(0).setScale(1);

        this.selectSprite = new Skull(this, width / 2 - 100, height / 2 - 100, "skull", 6)
        this.selectSprite.setVisible(false);
        this.selectSprite.setScale(.1);

        let playAgainButton = this.add.image(width *.5, height - 180, 'PlayAgain').setDepth(1);
        let mainMenuButton = this.add.image(width *.5, height - 80, 'ReturnToMenu').setDepth(1);
        this.buttons.push(playAgainButton);
        this.buttons.push(mainMenuButton);

        if (players[0] > players[1]) {
            this.add.text(width * .5, 60, "Player 1 wins!",{fontFamily: 'ink-free-normal',fontSize:80}).setOrigin(0.5,0.5)
            scores[0] = this.add.text(width * .5, 213, "Player 1: " + players[0], {fontFamily: 'ink-free-normal'}).setOrigin(0.5,0.5);
            scores[1] = this.add.text(width * .5, 233, "Player 2: " + players[1], {fontFamily: 'ink-free-normal'}).setOrigin(0.5,0.5);

        } else if (players[0] < players[1]) {
            this.add.text(width*.5, 60, "Player 2 wins!",{fontFamily: 'ink-free-normal',fontSize:80}).setOrigin(0.5,0.5);
            scores[0] = this.add.text(width * .5, 213, "Player 1: " + players[1], {fontFamily: 'ink-free-normal'}).setOrigin(0.5,0.5);
            scores[1] = this.add.text(width * .5, 233, "Player 2: " + players[0], {fontFamily: 'ink-free-normal'}).setOrigin(0.5,0.5);
        } else {
            this.add.text(width * .5, 60, "Draw!", {fontFamily: 'ink-free-normal',fontSize:80}).setOrigin(0.5,0.5);
            scores[0] = this.add.text(width * .5, 213, "Player 1: " + players[0], {fontFamily: 'ink-free-normal'}).setOrigin(0.5,0.5);
            scores[1] = this.add.text(width * .5, 233, "Player  2: " + players[1], {fontFamily: 'ink-free-normal'}).setOrigin(0.5,0.5);
        }

        this.add.image(150, 250, "daia0").setScale(0.3);
        this.add.image(800, 250, "ibban").setScale(0.3).flipX=true;

        playAgainButton.setInteractive();

        playAgainButton.on('selected', () => {
            this.scene.start('Coop1');
        })

        mainMenuButton.on('selected', () => {
            this.scene.start('MenuScene');
        })

        this.selectButton(0);
        var arrowDown = this.input.keyboard.on('keydown-' + 'DOWN', () => this.selectNextButton(-1));

        var arrowUp = this.input.keyboard.on('keydown-' + 'UP', () => this.selectNextButton(-1));

        var spaceKey = this.input.keyboard.on('keydown-' + 'SPACE', () => this.confirmSelection());

    }

    selectButton(index) {
        const button = this.buttons[index];
        this.tweens.add({
            targets: button,
            scaleX: 1.25,
            ease: 'Quart.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 125,
            yoyo: true,
            repeat: 0,            // -1: infinity
        });

        let textureName = button.texture.key + 'Push';
        button.setTexture(textureName)
        this.selectSprite.x = button.x - button.displayWidth * 0.71
        this.selectSprite.y = button.y - 2.7
        this.selectedButtonIndex = index;
        this.selectSprite.setVisible(true);
    }

    selectNextButton(change = 1) {
        const button = this.buttons[this.selectedButtonIndex];
        let textureName = button.texture.key.replace('Push', '');
        button.setTexture(textureName)
        let index = this.selectedButtonIndex + change
        if (index >= this.buttons.length) {
            index = 0
        } else if (index < 0) {
            index = this.buttons.length - 1
        }

        this.selectButton(index)
    }

    confirmSelection() {
        const button = this.buttons[this.selectedButtonIndex];

        cameraFadeOut(this, 1000, () => button.emit('selected'))
        this.input.keyboard.removeListener('keydown-' + 'DOWN');

        this.input.keyboard.removeListener('keydown-' + 'UP');

        this.input.keyboard.removeListener('keydown-' + 'SPACE');
        // button.emit('selected');
    }

}