
export class MenuScene extends Phaser.Scene {


    constructor() {
        super("MenuScene");
    }

    preload() {
    }

    create() {
        var width= this.game.renderer.width;
        var height = this.game.renderer.height;

        var tittle;
        this.add.image(0, 0, 'sky').setOrigin(0).setDepth(0);

        let selectSprite = this.add.image(width/ 2 - 100, height / 2 - 100, 'star');
        selectSprite.setVisible(false)
        selectSprite.setScale(1);

        tittle = this.add.text(width/ 3, height * 0.1, 'Dual Interest', { fontSize: '40px', fill: '#000' }).setDepth(1);
        let playButton = this.add.image(width/ 2, height / 2, 'play_button').setDepth(1);
        let optionsButton = this.add.image(width/ 2, height / 2 + 100, 'options_button').setDepth(1);

        playButton.setInteractive();
        playButton.on("pointerover", () => {
            selectSprite.setVisible(true)
            selectSprite.setPosition(width/ 2 - 100, height / 2)
        })

        playButton.on("pointerout", () => {
            selectSprite.setVisible(false);
        })

        optionsButton.setInteractive();
        optionsButton.on("pointerover", () => {
            selectSprite.setVisible(true)
            selectSprite.setPosition(width/ 2 - 100, height / 2 + 100)
        })

        optionsButton.on("pointerout", () => {
            selectSprite.setVisible(false)
        })

        playButton.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start('CharacterTestScene');
            }
        });
        optionsButton.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                console.log("Aqui las opciones");
            }
        
        });
    }

}

