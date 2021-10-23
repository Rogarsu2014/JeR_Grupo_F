import { Coop1 } from '../scenes/Coop1.js'
import { Coop2 } from '../scenes/Coop2.js'
import { Coop3 } from '../scenes/Coop3.js'

//Esta escena es para precargar assets, 
//el create tiene que ir a game, por lo que hace falta importarlo, lo tengo ahora al coop1 para testear ~ Pablo

export class Preloader extends Phaser.Scene {
    constructor(){
        super('Preloader')
    }

    preload(){
        this.load.image('tileset', '../Resources/assets/level/tileset.png');

        //botones de los jugadores
        
        this.load.image('botonR','../Resources/assets/level/Boton1.png');
        this.load.image('botonL','../Resources/assets/level/Boton2.png');
        this.load.image('1x1','../Resources/assets/level/blocker1 1x1.png');
        this.load.image('horizontal','../Resources/assets/level/blocker2 2x1.png');
        this.load.image('horizonta3x1','../Resources/assets/level/blocker3 3x1.png');
        this.load.image('horizontalSpawn','../Resources/assets/level/blocker6 4x1.png');
        this.load.image('vertical1-5','../Resources/assets/level/blocker7 1x1-5.png');
        this.load.image('vertical4-5','../Resources/assets/level/blocker8 1x4-5.png');
        this.load.image('door','../Resources/assets/level/Door.png');
    }
    create(){
        console.log("Preload hecho");
        this.scene.start('Coop3');
    }

}