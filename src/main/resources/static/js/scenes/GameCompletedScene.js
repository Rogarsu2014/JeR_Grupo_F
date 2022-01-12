import {Player} from '../objects/Player.js'
import {cameraFadeOut} from "../util/cameraEffects.js";
import {Skull} from "../objects/Skull.js";
import {Timer} from "../util/Timer.js";
import {redefineArrays} from "../util/ScenesRandomizer.js";


// const backgroundMusicKey = 'VictoryMusic';
let victory, victory1, defeat, defeat1;


export class GameCompletedScene extends Phaser.Scene {
    constructor(sceneKey = "GameCompletedScene") {
        super(sceneKey);
        this.playerPoints = []
        this.scores = []
        this.winnerIndex = -1;
        this.playAgainSceneKey = 'Coop1'
        this.mainMenuKey = 'MenuSceneWS'
        this.backgroundMusicKey = 'VictoryMusic'
        this.music = null
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

        this.loadBackgroundMusic();
        this.playBackgroundMusic()
        this.game.canvas.width = 960;
        var width = this.game.canvas.width;
        var height = this.game.canvas.height;

        this.playerPoints[0] = data.playerPoints[0];
        this.playerPoints[1] = data.playerPoints[1];

        this.add.image(0, 0, 'victoryImage').setOrigin(0).setDepth(0).setScale(1);

        this.selectSprite = new Skull(this, width / 2 - 100, height / 2 - 100, "skull", 6)
        this.selectSprite.setVisible(false);
        this.selectSprite.setScale(.1);

        this.playAgainButton = this.add.image(width * .5, height - 180, 'PlayAgain').setDepth(1);
        this.mainMenuButton = this.add.image(width * .5, height - 80, 'ReturnToMenu').setDepth(1);
        this.buttons.push(this.playAgainButton);
        this.buttons.push(this.mainMenuButton);

        if (this.playerPoints[0] > this.playerPoints[1]) {
            this.winnerIndex = 0;
            this.add.text(width * .5, 60, "Player 1 wins!", {
                fontFamily: 'ink-free-normal',
                fontSize: 80,
                color: '#ffcd03'
            }).setOrigin(0.5, 0.5)
            this.scores[0] = this.add.text(width * .5, 213, "Player 1: " + this.playerPoints[0], {
                fontFamily: 'ink-free-normal',
                fontSize: 60,
                color: '#ffffff'
            }).setOrigin(0.5, 0.5);
            this.scores[1] = this.add.text(width * .5, 293, "Player 2: " + this.playerPoints[1], {
                fontFamily: 'ink-free-normal',
                fontSize: 40,
                color: '#000000'
            }).setOrigin(0.5, 0.5);
            victory = this.add.image(150, 250, "daia0").setScale(0.3).setVisible(1);
            victory1 = this.add.image(150, 250, "DaiaVictoryPose").setScale(0.3).setVisible(0);
            defeat = this.add.image(800, 250, "Ibban_Muerte").setScale(0.3).setVisible(1);
            defeat.flipX = true;
            defeat1 = this.add.image(800, 250, "Ibban_Muerte2").setScale(0.3).setVisible(0);
            defeat1.flipX = true;
            this.playAnim();

        } else if (this.playerPoints[0] < this.playerPoints[1]) {
            this.winnerIndex = 1
            this.add.text(width * .5, 60, "Player 2 wins!", {
                fontFamily: 'ink-free-normal',
                fontSize: 80,
                color: '#ffd300'
            }).setOrigin(0.5, 0.5);
            this.scores[0] = this.add.text(width * .5, 293, "Player 1: " + this.playerPoints[0], {
                fontFamily: 'ink-free-normal',
                fontSize: 40,
                color: '#000000'
            }).setOrigin(0.5, 0.5);
            this.scores[1] = this.add.text(width * .5, 213, "Player 2: " + this.playerPoints[1], {
                fontFamily: 'ink-free-normal',
                fontSize: 60,
                color: '#ffffff'
            }).setOrigin(0.5, 0.5);
            defeat = this.add.image(150, 250, "Daia_Muerte2").setScale(0.3).setVisible(1);
            defeat1 = this.add.image(150, 250, "Daia_Muerte3").setScale(0.3).setVisible(0);
            victory = this.add.image(800, 250, "ibban").setScale(0.3).setVisible(1);
            victory.flipX = true;
            victory1 = this.add.image(800, 250, "IbbanVictoryPose").setScale(0.3).setVisible(0);
            victory1.flipX = true;
            this.playAnim();
        } else {
            this.add.text(width * .5, 60, "Draw!", {
                fontFamily: 'ink-free-normal',
                fontSize: 80,
                color: '#000000'
            }).setOrigin(0.5, 0.5);
            this.scores[0] = this.add.text(width * .5, 213, "Player 1: " + this.playerPoints[0], {
                fontFamily: 'ink-free-normal',
                fontSize: 50,
                color: '#000000'
            }).setOrigin(0.5, 0.5);
            this.scores[1] = this.add.text(width * .5, 293, "Player 2: " + this.playerPoints[1], {
                fontFamily: 'ink-free-normal',
                fontSize: 50,
                color: '#000000'
            }).setOrigin(0.5, 0.5);
            this.add.image(150, 250, "daia0").setScale(0.3);
            this.add.image(800, 250, "ibban").setScale(0.3).flipX = true;
        }

        this.playAgainButton.setInteractive();
        this.mainMenuButton.setInteractive();

        // this.playAgainButton.on('selected', () => {
        //     redefineArrays()
        //     this.scene.start('Coop1');
        // })
        //
        // this.mainMenuButton.on('selected', () => {
        //     this.scene.start('MenuSceneWS');
        // }) 
        this.playAgainButton.on('pointerdown', () => {
            redefineArrays()
            this.loadScene(this.playAgainSceneKey)
        })

        this.mainMenuButton.on('pointerdown', () => {
            this.loadScene(this.mainMenuKey)
            // this.scene.start('MenuSceneWS');
        })
        this.setButtonsListeners()

        // this.selectButton(0);
        // var arrowDown = this.input.keyboard.on('keydown-' + 'DOWN', () => this.selectNextButton(-1));
        //
        // var arrowUp = this.input.keyboard.on('keydown-' + 'UP', () => this.selectNextButton(-1));
        //
        // var spaceKey = this.input.keyboard.on('keydown-' + 'SPACE', () => this.confirmSelection());

    }

