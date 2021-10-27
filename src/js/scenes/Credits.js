export class Credits extends Phaser.Scene{

    constructor() {
        super('Credits');
    }
    init(){

    }
    create(){
        this.game.canvas.width = 960;

        let width =this.game.canvas.width;
        let height=this.game.canvas.height;

        let creditsImage= this.add.image(width*.5,0,'gameTittle').setOrigin(.5,1);
        let creditsHeight=creditsImage.height;

        let creditsTween=this.tweens.add({
            targets:creditsImage,
            y:height+creditsHeight,
            ease: 'Linear',
            onComplete:()=>this.scene.start('MenuScene'),
            duration: 1000
        })
    }
}