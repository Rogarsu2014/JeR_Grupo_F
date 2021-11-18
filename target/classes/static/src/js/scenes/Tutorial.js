import {cameraFadeOut} from "../util/cameraEffects.js";
import {Timer} from "../util/Timer.js";

let tutorialImages = [];

export class Tutorial extends Phaser.Scene {


    constructor() {
        super('Tutorial');
    }

    create() {
        
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.canvas.width = 960;
        let width = this.game.canvas.width;
        let height = this.game.canvas.height;

        let dImage = this.add.image(width * .5, height * .5, 'D-press2').setScale(0, 0)
        let imageWidth = dImage.width;
        let imageHeight = dImage.height;

        // D key
        let dImage1 = this.add.image(width * .5 - imageWidth * .5 * .5, height * .5, 'startMovement').setOrigin(0, 0.5).setScale(0, .5)
        let dImage2 = this.add.image(width * .5 - imageWidth * .5 * .5, height * .5, 'dMove1').setOrigin(0, 0.5).setScale(0, .5)
        let dImage3 = this.add.image(width * .5 - imageWidth * .5 * .5, height * .5, 'dMove2').setOrigin(0, 0.5).setScale(0, .5)

        // A key
        let aImage = this.add.image(width * .5, height * .5, 'A-press2').setScale(0, 0)
        let aImage1 = this.add.image(width * .5 + imageWidth * .5 * .5, height * .5, 'startMovement').setOrigin(1, 0.5).setScale(0, .5)
        let aImage2 = this.add.image(width * .5 + imageWidth * .5 * .5, height * .5, 'aMove1').setOrigin(1, 0.5).setScale(0, .5)
        let aImage3 = this.add.image(width * .5 + imageWidth * .5 * .5, height * .5, 'aMove2').setOrigin(1, 0.5).setScale(0, .5)

        // W key
        let wImage = this.add.image(width * .5, height * .5, 'W-press2').setScale(0, 0)
        let wImage1 = this.add.image(width * .5 - imageWidth * .5 * .5, height * .5 + imageHeight * .5 * .5, 'startMovement').setOrigin(0, 1).setScale(.5, 0)
        let wImage2 = this.add.image(width * .5 - imageWidth * .5 * .5, height * .5 + imageHeight * .5 * .5, 'wJump1').setOrigin(0, 1).setScale(.5, 0)
        let wImage3 = this.add.image(width * .5 - imageWidth * .5 * .5, height * .5 + imageHeight * .5 * .5, 'wJump2').setOrigin(0, 1).setScale(.5, 0)


        // A key
        let fImage = this.add.image(width * .5, height * .5, 'F-press2').setScale(0, 0)
        let fImage1 = this.add.image(width * .5 + imageWidth * .5 * .5, height * .5, 'fPush0').setOrigin(1, 0.5).setScale(0, .5)
        let fImage2 = this.add.image(width * .5 + imageWidth * .5 * .5, height * .5, 'fPush1').setOrigin(1, 0.5).setScale(0, .5)
        let fImage3 = this.add.image(width * .5 + imageWidth * .5 * .5, height * .5, 'fPush2').setOrigin(1, 0.5).setScale(0, .5)

        let controlsImage = this.add.image(width * .5, height * .5, 'players4').setScale(0, 0)

        tutorialImages.push(() => this.showRightMovement(dImage, [dImage1, dImage2, dImage3]))
        tutorialImages.push(() => this.showLeftMovement(aImage, [aImage1, aImage2, aImage3]))
        tutorialImages.push(() => this.showUpperMovement(wImage, [wImage1, wImage2, wImage3]))
        tutorialImages.push(() => this.showLeftMovement(fImage, [fImage1, fImage2, fImage3]))
        tutorialImages.push(() => this.showControls(controlsImage))


        tutorialImages.shift()()

    }

    showControls(frame){
        this.tweens.add({
            targets: frame,
            scale: .5,
            ease:'Quart.out',
            duration: 800,
            completeDelay: 3000,
            onComplete: () => {cameraFadeOut(this, 3000,()=>this.scene.start('MenuScene'))}
        })
    }

    showRightMovement(frame, actions) {
        this.tweens.add({
            targets: frame,
            scale: .5,
            ease:'Quart.out',
            duration: 800,
            completeDelay: 500,
            onComplete: () => this.addRightMovementTween(actions)
        })
    }

    addRightMovementTween(groups) {
        this.tweens.add({
            targets: groups[0],
            scaleX: .5,
            ease: 'Expo.in',
            duration: 250,
            completeDelay: 500,
            onComplete: () => {
                groups.shift()
                if (groups.length >= 1)
                    this.addRightMovementTween(groups)
                else {
                    if (tutorialImages.length !== 0) {
                        new Timer(this,1500, ()=>tutorialImages.shift()()).startTimer()
                    }
                }
            }
        })
    }

    showLeftMovement(frame, actions) {
        this.tweens.add({
            targets: frame,
            scale: .5,
            ease:'Quart.out',
            duration: 800,
            completeDelay: 500,
            onComplete: () => this.addRightMovementTween(actions)
        })
    }

    showUpperMovement(frame, actions) {
        this.tweens.add({
            targets: frame,
            scale: .5,
            ease:'Quart.out',
            duration: 800,
            completeDelay: 500,
            onComplete: () => this.addUpperMovementTween(actions)
        })
    }

    addUpperMovementTween(groups) {
        this.tweens.add({
            targets: groups[0],
            scaleY: .5,
            ease: 'Bounce.in',
            duration: 250,
            completeDelay: 500,
            onComplete: () => {
                groups.shift()
                if (groups.length >= 1)
                    this.addUpperMovementTween(groups)
                else {
                    if (tutorialImages.length !== 0) {
                        new Timer(this,1500, ()=>tutorialImages.shift()()).startTimer()
                    }
                }
            }
        })
    }
}