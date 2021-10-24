import {TransitionsScene} from './scenes/TransitionsScene.js'
import {CharacterTestScene} from './scenes/CharacterTestScene.js'
import {TimerTestScene} from "./scenes/TimerTestScene.js";
import {MenuScene} from "./scenes/MenuScene.js";
import {FinPartida} from "./scenes/FinPartida.js";
import  {Preloader} from "./util/Preloader.js"
import {Coop1} from "./scenes/Coop1.js";
import {Coop2} from "./scenes/Coop2.js";
import {Coop3} from "./scenes/Coop3.js";

window.onload=function (){

    const config = {
        width: 960,//Cambiar el tamaño por escena
        height: 640,
        parent: "container",
        type: Phaser.AUTO,
        backgroundColor:"#4488AA",

        //Carga de escenas
        // CharacterTestScene,TimerTestScene, TransitionsScene, CooperativeStage, Preloader,Coop1, Coop2
        scene: [Preloader, CharacterTestScene, Coop1, FinPartida, MenuScene,TimerTestScene, TransitionsScene],


        input: {
            gamepad: true
        },

        physics: {
            debug: true, 
            default: "arcade",
            arcade: {
                gravity: {
                    y: 300,
                }
            },
        },
    }

    var game = new Phaser.Game(config)
    game.config.musicConfig = {
        mute: false,
        volume: 0.1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
}

