import { Coop1 } from '../scenes/Coop1.js'
import { Coop2 } from '../scenes/Coop2.js'
import { Coop3 } from '../scenes/Coop3.js'
import { Comp1 } from '../scenes/Comp1.js'
import {loadFont} from "./FontLoader.js";



//Esta escena es para precargar assets, 
//el create tiene que ir a game, por lo que hace falta importarlo, lo tengo ahora al coop1 para testear ~ Pablo

export class Preloader extends Phaser.Scene {
    constructor(){
        super('Preloader')
    }

    preload(){

        loadFont('ink-free-normal','/Resources/Typography/ink-free-normal.ttf')
        // transitions
        this.load.image("BlackBackground", "./Resources/assets/background/BlackPixel.png")

        this.load.image('tileset', '../Resources/assets/level/tileset.png');

        this.load.image('plat', '../Resources/assets/level/escalon.png');

        // buttons main menu
        this.load.image('Credits','../Resources/assets/UI/Buttons/Credits.png');
        this.load.image('CreditsPush','../Resources/assets/UI/Buttons/CreditsPush.png');
        this.load.image('LocalGame','../Resources/assets/UI/Buttons/LocalGame.png');
        this.load.image('LocalGamePush','../Resources/assets/UI/Buttons/LocalGamePush.png');
        this.load.image('PlayAgain','../Resources/assets/UI/Buttons/PlayAgain.png');
        this.load.image('PlayAgainPush','../Resources/assets/UI/Buttons/PlayAgainPush.png');
        this.load.image('ReturnToMenu','../Resources/assets/UI/Buttons/ReturnToMenu.png');
        this.load.image('ReturnToMenuPush','../Resources/assets/UI/Buttons/ReturnToMenuPush.png');

        this.load.image('sky', './Resources/assets/sky.png');

        //botones de los jugadores
        this.load.image('botonR','../Resources/assets/level/Boton1.png');
        this.load.image('botonRP','../Resources/assets/level/Boton1Puls.png');
        this.load.image('botonL','../Resources/assets/level/Boton2.png');
        this.load.image('botonLP','../Resources/assets/level/Boton2Puls.png');
        //plataformas móviles
        this.load.image('1x1','../Resources/assets/level/blocker1 1x1.png');
        this.load.image('horizontal2x1','../Resources/assets/level/blocker2 2x1.png');
        this.load.image('horizontal3x1','../Resources/assets/level/blocker3 3x1.png');
        this.load.image('horizontal4x1','../Resources/assets/level/blocker6 4x1.png');
        this.load.image('vertical1x1-5','../Resources/assets/level/blocker7 1x1-5.png');
        this.load.image('vertical1x4-5','../Resources/assets/level/blocker8 1x4-5.png');
        this.load.image('door','../Resources/assets/level/Door.png');
        //platagormas estáticas
        this.load.image('platS','../Resources/assets/level/escalonplano.png');
        this.load.image('platM','../Resources/assets/level/escalonplano2.png');
        this.load.image('platL','../Resources/assets/level/escalonplano3.png');

        //Prueba
        this.load.tilemapTiledJSON('Coop1Map', '../Resources/assets/level/Coop1.json');
        this.load.tilemapTiledJSON('Coop2Map', '../Resources/assets/level/Coop2.json');
        this.load.tilemapTiledJSON('Coop3Map', '../Resources/assets/level/Coop3.json');
        this.load.tilemapTiledJSON('Comp1Map', '../Resources/assets/level/comp1v2.json');
        this.load.tilemapTiledJSON('Comp2Map', '../Resources/assets/level/comp2v2.json');
        this.load.tilemapTiledJSON('Comp3Map', '../Resources/assets/level/Comp3.json');
        this.load.spritesheet("dude","./Resources/assets/items/SPRITE_SHIIIIIITTT.png", { frameWidth: 706, frameHeight: 672 });
        this.load.spritesheet("dude2","./Resources/assets/items/spriteshit2.png", { frameWidth: 731, frameHeight: 526 });
        this.load.spritesheet("skull","./Resources/assets/items/SpriteSkulls.png", { frameWidth: 522, frameHeight: 518 });
        //this.load.image("skull", "./Resources/assets/items/skull.png");//Current sprites from tutorial
        this.load.audio("points+", "./Resources/assets/sounds/points.mp3");//https://www.youtube.com/watch?v=SoeT6x0O-CM
        this.load.audio("hit", "./Resources/assets/sounds/hit.mp3");//https://www.youtube.com/watch?v=dLED_gBGQsk
        this.load.image("trap", "./Resources/assets/items/itsatrap.png");

        //Cargar cosas Menu
        this.load.image('sky', './Resources/assets/sky.png');
        this.load.image('star', './Resources/assets/star.png');
        this.load.image('play_button', './Resources/assets/play_button.png');
        this.load.image('options_button', './Resources/assets/options_button.png');
        this.load.image("daia0", "./Resources/assets/items/Daia0.png");//Current sprites from tutorial
        this.load.image("ibban", "./Resources/assets/items/Ibban.png");//Current sprites from tutorial

    }
    create(){
        console.log("Preload hecho");
        this.scene.start('Comp3');

    }

}