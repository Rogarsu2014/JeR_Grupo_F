import {Player_I} from '../objects/Player_I.js'
import {Skull} from '../objects/Skull.js'
import {Trampa} from '../objects/Trampa.js'
import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";
import {Button} from "../objects/Button.js";
import {Platform} from "../objects/Platform.js";
import {Timer} from "../util/Timer.js";
import {
    SweepVerticalTransitionIn,
    SweepTransitionHorizontalOut,
    SweepVerticalTransitionOut, cameraFadeOut, cameraFadeIn
} from "../util/cameraEffects.js";
import {CompetitiveScene} from "./CompetitiveScene.js";

var skulls = [];
var traps = [];
var counter = 0;

export class Comp1 extends CompetitiveScene {

    constructor() {
        super("Comp1", "Coop2", 30000);
    }

    init() {

    }

    preload() {
    }

    create(data,tilemapKey) {

        super.create(data,'Comp1Map')
        this.setPlayerPosition(0, 30, 300)
        this.setPlayerPosition(1, this.game.canvas.width - 30, 300)


        //Creación de todas las skulls
        skulls.push(new Skull(this, 250, 325, "skull"));
        skulls.push(new Skull(this, 225, 545, "skull"));
        skulls.push(new Skull(this, 420, 350, "skull"));
        skulls.push(new Skull(this, 545, 350, "skull"));
        skulls.push(new Skull(this, 610, 475, "skull"));
        skulls.push(new Skull(this, 670, 285, "skull"));
        skulls.push(new Skull(this, 800, 480, "skull"));
        skulls.push(new Skull(this, 830, 185, "skull"));
        skulls.push(new Skull(this, 1050, 285, "skull"));
        skulls.push(new Skull(this, 1115, 480, "skull"));
        skulls.push(new Skull(this, 1150, 185, "skull"));
        skulls.push(new Skull(this, 1185, 350, "skull"));
        skulls.push(new Skull(this, 1350, 545, "skull"));
        counter = 13;

        for (let i = 0; i < skulls.length; i += 1) {
            this.physics.add.collider(this.players[0], skulls[i], () => {
                skulls[i].desaparicion(this.players[0]);
                this.scores[0].setText("Player 1: " + this.players[0].points);
                counter--;
                if (counter == 0) {

                    this.startNextLevel();

                }
            });
            this.physics.add.collider(this.players[1], skulls[i], () => {
                skulls[i].desaparicion(this.players[1]);
                this.scores[1].setText("Player 2: " + this.players[1].points);
                counter--;
                if (counter == 0) {
                    this.startNextLevel();
                }
            });
        }

        traps.push(new Trampa(this, 150, 426, "trap"));
        traps.push(new Trampa(this, 350, 490, "trap"));
        traps.push(new Trampa(this, 1000, 298, "trap"));
        traps.push(new Trampa(this, 1000, 490, "trap"));

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


    onTimeOverPrimitive() {
        cameraFadeOut(this, 1000, () => {
            this.music.stop()
            this.startNextLevel()
        })
    }


}