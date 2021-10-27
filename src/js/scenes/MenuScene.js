import {cameraFadeIn, cameraFadeOut} from "../util/cameraEffects.js";
import {Skull} from "../objects/Skull.js";

var music;
const backgroundMusicKey= 'mainMenuMusic';
export class MenuScene extends Phaser.Scene{
    constructor() {
        super("MenuScene");
    }
    init() {
        this.buttons = Phaser.GameObjects.Image = []
        this.selectedButtonIndex = 0
        this.cursors = this.input.keyboard.createCursorKeys();
        this.selectSprite = null
        
    }


    create(){

        this.loadBackgroundMusic()
        this.playBackgroundMusic()

        this.game.canvas.width=960
        this.physics.world.setBounds(0,0,this.game.canvas.width, this.game.canvas.height)
        let width=this.game.canvas.width;
        let height=this.game.canvas.height;
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            playButton.off('selected')
            tutorial.off('selected');
            credits.off('selected');
        })
        this.add.image(0, 0, 'menuImage').setOrigin(0).setDepth(0).setScale(1);

        this.add.image(this.game.canvas.width*.5, 10, 'gameTittle').setOrigin(0.5,0).setDepth(10).setScale(.25);

        this.selectSprite = new Skull(this, width / 2 - 100, height / 2 - 100, "skull",6)
        this.selectSprite.setVisible(false);
        this.selectSprite.setScale(.1);

        // this.add.text(width / 3,height * 0.1, 'Dual Interest', { fontSize: '40px', fill: '#000' }).setDepth(1);
        let playButton = this.add.image(width / 2,height / 2-25, 'LocalGame').setDepth(1).setScale(.8);
        let onlineGame = this.add.image(width / 2,height / 2 + 50, 'OnlineGame').setDepth(1).setScale(.8);
        let tutorial = this.add.image(width / 2,height / 2 + 125, 'Tutorial').setDepth(1).setScale(.8);
        let options = this.add.image(width / 2,height / 2 + 200, 'Options').setDepth(1).setScale(.8);
        let credits = this.add.image(width / 2,height / 2 + 275, 'Credits').setDepth(1).setScale(.8);


        // *fase2* settings
        options.alpha=0.4;
        onlineGame.alpha=0.4;
        this.buttons.push(playButton);
        this.buttons.push(tutorial);
        this.buttons.push(credits);

        playButton.setInteractive();
        tutorial.setInteractive();
        credits.setInteractive();

        playButton.on('selected', () => {
            this.stopBackgroundMusic()
            this.scene.start('Coop1');
        })
        tutorial.on('selected', () => {

        })
        credits.on('selected', () => {
            this.stopBackgroundMusic();
            this.scene.start('Credits')
        })


       this.selectButton(0);

        var arrowDown=this.input.keyboard.on('keydown-' + 'DOWN', ()=>this.selectNextButton(1));

        var arrowUp=this.input.keyboard.on('keydown-' + 'UP', ()=>this.selectNextButton(-1));

        var spaceKey =this.input.keyboard.on('keydown-' + 'SPACE',()=>this.confirmSelection());



    }

    selectButton(index) {
        const button = this.buttons[index];
        this.tweens.add({
            targets: button,
            scaleX: 1.25,
            ease: 'Quart.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 100,
            yoyo: true,
            repeat: 0,            // -1: infinity
        });

        let textureName=button.texture.key + 'Push';
        button.setTexture(textureName)
        this.selectSprite.x = button.x - button.displayWidth * 0.71
	    this.selectSprite.y = button.y - 2.7;

        this.tweens.add({
            targets: this.selectSprite,
            scaleY: .08,
            ease: 'Expo.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 60,
            yoyo: true,
            repeat: 0,            // -1: infinity
        });

        this.selectedButtonIndex = index;
        this.selectSprite.setVisible(true);
	}

	selectNextButton(change = 1) {
        const button = this.buttons[this.selectedButtonIndex];
        let textureName=button.texture.key.replace('Push','');
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
        cameraFadeOut(this,1000,()=> button.emit('selected'))
        this.input.keyboard.removeListener('keydown-' + 'DOWN');

        this.input.keyboard.removeListener('keydown-' + 'UP');

        this.input.keyboard.removeListener('keydown-' + 'SPACE');
        // button.emit('selected');
    }

    playBackgroundMusic(){
        music.play();
    }
    loadBackgroundMusic(){
        music = this.sound.add(backgroundMusicKey,{volume:0.18});
    }
    stopBackgroundMusic(){
        music.stop()
    }

}