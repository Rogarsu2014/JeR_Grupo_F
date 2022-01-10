import {cameraFadeOut} from "../util/cameraEffects.js";

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

        let creditsImage= this.add.image(width*.5,height,'creditsImage').setOrigin(.5,0);
        let creditsHeight=creditsImage.height;
        let  thanksForPlayingText = this.add.text(width*.5,height*.5,'Thank you for playing!',{fontFamily: 'ink-free-normal',fontSize:50}).setOrigin(0.5,0.5)
        thanksForPlayingText.setScale(0)

        let thanksText=this.tweens.add({
            targets:thanksForPlayingText,
            scale:1,
            ease: 'Quart.In',
            completeDelay:1500,
            onComplete:()=> {
                cameraFadeOut(this,3000,()=>this.scene.start('MenuSceneWS'))
            },
            duration: 500,
            paused:true
        })
        this.tweens.add({
            targets:creditsImage,
            y:0-creditsHeight,
            ease: 'Linear',
            onComplete:()=> {
                thanksText.play()
            },
            duration: 10000
        })

    }
}