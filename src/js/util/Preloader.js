import { Coop1 } from '../scenes/Coop1.js'
import { Coop2 } from '../scenes/Coop2.js'
import { Coop3 } from '../scenes/Coop3.js'
import { Comp1 } from '../scenes/Comp1.js'



//Esta escena es para precargar assets, 
//el create tiene que ir a game, por lo que hace falta importarlo, lo tengo ahora al coop1 para testear ~ Pablo

export class Preloader extends Phaser.Scene {
    constructor(){
        super('Preloader')
    }

    preload(){
        this.load.image('tileset', '../Resources/assets/level/tileset.png');
        this.load.image('tileset2', '../Resources/assets/level/tileset2.png');
        this.load.image('tileset3', '../Resources/assets/level/tileset3.png');
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

        //Prueba
        this.load.tilemapTiledJSON('Coop1Map', '../Resources/assets/level/Coop1.json');
        this.load.spritesheet("dude","./Resources/assets/items/dude.png", { frameWidth: 32, frameHeight: 48 });//Current sprites from tutorial
        this.load.image("calavera", "./Resources/assets/items/skull.png");//Current sprites from tutorial
        this.load.audio("puntos+", "./Resources/assets/sounds/points.mp3");//https://www.youtube.com/watch?v=SoeT6x0O-CM
        this.load.audio("dano", "./Resources/assets/sounds/hit.mp3");//https://www.youtube.com/watch?v=dLED_gBGQsk
        this.load.image("trampa", "./Resources/assets/items/itsatrap.png");

    }
    create(){
        console.log("Preload hecho");
      
        this.scene.start('CharacterTestScene');

    }

}