import {cameraFadeIn, cameraFadeOut} from "../util/cameraEffects.js";

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
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            playButton.off('selected')
            optionsButton.off('selected')
        })
        this.add.image(0, 0, 'sky').setOrigin(0).setDepth(0).setScale(2);
        this.selectSprite = this.add.image(this.game.renderer.width / 2 - 100, this.game.renderer.height / 2 - 100,'skull')
        this.selectSprite.setVisible(false);
        this.selectSprite.setScale(.2);

        this.add.text(this.game.renderer.width / 3, this.game.renderer.height * 0.1, 'Dual Interest', { fontSize: '40px', fill: '#000' }).setDepth(1);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'LocalGame').setDepth(1);
        let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'Credits').setDepth(1);
        this.buttons.push(playButton);
        this.buttons.push(optionsButton);

        playButton.setInteractive();

        optionsButton.setInteractive();

        playButton.on('selected', () => {
            this.scene.start('Coop1');
        })
    
        optionsButton.on('selected', () => {
            console.log('opciones')
        })

       this.selectButton(0);

        var arrowDown=this.input.keyboard.on('keydown-' + 'DOWN', ()=>this.selectNextButton(-1));

        var arrowUp=this.input.keyboard.on('keydown-' + 'UP', ()=>this.selectNextButton(-1));

        var spaceKey =this.input.keyboard.on('keydown-' + 'SPACE',()=>this.confirmSelection());



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

        let textureName=button.texture.key + 'Push';
        button.setTexture(textureName)
        this.selectSprite.x = button.x - button.displayWidth * 0.71
	    this.selectSprite.y = button.y - 2.7
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
	
    
    update() {  
		// if (this.cursors.up.isDown) {
        //     this.selectNextButton(-1)
		// } else if (this.cursors.down.isDown) {
        //     this.selectNextButton(1)
		// } else if (this.cursors.space.isDown) {
		// 	this.confirmSelection()
		// }
    }

}