    playAnim() {
        var timer = new Timer(this, 500, () => {
                victory.setVisible(0);
                victory1.setVisible(1);
                defeat.setVisible(0);
                defeat1.setVisible(1);
                timer1.startTimer();
            }
        );
        var timer1 = new Timer(this, 500, () => {
                victory1.setVisible(0);
                victory.setVisible(1);
                defeat1.setVisible(0);
                defeat.setVisible(1);
                timer.startTimer();
            }
        );
        timer.startTimer();
    }

    setButtonsListeners() {
        let hoverSfx = this.sound.add("UI_hover", this.game.config.musicConfig);
        let clickSfx = this.sound.add("UI_click", this.game.config.musicConfig);
        for (let i = 0; i < this.buttons.length; i++) {
            let originalAngle = this.buttons[i].angle
            let originalScale = this.buttons[i].scale

            let onBtnOverTween = this.tweens.add({
                targets: this.buttons[i],
                paused: true,
                scale: 1,
                angle: 0,
                ease: 'Quart.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 1000,
                yoyo: true,
                repeat: -1,            // -1: infinity
            });
            let btnOverTweenShow = this.tweens.add({
                targets: this.buttons[i],
                paused: true,
                scale: 1.05,
                angle: 3,
                ease: 'Quart.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 200,
                onComplete: () => {
                    onBtnOverTween.resume()
                }
            });


            this.buttons[i].on('pointerover', () => {
                hoverSfx.play()

                btnOverTweenShow.play()

                let textureName = this.buttons[i].texture.key + 'Push';
                this.buttons[i].setTexture(textureName)
            })
            this.buttons[i].on('pointerdown', () => {
                console.log("touched")
                clickSfx.play()
            })

            this.buttons[i].on('pointerout', () => {
                onBtnOverTween.seek(0)
                btnOverTweenShow.seek(0)
                onBtnOverTween.pause()
                btnOverTweenShow.pause()
                let textureName = this.buttons[i].texture.key.replace('Push', '');
                this.buttons[i].setTexture(textureName)
                // this.buttonOver(this.buttons[i])
            })
        }
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
        //this.selectSprite.setVisible(true);
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

    loadScene(sceneKey) {
        this.removeButtonListeners()
        cameraFadeOut(this, 1000, () => {
            this.stopBackgroundMusic()
            this.scene.start(sceneKey)
        })
    }

    removeButtonListeners() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].removeAllListeners()
        }
    }

    loadBackgroundMusic(loop) {
        this.music = this.sound.add(this.backgroundMusicKey, {volume: 0.18, loop: loop});
    }

    stopBackgroundMusic() {
        this.music.stop()
    }

    playBackgroundMusic() {
        this.music.play();
    }
}