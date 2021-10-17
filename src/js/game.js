import {SampleScene} from './scenes/SampleScene.js'
import {TransitionsScene} from './scenes/TransitionsScene.js'
import {CharacterTestScene} from './scenes/CharacterTestScene.js'
import {TimerTestScene} from "./scenes/TimerTestScene.js";
import {CooperativeStage} from "./scenes/CooperativeStage.js";
window.onload=function (){

    const config = {
        width: 800,//Cambiar el tamaño por escena
        height: 500,
        parent: "container",
        type: Phaser.AUTO,
        backgroundColor:"#4488AA",


        scene: [CharacterTestScene,TimerTestScene, TransitionsScene, CooperativeStage],

        main
        input: {
            gamepad: true
        },

        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 300,
                    debug: true
                }
            }
        }

    }


    var game = new Phaser.Game(config)
}

