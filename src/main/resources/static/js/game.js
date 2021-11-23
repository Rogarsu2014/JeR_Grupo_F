
import {CharacterTestScene} from './scenes/CharacterTestScene.js'
import {MenuScene} from "./scenes/MenuScene.js";
import {GameCompletedScene} from "./scenes/GameCompletedScene.js";
import  {Preloader} from "./util/Preloader.js"
import {JoinScreen} from "./scenes/JoinScreen.js";
import {Coop1} from "./scenes/Stages/Cooperative/Coop1.js";
import {Coop2} from "./scenes/Stages/Cooperative/Coop2.js";
import {Coop3} from "./scenes/Stages/Cooperative/Coop3.js";
import {Comp1} from "./scenes/Stages/Competitive/Comp1.js";
import {Comp2} from "./scenes/Stages/Competitive/Comp2.js";
import {Comp3} from "./scenes/Stages/Competitive/Comp3.js";
import {Credits} from "./scenes/Credits.js";
import {Tutorial} from "./scenes/Tutorial.js";
import {MenuSceneSpringTest} from "./scenes/MenuSceneSpringTest.js";


window.onload=function (){

    const config = {
        width: 1408,//960,//Cambiar el tamaño por escena
        height: 640,//448,//640,
        parent: "container",
        //autoCenter:Phaser.Scale.CENTER_BOTH,
        type: Phaser.AUTO,
        backgroundColor:"#000000",

        //Carga de escenas
        // CharacterTestScene,TimerTestScene, TransitionsScene, CooperativeStage, Preloader,Coop1, Coop2

        scene: [Preloader,MenuSceneSpringTest,JoinScreen,CharacterTestScene, Coop1,Coop2,Coop3, GameCompletedScene, MenuScene, Comp1, Comp2, Comp3, Credits,Tutorial],


        input: {
            gamepad: true
        },

        physics: { 
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

