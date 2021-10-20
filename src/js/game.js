import {SampleScene} from './scenes/SampleScene.js'
import {TransitionsScene} from './scenes/TransitionsScene.js'
import {CharacterTestScene} from './scenes/CharacterTestScene.js'
import {TimerTestScene} from "./scenes/TimerTestScene.js";
import {CooperativeStage} from "./scenes/CooperativeStage.js";
import {MenuScene} from "./scenes/MenuScene.js";

import  {Preloader} from "./util/Preloader.js"
import {Coop1} from "./scenes/Coop1.js";

window.onload=function (){

    const config = {
        width: 960,//Cambiar el tamaño por escena
        height: 640,
        parent: "container",
        type: Phaser.AUTO,
        backgroundColor:"#4488AA",

      //Carga de escenas
        // CharacterTestScene,TimerTestScene, TransitionsScene, CooperativeStage
        //scene: [Preloader,Coop1],

        scene: [MenuScene,CharacterTestScene,TimerTestScene, TransitionsScene, CooperativeStage],

        //main,      //Esto estaba antes descomentado sin coma
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

