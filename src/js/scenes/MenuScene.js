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

    preload () {
       
        this.load.image('sky', './Resources/assets/sky.png');
        this.load.image('star', './Resources/assets/star.png');
    
        this.load.image('play_button', './Resources/assets/play_button.png');
        this.load.image('options_button', './Resources/assets/options_button.png');
    }    

    create(){
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            playButton.off('selected')
            optionsButton.off('selected')
        })
        this.add.image(0, 0, 'sky').setOrigin(0).setDepth(0).setScale(2);
        this.selectSprite = this.add.image(this.game.renderer.width / 2 - 100, this.game.renderer.height / 2 - 100,'star')
        this.selectSprite.setVisible(false);
        this.selectSprite.setScale(2); 

        this.add.text(this.game.renderer.width / 3, this.game.renderer.height * 0.1, 'Dual Interest', { fontSize: '40px', fill: '#000' }).setDepth(1);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play_button').setDepth(1);
        let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'options_button').setDepth(1);
        this.buttons.push(playButton);
        this.buttons.push(optionsButton);

        playButton.setInteractive();
        playButton.on("pointerover",() => { 
            this.selectSprite.setVisible(true)
            this.selectSprite.setPosition(this.game.renderer.width / 2 - 100, this.game.renderer.height / 2)
            console.log("Boton para Jugar")
        })

        playButton.on("pointerout",() => { 
            this.selectSprite.setVisible(false);
            console.log("Boton para Jugar Raton Fuera")})

        optionsButton.setInteractive();
        optionsButton.on("pointerover",() => { 
            this.selectSprite.setVisible(true)
            this.selectSprite.setPosition(this.game.renderer.width / 2 - 100, this.game.renderer.height / 2 + 100)
            console.log("Boton de Opciones")})
            
        optionsButton.on("pointerout",() => { 
            this.selectSprite.setVisible(false)
            console.log("Boton de Opciones Raton Fuera")})

        playButton.on('pointerdown', (pointer) => { 
            if (pointer.leftButtonDown()) {
                this.scene.start('CharacterTestScene'); 
            } 
        });
        optionsButton.on('pointerdown', (pointer) => { 
            if (pointer.leftButtonDown()) {
                console.log("opciones");
            } 
        });
        playButton.on('selected', () => {
            this.scene.start('CharacterTestScene');
        })
    
        optionsButton.on('selected', () => {
            console.log('opciones')
        })

       this.selectButton(0);
    }

    selectButton(index) {
        const button = this.buttons[index];
        this.selectSprite.x = button.x - button.displayWidth * 0.71
	    this.selectSprite.y = button.y - 2.7
        this.selectedButtonIndex = index;
        this.selectSprite.setVisible(true);
	}

	selectNextButton(change = 1) {
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
        button.emit('selected');
    }
	
    
    update(e) {  
		
		if (this.cursors.up.isDown) {
            this.selectNextButton(-1)
		} else if (this.cursors.down.isDown) {
            this.selectNextButton(1)
		} else if (this.cursors.space.isDown) {
			this.confirmSelection()
		}
    }

}