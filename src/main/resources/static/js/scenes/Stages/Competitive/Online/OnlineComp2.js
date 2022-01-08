
import {Platform} from "../../../../objects/Platform.js";

import {OnlineCompetitiveScene} from "../Base/OnlineCompetitiveScene.js";




export class OnlineComp2 extends OnlineCompetitiveScene{

    constructor() {
        super("OnlineComp2","OnlineCoop3",30000,'Comp2Map',1408);
    }




    create(data){

        super.create(data)

        this.platforms=[]
        var platform1= new Platform(this, 64 * 3 + 224, 64*5, 'platS', 0, 0)
        this.platforms.push(platform1)
        var platform2= new Platform(this, 64 * 2 + 224, 64*6, 'platS', 0, 0)
        this.platforms.push(platform2)
        var platform3= new Platform(this, 64 * 2 + 224, 64*8, 'platS', 0, 0)
        this.platforms.push(platform3)
        var platform4= new Platform(this, 64 * 4 + 224, 64*7, 'platS', 0, 0)
        this.platforms.push(platform4)
        var platform5= new Platform(this, 64 * 11 + 224, 64*5, 'platS', 0, 0)
        this.platforms.push(platform5)
        var platform6= new Platform(this, 64 * 10 + 224, 64*6, 'platS', 0, 0)
        this.platforms.push(platform6)
        var platform7= new Platform(this, 64 * 10 + 224, 64*8, 'platS', 0, 0)
        this.platforms.push(platform7)
        var platform8= new Platform(this, 64 * 12 + 224, 64*7, 'platS', 0, 0)
        this.platforms.push(platform8)
        var platform9= new Platform(this, 64 * 0 + 224, 64*2, 'platS', 0, 0)
        this.platforms.push(platform9)
        var platform10= new Platform(this, 64 * 14 + 224, 64*2, 'platS', 0, 0)
        this.platforms.push(platform10)
        var platform11= new Platform(this, 64 * 1 + 224, 64*3, 'platM', 0, 0)
        this.platforms.push(platform11)
        var platform12= new Platform(this, 64 * 12 + 224, 64*3, 'platM', 0, 0)
        this.platforms.push(platform12)
        var platform13= new Platform(this, 64 * 6.5 + 224, 64*4, 'platM', 0, 0)
        this.platforms.push(platform13)
        var platform14= new Platform(this, 64 * 4 + 224, 64*2, 'platS', 0, 0)
        this.platforms.push(platform14)
        var platform15= new Platform(this, 64 * 5 + 224, 64*3, 'platS', 0, 0)
        this.platforms.push(platform15)
        var platform16= new Platform(this, 64 * 10 + 224, 64*2, 'platS', 0, 0)
        this.platforms.push(platform16)
        var platform17= new Platform(this, 64 * 9 + 224, 64*3, 'platS', 0, 0)
        this.platforms.push(platform17)
        var platform18= new Platform(this, 64 * 5 + 224, 64*1, 'platM', 0, 0)
        this.platforms.push(platform18)
        var platform19= new Platform(this, 64 * 8 + 224, 64*1, 'platM', 0, 0)
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
        this.setPlayerPosition(0, 30 + 224, 300)
        this.setPlayerPosition(1, this.game.canvas.width - 30 - 224, 300)
    }

    defineSkulls(){



        this.addSkull(30 + 224, 50);
        this.addSkull( 30 + 224, 165);
        this.addSkull( 95 + 224, 415);
        this.addSkull( 290 + 224, 325);

        this.addSkull( 345 + 224, 30 );
        this.addSkull( 500 + 224, 225);
        this.addSkull( 620 + 224, 30);

        this.addSkull(610 + 224, 415 );
        this.addSkull(800 + 224, 325);
        this.addSkull( 930 + 224, 16);
        this.addSkull( 930 + 224, 50);
    }


}