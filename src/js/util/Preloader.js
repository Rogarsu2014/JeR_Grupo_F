import { Coop1 } from '../scenes/Coop1.js'

//Esta escena es para precargar assets, 
//el create tiene que ir a game, por lo que hace falta importarlo, lo tengo ahora al coop1 para testear ~ Pablo

export class Preloader extends Phaser.Scene {
    constructor(){
        super('Preloader')
    }

    preload(){
        this.load.image('tileset', '../assets/tileset.png');
        this.load.tilemapTiledJSON('Coop1Map', '../assets/Coop1.json');

        //botones de los jugadores
        this.load.image('botonR','../assets/Boton1.png');
        this.load.image('botonL','../assets/Boton2.png');
        this.load.image('horizontalSpawn','../assets/blocker6.png');
        this.load.image('horizontal','../assets/blocker2.png');
        this.load.image('1x1','../assets/blocker1.png');
        this.load.image('door','../assets/Door.png');
    }
    create(){
        console.log("Preload hecho");
        this.scene.start('Coop1');
    }

}