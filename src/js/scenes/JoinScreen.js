import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";

const player1JoinKeyboardKey = 'W'
const player1LeaveKeyboardKey = 'S'
const player2JoinKeyboardKey = 'U'
const player2LeaveKeyboardKey = 'J'

const playerJoinGamepadButton = 0;
const playerLeaveGamepadButton = 1;

let arePlayersJoined = [false, false];

let playersInput = []
let joinedPlayers = []
let inputDictionary={}

const playerScale=0.3

export class JoinScreen extends Phaser.Scene {


    constructor() {
        super("JoinScreen");
    }

    init() {
    }

    create() {

        //*** size setting
        this.game.canvas.width = 960;

        //***** players image
        // Player 1
        this.daiaImg = this.add.image(150, 250, "daia0").setScale(0.3);
        // Player 2
        this.ibbanImg = this.add.image(800, 250, "ibban").setScale(0.3);

        this.hidePlayer(this.daiaImg)
        this.hidePlayer(this.ibbanImg)


        this.SetKeys(0, player1JoinKeyboardKey, player1LeaveKeyboardKey)
        this.SetKeys(1, player2JoinKeyboardKey, player2LeaveKeyboardKey)

        this.input.gamepad.on('down',(gamepad,button, value)=> {

            if(button.index===playerJoinGamepadButton) {
                for (let i = 0; i < arePlayersJoined.length; i++) {
                    if (arePlayersJoined[i] === false) {
                        arePlayersJoined[i] = true;
                        inputDictionary[i] = (new GamepadProcessor(this, null, gamepad.index, 0, 1));
                        console.log(gamepad.index)
                        console.log(button.index)
                        return;
                    }
                    if(inputDictionary[i].getPadIndex()){

                    }

                }
            }
            if(button.index===playerLeaveGamepadButton){
                console.log("player left")
            }

        })
    }

    preload() {

    }

    update() {

    }

    joinPlayer(){

    }

    hidePlayer(playerImg){
        this.tweens.add({
            targets: playerImg,
            scale:0,
            ease: 'Expo.out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 250,
            repeat: 0,            // -1: infinity
        });
    }

    showPlayer(playerImg){
        this.tweens.add({
            targets: playerImg,
            scale:playerScale,
            ease: 'Expo.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 250,
            repeat: 0,            // -1: infinity
        });
    }

    checkIfGamePadIsConnected(){
        for (let i = 0; i < inputDictionary; i++) {
            if(inputDictionary[i].getPadIndex()){

            }
        }

    }
    SetKeys(playerIndex, joinKey, leaveKey) {
        this.input.keyboard.on("keydown-" + joinKey, () => {
            if (!arePlayersJoined[playerIndex]) {
                console.log("Player " + (playerIndex + 1) + " joined")
                arePlayersJoined[playerIndex] = true;
            }
        });

        this.input.keyboard.on("keydown-" + leaveKey, () => {
            if (arePlayersJoined[playerIndex]) {
                console.log("Player " + (playerIndex + 1) + " left")
                arePlayersJoined[playerIndex] = false;
            }
        });
    }
}