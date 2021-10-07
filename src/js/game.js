import {SampleScene} from './scenes/SampleScene.js'
import {TransitionsScene} from './scenes/TransitionsScene.js'
window.onload=function (){

    const config = {
        width: 320,
        height: 180,
        parent: "container",
        type: Phaser.AUTO,
        backgroundColor:"#4488AA",

        scene: [TransitionsScene],
        input: {
            gamepad: true
        },

        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 500
                }
            }
        }

    }


    var game = new Phaser.Game(config)
}

