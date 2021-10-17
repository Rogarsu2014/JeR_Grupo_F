
export class MenuScene extends Phaser.Scene{

    constructor() {
        super("MenuScene");
    }
    
    create(){
        console.log("Main menu scene test")
    }
    preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('play_button', 'assets/play_button.png');
    }
}

