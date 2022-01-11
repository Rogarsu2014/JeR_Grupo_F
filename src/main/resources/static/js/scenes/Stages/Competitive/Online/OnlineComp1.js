
import {OnlineCompetitiveScene} from "../Base/OnlineCompetitiveScene.js";




let sceneKey="OnlineComp1"
// addCompScene(sceneKey)

export class OnlineComp1 extends OnlineCompetitiveScene {

    constructor() {
        // super("OnlineComp1", "OnlineCoop2", 30000,'Comp1Map',1408);
        super(sceneKey, 30000,'Comp1Map',1408);
    }

    create(data) {

        super.create(data)


        //Creación de todas las skulls


        

    }
    primitiveSetTraps() {
        this.addTrap(150, 426);
        this.addTrap( 350, 490 );
        this.addTrap(1000, 298 );
        this.addTrap(1000, 490);
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