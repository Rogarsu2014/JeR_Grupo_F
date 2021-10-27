import {GamepadProcessor} from "../util/InputProcessors/GamepadProcessor.js";
import {KeyboardProcessor} from "../util/InputProcessors/KeyboardProcessor.js";

const player1JoinKeyboardKey = 'W'
const player1LeaveKeyboardKey = 'S'
const player2JoinKeyboardKey = 'U'
const player2LeaveKeyboardKey = 'J'

const playerJoinGamepadButton = 0;
const playerLeaveGamepadButton = 1;



const playerScale = 0.3
const joinGamepadButton = 9
const leaveGamepadButton = 0
let playerImages=[]

let isPlayerConnected =  [false, false]
let isGamepadConnected = [false, false]

let inputDict={};

let playersInput={}

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
        this.daiaImg = this.add.image(150, 250, "daia0").setScale(0);
        // Player 2
        this.ibbanImg = this.add.image(800, 250, "ibban").setScale(0);

        playerImages.push(this.daiaImg)
        playerImages.push(this.ibbanImg)



        // this.SetKeys(0, player1JoinKeyboardKey, player1LeaveKeyboardKey)
        // this.SetKeys(1, player2JoinKeyboardKey, player2LeaveKeyboardKey)

        this.input.gamepad.on('connected', (gamepad, event) => {


            let gButtons = gamepad.buttons


            gButtons[joinGamepadButton].events = new Phaser.Events.EventEmitter();
            gButtons[joinGamepadButton].events.on("down", () => this.gamePadConnected(gamepad));

            gButtons[leaveGamepadButton].events = new Phaser.Events.EventEmitter();
            gButtons[leaveGamepadButton].events.on("down", () => this.gamePadLeft(gamepad));

            //** Player 1 - left player
            this.input.keyboard.on('keydown-W',()=>this.keyboardConnected(0))
            this.input.keyboard.on('keydown-S',()=>this.keyboardLeft(0))

            //** Player 2 - right player
            this.input.keyboard.on('keydown-U',()=>this.keyboardConnected(1))
            this.input.keyboard.on('keydown-J',()=>this.keyboardLeft(1))

        })
        this.input.keyboard.on('keydown-D',()=>
            this.scene.start('Coop1',{input1:playersInput[0],input2:playersInput[1]})
        )

    }

    preload() {

    }

    update() {

    }

    keyboardConnected(playerIndex) {
        if (isPlayerConnected[playerIndex]) return;
        playersInput[playerIndex]=this.setKeyboard(playerIndex);
        isPlayerConnected[playerIndex]=true;
        this.showPlayer(playerIndex)
    }



    keyboardLeft(playerIndex){
        if (!isPlayerConnected[playerIndex]) return;
        isPlayerConnected[playerIndex]=false;
        playersInput[playerIndex]=undefined;
        this.hidePlayer(playerIndex)
    }
    gamePadConnected(gamepad) {
        let padIndex = gamepad.index
        if (isGamepadConnected[padIndex] && !this.areAllPlayersConnected()) return;

        console.log('player joined with gamepad ' + padIndex)
        isGamepadConnected[padIndex] = true;


        let playerIndex = 0
        let notFound = true
        while (playerIndex < isPlayerConnected.length && notFound) {
            if (!isPlayerConnected[playerIndex]) {
                this.showPlayer(playerIndex)
                isPlayerConnected[playerIndex] = true;
                notFound = false;
                inputDict[padIndex] = playerIndex;

                playersInput[playerIndex]= this.setGamepad(padIndex)
            }
            playerIndex++;
        }

        if (this.areAllPlayersConnected()) {
            console.log("All players connected")
        }
    }

    areAllPlayersConnected(){
        return isPlayerConnected.every(p => p === true);
    }
    gamePadLeft(gamepad) {
        let padIndex = gamepad.index
        if (!isGamepadConnected[padIndex]) return;

        console.log('player left with gamepad ' + padIndex)
        isGamepadConnected[padIndex] = false;


        if(inputDict[padIndex] !== undefined){
            let playerIndex=inputDict[padIndex]
            this.hidePlayer(playerIndex)
            inputDict[padIndex] = undefined
            isPlayerConnected[playerIndex] = false
            playersInput[playerIndex]=undefined;
        }

    }

    hidePlayer(playerIndex) {
        this.tweens.add({
            targets:  playerImages[playerIndex],
            scale: 0,
            ease: 'Expo.out',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 250,
            repeat: 0,            // -1: infinity
        });
    }

    showPlayer(playerIndex) {
        this.tweens.add({
            targets: playerImages[playerIndex],
            scale: playerScale,
            ease: 'Expo.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 250,
            repeat: 0,            // -1: infinity
        });
    }


    setGamepad(padIndex){
        return new GamepadProcessor(this,null,padIndex,0,1)
    }
    setKeyboard(playerIndex) {
        if(playerIndex!=0)
            return new KeyboardProcessor(this,null,'W', 0, 'A', 'D', 'S', 'F');
        return new KeyboardProcessor(this,null,'U', 0, 'H', 'K', 'J', 'L');
    }
}