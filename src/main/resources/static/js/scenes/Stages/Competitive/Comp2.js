
import {Platform} from "../../../objects/Platform.js";

import {CompetitiveScene} from "./Base/CompetitiveScene.js";




export class Comp2 extends CompetitiveScene{

    constructor() {
        super("Comp2","Coop3",30000,'Comp2Map',960);
    }




    create(data){

        super.create(data)

        this.platforms=[]
        var platform1= new Platform(this, 64 * 3, 64*5, 'platS', 0, 0)
        this.platforms.push(platform1)
        var platform2= new Platform(this, 64 * 2, 64*6, 'platS', 0, 0)
        this.platforms.push(platform2)
        var platform3= new Platform(this, 64 * 2, 64*8, 'platS', 0, 0)
        this.platforms.push(platform3)
        var platform4= new Platform(this, 64 * 4, 64*7, 'platS', 0, 0)
        this.platforms.push(platform4)
        var platform5= new Platform(this, 64 * 11, 64*5, 'platS', 0, 0)
        this.platforms.push(platform5)
        var platform6= new Platform(this, 64 * 10, 64*6, 'platS', 0, 0)
        this.platforms.push(platform6)
        var platform7= new Platform(this, 64 * 10, 64*8, 'platS', 0, 0)
        this.platforms.push(platform7)
        var platform8= new Platform(this, 64 * 12, 64*7, 'platS', 0, 0)
        this.platforms.push(platform8)
        var platform9= new Platform(this, 64 * 0, 64*2, 'platS', 0, 0)
        this.platforms.push(platform9)
        var platform10= new Platform(this, 64 * 14, 64*2, 'platS', 0, 0)
        this.platforms.push(platform10)
        var platform11= new Platform(this, 64 * 1, 64*3, 'platM', 0, 0)
        this.platforms.push(platform11)
        var platform12= new Platform(this, 64 * 12, 64*3, 'platM', 0, 0)
        this.platforms.push(platform12)
        var platform13= new Platform(this, 64 * 6.5, 64*4, 'platM', 0, 0)
        this.platforms.push(platform13)
        var platform14= new Platform(this, 64 * 4, 64*2, 'platS', 0, 0)
        this.platforms.push(platform14)
        var platform15= new Platform(this, 64 * 5, 64*3, 'platS', 0, 0)
        this.platforms.push(platform15)
        var platform16= new Platform(this, 64 * 10, 64*2, 'platS', 0, 0)
        this.platforms.push(platform16)
        var platform17= new Platform(this, 64 * 9, 64*3, 'platS', 0, 0)
        this.platforms.push(platform17)
        var platform18= new Platform(this, 64 * 5, 64*1, 'platM', 0, 0)
        this.platforms.push(platform18)
        var platform19= new Platform(this, 64 * 8, 64*1, 'platM', 0, 0)
        this.platforms.push(platform19)
        //const platformsTile = map.createStaticLayer('Platform', platf);
        this.setPlatformsColliders();

        //Creación de todas las skulls


        //************** Initial transition



    }
    setPlatformsColliders(){

        for (let i = 0; i < this.platforms.length; i++) {
            this.physics.add.collider(this.players[0],  this.platforms[i])
            this.physics.add.collider(this.players[1],  this.platforms[i])
        }
    }

    definePlayersPosition() {
        this.setPlayerPosition(0, 30, 300)
        this.setPlayerPosition(1, this.game.canvas.width - 30, 300)
    }

    defineSkulls(){



        this.addSkull(30, 50);
        this.addSkull( 30, 165);
        this.addSkull( 95, 415);
        this.addSkull( 290, 325);

        this.addSkull( 345, 30 );
        this.addSkull( 500, 225);
        this.addSkull( 620, 30);

        this.addSkull(610, 415 );
        this.addSkull(800, 325);
        this.addSkull( 930, 16);
        this.addSkull( 930, 50);
    }


}