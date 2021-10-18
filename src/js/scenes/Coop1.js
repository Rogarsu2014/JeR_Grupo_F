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

        let but1;
        let but2;
        let but3;
        let but4;

        let door;



        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(384,384,'1x1').setOrigin(0,0);
        this.platforms.create(192,256,'horizontal').setOrigin(0,0);

        console.log("Escena 1 creada");
    }

    //hay que hacer funcion que al pulasr botones generen esto:
    
    /*plat1 =  this.physics.add.staticGroup();
    plat1.create(640,128,'horizontalSpawn').setOrigin(0,0);

    plat2 =  this.physics.add.staticGroup();
    plat2.create(512,448,'horizontalSpawn').setOrigin(0,0);*/

    //y destruyan tanto los botones como los bloques
}