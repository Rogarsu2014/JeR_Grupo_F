import {SweepVerticalTransitionIn} from "../util/cameraEffects.js";

const doorSpriteKey='door'
const doorOpenedSpriteKey='doorOpened'
const doorOpenedSfx= 'doorOpenedSfx'
export class Door extends Phaser.Physics.Arcade.Sprite {

    constructor(context, x, y, timer, flipped=false) {
        super(context, x, y, doorSpriteKey);
        this.context = context;
        this.setOrigin(0, 0)
        this.enabled = false;
        this.playersEnteredCount = 0;
        if(flipped)
            this.flipX=flipped
        this.context.add.existing(this, true);
        this.sfx = this.context.sound.add("doorOpenedSfx",{volume: 1});
        this.timer=timer;

    }

    open() {
        this.enabled = true;
        this.setTexture(doorOpenedSpriteKey)
        this.context.physics.add.existing(this, true);
        let width = this.width
        let height = this.height
        this.body.setSize(width * .5, height, false)
        this.sfx.play()
    }

    playerEntered(player) {

        player.disableBody(true, true)
        if (++this.playersEnteredCount == 2) {
            this.context.stageCompleted()
        }
    }
}