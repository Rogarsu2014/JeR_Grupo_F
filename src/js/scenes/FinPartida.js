import { Player_I } from '../objects/Player_I.js'

var players = [];
var scores = [];

export class FinPartida extends Phaser.Scene {
    constructor() {
        super("FinPartida");
    }
    init() {
    }
    preload() {
    }
    create(data) {
        console.log("Fin Partida Scene created");

        var width= this.game.renderer.width;
        var height = this.game.renderer.height;

        players[0] = data.jug1;
        players[1] = data.jug2;

        let selectSprite = this.add.image(width/ 2 - 140, height - 140, 'star');
        selectSprite.setVisible(false)
        selectSprite.setScale(1);

        let playAgainButton = this.add.image(width/ 2 - 35, height - 140, 'play_button').setDepth(1);
        let mainMenuButton = this.add.image(width/ 2 - 35, height - 80, 'options_button').setDepth(1);


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

            this.add.image(150, 250, "skull").setScale(0.7);
            this.add.image(800, 250, "skull").setScale(0.7);
        }

        playAgainButton.setInteractive();
        playAgainButton.on("pointerover", () => {
            selectSprite.setVisible(true);
            selectSprite.setPosition(width/ 2 - 140, height - 140);
        })

        playAgainButton.on("pointerout", () => {
            selectSprite.setVisible(false);
        })

        mainMenuButton.setInteractive();
        mainMenuButton.on("pointerover", () => {
            selectSprite.setVisible(true)
            selectSprite.setPosition(width/ 2 - 140, height - 80);
        })

        mainMenuButton.on("pointerout", () => {
            selectSprite.setVisible(false)
        })

        playAgainButton.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start('CharacterTestScene');
            }
        });
        mainMenuButton.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start('MenuScene');
            }
        
        });

    }

    update() {

    }
}