import { Player_I } from '../objects/Player_I.js'

var players = [];
var playersaux = [];
var puntuaciones = [];

export class FinPartida extends Phaser.Scene {
    constructor() {
        super("FinPartida");
    }
    init() {
    }
    preload() {
        this.load.image("calavera", "./Resources/assets/items/Calavera.png");
    }
    create(jug) {
        console.log("Fin Partida Scene created");

        players = `${jug}`;

        if (players[0].puntos > players[1].puntos) {
            this.add.text(320, 20, "¡El jugador 1 ha ganado!")
            puntuaciones[0] = this.add.text(350, 213, "Jugador 1: " + players[0].puntos);
            puntuaciones[1] = this.add.text(350, 233, "Jugador 2: " + players[1].puntos);

        } else if (players[0].puntos < players[1].puntos) {
            this.add.text(320, 20, "¡El jugador 2 ha ganado!")
            puntuaciones[0] = this.add.text(350, 213, "Jugador 1: " + players[1].puntos);
            puntuaciones[1] = this.add.text(350, 233, "Jugador 2: " + players[0].puntos);
        } else {
            this.add.text(320, 20, "¡Se ha producido un empate!")
            puntuaciones[0] = this.add.text(350, 213, "Jugador 1: " + players[0].puntos);
            puntuaciones[1] = this.add.text(350, 233, "Jugador 2: " + players[1].puntos);

            this.add.image(150, 250, "calavera").setScale(0.7);
            this.add.image(800, 250, "calavera").setScale(0.7);
        }

        this.add.text(380, 500, "Volver a jugar");
        this.add.text(340, 550, "Salir al menú principal");

    }

    update() {

    }
}