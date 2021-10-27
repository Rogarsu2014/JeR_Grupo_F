export class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial');
    }

    create(){
        this.game.canvas.width = 960;
        let width = this.game.canvas.width;
        let height =this.game.canvas.height;

        let image= this.add.image(width*.5, height*.5,'leftMovementKeyboard').setScale(0,0)
        let imageWidth =image.width;
        let image1= this.add.image(width*.5 - imageWidth*.5*.5, height*.5,'leftMovement1').setOrigin(0,0.5).setScale(0,.5)
        let image2= this.add.image(width*.5 - imageWidth*.5*.5, height*.5,'leftMovement1').setOrigin(0,0.5).setScale(0,.5)

        this.showRightMovement(image,[image1,image2])
    }

    showRightMovement(frame, actions){
        this.tweens.add({
            targets:frame,
            scale:.5,
            duration:1000,
            completeDelay:500,
            onComplete:()=>this.addRightMovementTween(actions)
        })
    }

    addRightMovementTween(groups){
        this.tweens.add({
            targets:groups[0],
            scaleX:.5,
            duration:1000,
            completeDelay:500,
            onComplete: ()=>{
                groups.shift()
                if(groups.length>=1)
                    this.addRightMovementTween(groups)
            }
        })
    }
}