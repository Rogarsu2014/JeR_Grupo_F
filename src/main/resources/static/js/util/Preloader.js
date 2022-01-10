
import {loadFont} from "./FontLoader.js";



//Esta escena es para precargar assets, 
//el create tiene que ir a game, por lo que hace falta importarlo, lo tengo ahora al coop1 para testear ~ Pablo

export class Preloader extends Phaser.Scene {
    constructor(){
        super('Preloader')
    }

    preload(){

        loadFont('ink-free-normal','./Resources/Typography/ink-free-normal.ttf')
        // transitions
        this.load.image("BlackBackground", "./Resources/assets/background/BlackPixel.png")

        this.load.image('tileset', './Resources/assets/level/tileset.png');

        //**** main menu

        //buttons
        this.load.image('Credits','./Resources/assets/UI/Buttons/Credits.png');
        this.load.image('CreditsPush','./Resources/assets/UI/Buttons/CreditsPush.png');
        this.load.image('LocalGame','./Resources/assets/UI/Buttons/LocalGame.png');
        this.load.image('LocalGamePush','./Resources/assets/UI/Buttons/LocalGamePush.png');
        this.load.image('OnlineGame','./Resources/assets/UI/Buttons/OnlineGame.png');
        this.load.image('OnlineGamePush','./Resources/assets/UI/Buttons/OnlineGamePush.png');
        this.load.image('Options','./Resources/assets/UI/Buttons/Options.png');
        this.load.image('OptionsPush','./Resources/assets/UI/Buttons/OptionsPush.png');
        this.load.image('Tutorial','./Resources/assets/UI/Buttons/Tutorial.png');
        this.load.image('TutorialPush','./Resources/assets/UI/Buttons/TutorialPush.png');
        this.load.image('ChatButton','./Resources/assets/UI/Buttons/ChatButton.png');
        this.load.image('ChatScreen','./Resources/assets/UI/MainMenu/ChatScreen1.png');
        this.load.image('XButton','./Resources/assets/UI/Buttons/XButton.png');
        this.load.image('XButtonPush','./Resources/assets/UI/Buttons/XButtonPush.png');
        this.load.image('ChatButtonPush','./Resources/assets/UI/Buttons/ChatButtonPush.png');

        this.load.image('PlayAgain','./Resources/assets/UI/Buttons/PlayAgain.png');
        this.load.image('PlayAgainPush','./Resources/assets/UI/Buttons/PlayAgainPush.png');
        this.load.image('ReturnToMenu','./Resources/assets/UI/Buttons/ReturnToMenu.png');
        this.load.image('ReturnToMenuPush','./Resources/assets/UI/Buttons/ReturnToMenuPush.png');

        // Menu
        this.load.image('menuImage','./Resources/assets/UI/MainMenu/MenuImage.png');
        this.load.image('victoryImage','./Resources/assets/UI/VictoryImage.png');
        this.load.image('gameTittle','./Resources/assets/UI/MainMenu/GameTittle.png');

        this.load.image('sky', './Resources/assets/sky.png');

        //Player buttons
        this.load.image('botonR','./Resources/assets/level/Boton1.png');
        this.load.image('botonRP','./Resources/assets/level/Boton1Puls.png');
        this.load.image('botonL','./Resources/assets/level/Boton2.png');
        this.load.image('botonLP','./Resources/assets/level/Boton2Puls.png');
        //Mobile platforms
        this.load.image('1x1','./Resources/assets/level/blocker1 1x1.png');
        this.load.image('horizontal2x1','./Resources/assets/level/blocker2 2x1.png');
        this.load.image('horizontal3x1','./Resources/assets/level/blocker3 3x1.png');
        this.load.image('horizontal4x1','./Resources/assets/level/blocker6 4x1.png');
        this.load.image('vertical1x1-5','./Resources/assets/level/blocker7 1x1-5.png');
        this.load.image('vertical1x4-5','./Resources/assets/level/blocker8 1x4-5.png');
        // door
        this.load.image('door','./Resources/assets/level/Door.png');
        this.load.image('doorOpened','./Resources/assets/level/DoorOpened.png');
        this.load.audio("doorOpenedSfx",'./Resources/assets/sounds/doorOpenedSfx.mp3'); http://www.theallsounds.com/2018/04/door-opening-sound-effects-all-sounds.html

        //static platforms
        this.load.image('platS','./Resources/assets/level/escalonplano.png');
        this.load.image('platM','./Resources/assets/level/escalonplano2.png');
        this.load.image('platL','./Resources/assets/level/escalonplano3.png');

        //Credits
        this.load.image('creditsImage','./Resources/assets/Credits/CreditsImage.png');

        //Test
        this.load.tilemapTiledJSON('Coop1Map', './Resources/assets/level/Coop1.json');
        this.load.tilemapTiledJSON('Coop2Map', './Resources/assets/level/Coop2.json');
        this.load.tilemapTiledJSON('Coop3Map', './Resources/assets/level/Coop3.json');
        this.load.tilemapTiledJSON('Comp1Map', './Resources/assets/level/comp1v2.json');
        this.load.tilemapTiledJSON('Comp2Map', './Resources/assets/level/comp2v2.json');
        this.load.tilemapTiledJSON('Comp3Map', './Resources/assets/level/Comp3.json');
        this.load.spritesheet("dude","./Resources/assets/items/spritesheetDaia.png", { frameWidth: 706, frameHeight: 672 });
        this.load.spritesheet("dude2","./Resources/assets/items/spritesheetIbban.png", { frameWidth: 731, frameHeight: 526 });
        this.load.spritesheet("skull","./Resources/assets/items/SpriteSkulls.png", { frameWidth: 522, frameHeight: 518 });
        //this.load.image("skull", "./Resources/assets/items/skull.png");//Current sprites from tutorial
        this.load.audio("points+", "./Resources/assets/sounds/points.mp3");//https://www.youtube.com/watch?v=SoeT6x0O-CM
        this.load.audio("hit", "./Resources/assets/sounds/hit.mp3");//https://www.youtube.com/watch?v=dLED_gBGQsk
        this.load.image("trap", "./Resources/assets/items/itsatrap.png");

        this.load.audio("buttonClick", "./Resources/assets/sounds/buttonClick.mp3"); //https://creatorassets.com/a/button-sound-effects
        this.load.audio("coopStageMusic", "./Resources/assets/Music/coopStageMusic.mp3"); //https://www.youtube.com/watch?v=hdZLNZBZFlY&list=PLobY7vO0pgVIOZNKTVRhkPzrfCjDJ0CNl&index=17
        this.load.audio("compStageMusic", "./Resources/assets/Music/compStageMusic.mp3"); //https://www.youtube.com/watch?v=hdZLNZBZFlY&list=PLobY7vO0pgVIOZNKTVRhkPzrfCjDJ0CNl&index=17
        this.load.audio("mainMenuMusic", "./Resources/assets/Music/MainMenuMusic.mp3"); //https://www.youtube.com/watch?v=9DGO2Vtppu4&list=PLobY7vO0pgVIOZNKTVRhkPzrfCjDJ0CNl&index=25



        //Load menu
        this.load.image('sky', './Resources/assets/sky.png');
        this.load.image('star', './Resources/assets/star.png');
        this.load.image('play_button', './Resources/assets/play_button.png');
        this.load.image('options_button', './Resources/assets/options_button.png');
        this.load.image("daia0", "./Resources/assets/items/Daia0.png");//Current sprites from tutorial
        this.load.image("ibban", "./Resources/assets/items/Ibban.png");//Current sprites from tutorial

        //Tutorial
        this.load.image("startMovement", "./Resources/assets/Tutorial/startMovement.png");
        this.load.image("A-press2", "./Resources/assets/Tutorial/A-press2.png");
        this.load.image("aMove1", "./Resources/assets/Tutorial/aMove1.png");
        this.load.image("aMove2", "./Resources/assets/Tutorial/aMove2.png");

        this.load.image("D-press2", "./Resources/assets/Tutorial/D-press2.png");
        this.load.image("dMove1", "./Resources/assets/Tutorial/dMove1.png");
        this.load.image("dMove2", "./Resources/assets/Tutorial/dMove2.png");
        this.load.image("F-press2", "./Resources/assets/Tutorial/F-press2.png");
        this.load.image("fPush0", "./Resources/assets/Tutorial/fPush0.png");
        this.load.image("fPush1", "./Resources/assets/Tutorial/fPush1.png");
        this.load.image("fPush2", "./Resources/assets/Tutorial/fPush2.png");
        this.load.image("players4", "./Resources/assets/Tutorial/players4.png");

        this.load.image("W-press2", "./Resources/assets/Tutorial/W-press2.png");
        this.load.image("wJump1", "./Resources/assets/Tutorial/wJump1.png");
        this.load.image("wJump2", "./Resources/assets/Tutorial/wJump2.png");

        //Network symbols
        this.load.image("networkSymbol", "./Resources/assets/Network/NetworkSymbol.png");
        this.load.image("networkSymbolSuccess", "./Resources/assets/Network/NetworkSymbolSuccess.png");
        this.load.image("networkSymbolError", "./Resources/assets/Network/NetworkSymbolError.png");
        this.load.image("usersConnected", "./Resources/assets/Network/User_Connected.png");

        // Register and LogIn
        this.load.image("registerButton", "./Resources/assets/Register/RegisterButton.png");
        this.load.image("registerScreen", "./Resources/assets/Register/RegisterScreen.png");
        this.load.image('loginButton','./Resources/assets/UI/Buttons/LoginIcon.png');
        this.load.image('loginScreen','./Resources/assets/UI/Buttons/LoginScreen.png');
        
        this.load.image("LogIn", "./Resources/assets/LogIn/LoginButton.png");
        this.load.image("PlayerScreen", "./Resources/assets/Register/PlayerScreen.png");
        
        this.load.image("daiaIcon", "./Resources/assets/Iconos/DaiaIcon.png");
        this.load.image("ibbanIcon", "./Resources/assets/Iconos/IbbanIcon.png");
        
        this.load.image("UI_Arrow", "./Resources/assets/UI/MainMenu/Arrow.png");

        //Host and Join
        this.load.image('HostButton','./Resources/assets/UI/Buttons/HostButton.png');
        this.load.image('HostButtonPush','./Resources/assets/UI/Buttons/HostButtonPush.png');
        this.load.image('JoinButton','./Resources/assets/UI/Buttons/JoinButton.png');
        this.load.image('JoinButtonPush','./Resources/assets/UI/Buttons/JoinButtonPush.png');
        this.load.image('ReadyButton','./Resources/assets/UI/Buttons/ReadyButton.png');
        this.load.image('ReadyButtonPush','./Resources/assets/UI/Buttons/ReadyButtonPush.png');
        this.load.image('SearchRoomScreen', './Resources/assets/UI/SearchRoomScreen.png');
        this.load.image('HostScreen', './Resources/assets/UI/HostScreen.png');

        //Escena Victoria
        this.load.image('Daia_Muerte2','./Resources/assets/items/Daia_Muerte2.png');
        this.load.image('Daia_Muerte3','./Resources/assets/items/Daia_muerte3.png');
        this.load.image('DaiaVictoryPose','./Resources/assets/items/DaiaVictoryPose.png');
        this.load.image('Ibban_Muerte','./Resources/assets/items/Ibban_Muerte.png');
        this.load.image('Ibban_Muerte2','./Resources/assets/items/Ibban_Muerte2.png');
        this.load.image('IbbanVictoryPose','./Resources/assets/items/IbbanVictoryPose.png');
    }
    create(){
        console.log("Preload hecho");
        this.scene.start('MenuSceneWS');

    }

}