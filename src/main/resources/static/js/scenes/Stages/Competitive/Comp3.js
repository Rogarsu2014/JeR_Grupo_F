import {Trap} from '../../../objects/Trap.js'
import {Platform} from "../../../objects/Platform.js";
import {CompetitiveScene} from "./Base/CompetitiveScene.js";

var traps = [];


export class Comp3 extends CompetitiveScene {

    constructor() {
        super("Comp3", "GameCompletedScene", 30000, 'Comp3Map',1280);
    }


    create(data) {

        super.create(data)


        this.platforms = []
        var platform1 = new Platform(this, 64 * 2, 64 * 4, 'platM', 0, 0)
        this.platforms.push(platform1)
        var platform2 = new Platform(this, 64 * 4, 64 * 6, 'platL', 0, 0)
        this.platforms.push(platform2)
        var platform3 = new Platform(this, 64 * 6, 64 * 4, 'platL', 0, 0)
        this.platforms.push(platform3)
        var platform4 = new Platform(this, 64 * 9, 64 * 6, 'platM', 0, 0)
        this.platforms.push(platform4)
        var platform5 = new Platform(this, 64 * 11, 64 * 4, 'platL', 0, 0)
        this.platforms.push(platform5)
        var platform6 = new Platform(this, 64 * 13, 64 * 6, 'platL', 0, 0)
        this.platforms.push(platform6)
        var platform7 = new Platform(this, 64 * 16, 64 * 4, 'platM', 0, 0)
        this.platforms.push(platform7)


        traps.push(new Trap(this, 150, 426, "trap"));
        traps.push(new Trap(this, 300, 554, "trap"));
        traps.push(new Trap(this, 350, 554, "trap"));
        traps.push(new Trap(this, 615, 554, "trap"));
        traps.push(new Trap(this, 665, 554, "trap"));
        traps.push(new Trap(this, 930, 554, "trap"));
        traps.push(new Trap(this, 980, 554, "trap"));
        traps.push(new Trap(this, 980 + 150, 426, "trap"));

        for (let i = 0; i < traps.length; i += 1) {
            this.physics.add.collider(this.players[0], traps[i],  ()=> {
                traps[i].harm(this.players[0]);
                this.scores[0].setText("Player 1: " + this.players[0].points);
            });
            this.physics.add.collider(this.players[1], traps[i],  () =>{
                traps[i].harm(this.players[1]);

                this.scores[1].setText("Player 2: " + this.players[1].points);
            });
        }


        this.setPlatformsColliders();


        console.log("Escena comp 3 creada");
    }
    setPlatformsColliders(){

        for (let i = 0; i < this.platforms.length; i++) {
            this.physics.add.collider(this.players[0],  this.platforms[i])
            this.physics.add.collider(this.players[1],  this.platforms[i])
        }
    }
    defineSkulls() {
        this.addSkull(290, 325)

        this.addSkull(330, 430)


        this.addSkull(580, 180,);
        this.addSkull(600, 300)


        this.addSkull(930, 300);
        this.addSkull(930, 165)

        this.addSkull(930, 420)

    }

    definePlayersPosition() {
        this.setPlayerPosition(0, 30, 192)
        this.setPlayerPosition(1, this.game.canvas.width - 30, 192)
    }
}