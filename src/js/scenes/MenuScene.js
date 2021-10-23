
export class MenuScene extends Phaser.Scene{

    constructor() {
        super("MenuScene");
    }
  
    preload ()
    {
        this.load.image('sky', './Resources/assets/sky.png');
        this.load.image('star', './Resources/assets/star.png');
    
        this.load.image('play_button', './Resources/assets/play_button.png');
        this.load.image('options_button', './Resources/assets/options_button.png');
    }    

    create(){
        var ancho = this.game.renderer.width;
        var alto = this.game.renderer.height;
        
        console.log("Main menu scene test")
        var tittle;
        this.add.image(0, 0, 'sky').setOrigin(0).setDepth(0);

        let selectSprite = this.add.image(ancho / 2 - 100, alto / 2 - 100,'star');
        selectSprite.setVisible(false)
        selectSprite.setScale(1); 

        tittle = this.add.text(ancho / 3, alto * 0.1, 'Dual Interest', { fontSize: '40px', fill: '#000' }).setDepth(1);
        let playButton = this.add.image(ancho / 2, alto / 2, 'play_button').setDepth(1);
        let optionsButton = this.add.image(ancho / 2, alto / 2 + 100, 'options_button').setDepth(1);

        playButton.setInteractive();
        playButton.on("pointerover",()=>{ 
            selectSprite.setVisible(true)
            selectSprite.setPosition(ancho / 2 - 100, alto / 2)
            console.log("Boton para Jugar")})

        playButton.on("pointerout",()=>{ 
            selectSprite.setVisible(false);
            console.log("Boton para Jugar - 1")})

        optionsButton.setInteractive();
        optionsButton.on("pointerover",()=>{ 
            selectSprite.setVisible(true)
            selectSprite.setPosition(ancho / 2 - 100, alto / 2 + 100)
            console.log("Boton de Opciones")})
            
        optionsButton.on("pointerout",()=>{ 
            selectSprite.setVisible(false)
            console.log("Boton de Opciones")})
 
    }

}

