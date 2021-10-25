import {Player_I} from '../objects/Player_I.js'
import {cameraFadeOut} from "../util/cameraEffects.js";

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

        players[0] = data.jug1;
        players[1] = data.jug2;

        this.selectSprite = this.add.image(width / 2 - 100, height / 2 - 100, 'skull')
        this.selectSprite.setVisible(false)
        this.selectSprite.setScale(.2);

        let playAgainButton = this.add.image(width / 2 - 35, height - 180, 'PlayAgain').setDepth(1);
        let mainMenuButton = this.add.image(width / 2 - 35, height - 80, 'ReturnToMenu').setDepth(1);
        this.buttons.push(playAgainButton);
        this.buttons.push(mainMenuButton);

        if (players[0] > players[1]) {
            this.add.text(320, 20, "¡El jugador 1 ha ganado!")
            scores[0] = this.add.text(350, 213, "Jugador 1: " + players[0]);
            scores[1] = this.add.text(350, 233, "Jugador 2: " + players[1]);

        } else if (players[0] < players[1]) {
            this.add.text(320, 20, "¡El jugador 2 ha ganado!")
            scores[0] = this.add.text(350, 213, "Jugador 1: " + players[1]);
            scores[1] = this.add.text(350, 233, "Jugador 2: " + players[0]);
        } else {
            this.add.text(320, 20, "¡Se ha producido un empate!")
            scores[0] = this.add.text(350, 213, "Jugador 1: " + players[0]);
            scores[1] = this.add.text(350, 233, "Jugador 2: " + players[1]);
        }

        this.add.image(150, 250, "daia0").setScale(0.3);
        this.add.image(800, 250, "ibban").setScale(0.3);

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