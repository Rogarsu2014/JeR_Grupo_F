
import {CompetitiveScene} from "./Base/CompetitiveScene.js";
import {addCompScene} from "../../../util/ScenesRandomizer.js";



let sceneKey="Comp1"
addCompScene(sceneKey)

export class Comp1 extends CompetitiveScene {

    constructor() {
        super(sceneKey, 30000,'Comp1Map',1408);
    }

    create(data) {

        super.create(data)

    }

    definePlayersPosition() {
        this.setPlayerPosition(0, 30, 300)
        this.setPlayerPosition(1, this.game.canvas.width - 30, 300)

    }

    primitiveSetTraps() {
        this.addTrap( 150, 426);
        this.addTrap(350, 490);
        this.addTrap(1000, 298);
        this.addTrap(1000, 490);
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