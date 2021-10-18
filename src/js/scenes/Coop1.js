export class Coop1 extends Phaser.Scene{

    constructor() {
        super("Coop1");
    }

    preload(){    }

    create(){
        const map = this.make.tilemap({ key: 'Coop1Map'});
        const tileset = map.addTilesetImage('Tileset', 'tileset');

        map.createStaticLayer('Background', tileset);
        const floor = map.createStaticLayer('Level', tileset);

        floor.setCollisionByProperty({ collides: true });

        //Testeo
        /*const debugGraphics = this.add.graphics().setAlpha(0.7);
        floor.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243,234, 48, 255),
                faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })*/ 

        let plat1;
        let plat2;
        let door;



        this.platform1 = this.physics.add.staticGroup();
        this.platform1.create(384,384,'1x1').setOrigin(0,0);
        
        this.platform2 = this.physics.add.staticGroup();
        this.platform2.create(192,256,'horizontal').setOrigin(0,0);

        //Aadir colisiones con los botones, lo que va debajo es lo que genera cada boton
        let butIniAbajo = this.add.image(800,384,'botonR').setOrigin(0,0);
            
            //Se pulsa el boton rojo 1
        //    butIniAbajo.setVisible(false);
        //    let butArriba = this.add.image(480,64,'botonL').setOrigin(0,0);
        //    plat1 =  this.physics.add.staticGroup();
        //    plat1.create(640,128,'horizontalSpawn').setOrigin(0,0);
        
            //Se pulsa el boton 2
        //    butArriba.setVisible(false);
        //    let butAbajo2 = this.add.image(448,384,'botonR').setOrigin(0,0);
        //    plat2 =  this.physics.add.staticGroup();
        //    plat2.create(512,448,'horizontalSpawn').setOrigin(0,0);
        
            //Se pulsa el boton 3
        //    butAbajo2.setVisible(false);
        //    let butAbajo3 = this.add.image(320,512,'botonL').setOrigin(0,0);
        //    this.platform2.setVisible(false);

                //Fin nivel
        //    butAbajo3.setVisible(false);
        //    this.door = this.add.image(0,448,'door').setOrigin(0,0);
        //    this.platform1.setVisible(false);
        
        console.log("Escena 1 creada");
    }

    //hay que hacer funcion que al pulasr botones generen esto:
    
    

    /*plat2 =  this.physics.add.staticGroup();
    plat2.create(512,448,'horizontalSpawn').setOrigin(0,0);*/

    //y destruyan tanto los botones como los bloques
}