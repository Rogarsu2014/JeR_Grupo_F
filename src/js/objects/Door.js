import {SweepVerticalTransitionIn} from "../util/cameraEffects.js";

export class Door extends Phaser.Physics.Arcade.Sprite {

    constructor(context, x, y, spriteKey, timer) {
        super(context, x, y, spriteKey);
        this.context = context;
        this.setOrigin(0, 0)
        this.enabled = false;
        this.playersEnteredCount = 0;
        this.transition = new SweepVerticalTransitionIn(this.context)
        this.transition.addToScene();
        this.context.add.existing(this, true);
        this.timer=timer;

    }

    open() {
        this.enabled = true;
        this.context.physics.add.existing(this, true);
        let width = this.width
        let height = this.height
        this.body.setSize(width * .5, height, false)
    }

    playerEntered(player) {

        player.disableBody(true, true)
        if (++this.playersEnteredCount == 2) {
            //load next level
            console.log("Load next level")
            this.timer.pauseTimer()
            this.transition.playTransition(() => {
                console.log("tween completed")
                this.context.startNextLevel()

            },1000)
            // this.context.scene.start("CharacterTestScene",null)
        }
    }
}