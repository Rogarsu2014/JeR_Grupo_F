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

export class JoinScreen extends Phaser.Scene {


    constructor() {
        super("JoinScreen");
    }

    init() {
    }

    create() {
        this.SetKeys(0, player1JoinKeyboardKey, player1LeaveKeyboardKey)
        this.SetKeys(1, player2JoinKeyboardKey, player2LeaveKeyboardKey)
        this.input.keyboard.on("keydown-D", () => {
            this.scene.start('Preloader');
        });

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