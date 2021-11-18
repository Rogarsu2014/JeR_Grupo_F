
import {Trap} from '../../../objects/Trap.js'

import {CompetitiveScene} from "./CompetitiveScene.js";


var traps = [];


export class Comp1 extends CompetitiveScene {

    constructor() {
        super("Comp1", "Coop2", 30000,'Comp1Map',1408);
    }

    create(data) {

        super.create(data)


        //Creación de todas las skulls


        traps.push(new Trap(this, 150, 426, "trap"));
        traps.push(new Trap(this, 350, 490, "trap"));
        traps.push(new Trap(this, 1000, 298, "trap"));
        traps.push(new Trap(this, 1000, 490, "trap"));

        for (let i = 0; i < traps.length; i += 1) {
            this.physics.add.collider(this.players[0], traps[i],  ()=> {
                traps[i].harm(this.players[0]);
                this.scores[0].setText("Jugador 1: " + this.players[0].points);
            });
            this.physics.add.collider(this.players[1], traps[i],  ()=> {
                traps[i].harm(this.players[1]);

                this.scores[1].setText("Jugador 2: " + this.players[1].points);
            });
        }

    }

    definePlayersPosition() {
        this.setPlayerPosition(0, 30, 300)
        this.setPlayerPosition(1, this.game.canvas.width - 30, 300)

    }

    defineSkulls() {
       this.addSkull(250, 325);
       this.addSkull(225, 545);
       this.addSkull(420, 350);
       this.addSkull(545, 350);
       this.addSkull(610, 475);
       this.addSkull(670, 285);
       this.addSkull(800, 480);
       this.addSkull(830, 185);
       this.addSkull(1050, 285);
       this.addSkull(1115, 480);
       this.addSkull(1150, 185);
       this.addSkull(1185, 350);
       this.addSkull(1350, 545);
    }


}