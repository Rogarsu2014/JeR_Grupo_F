"use strict";
import {cameraFadeIn, cameraFadeOut, cameraShake, SweepVerticalTransitionIn} from '../util/cameraEffects.js'
export class TransitionsScene extends Phaser.Scene{

    constructor() {
        super("TimerScene");
    }
    init(){
        this.transition= new SweepVerticalTransitionIn(this);
    }
    preload(){
        this.transition.loadTransition(this);
        this.load.image("treasure","./Resources/assets/items/treasure.png")
    }
    create(){
        this.transition.addToScene(this);
        let treasure = this.add.sprite(100,100,"treasure");

        // treasure.displayWidth=1000

        console.log(this.game.config.width)
        // cameraFadeOut(this,1000,()=>cameraFadeIn(this,1000))
        console.log("Transition Scene created")
        this.transition.playTransition(this)
    }

    update(){
    }
}


