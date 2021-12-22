import {cameraFadeIn, cameraFadeOut} from "../util/cameraEffects.js";
import {Skull} from "../objects/Skull.js";
import {FormUtil} from "../util/FormUtil.js";
import {MessagesManager} from "../server/MessagesManager.js";
import {ServerConnectionManager} from "../server/ServerConnectionManager.js";
import {UserRegistration} from "../util/UserRegistration.js";

var music;
const backgroundMusicKey = 'mainMenuMusic';
let icons = {
    0: "daiaIcon",
    1: "ibbanIcon"
}

export class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    init() {
        this.buttons = Phaser.GameObjects.Image = []
        this.selectedButtonIndex = 0
        this.selectSprite = null
        this.user = null;
    }

    preload() {
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
    }

    create() {

        this.loadBackgroundMusic()
        this.playBackgroundMusic()

        this.game.canvas.width = 1408;
        this.physics.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height)
        let width = this.game.canvas.width;
        let height = this.game.canvas.height;
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            playButton.off('selected')
            tutorial.off('selected');
            credits.off('selected');
        })
        this.add.image(0, 0, 'menuImage').setOrigin(0).setDepth(0).setScale(1);

        this.add.image(this.game.canvas.width * .5, 10, 'gameTittle').setOrigin(0.5, 0).setDepth(10).setScale(.25);

        this.selectSprite = new Skull(this, width / 2 - 100, height / 2 - 100, "skull", 6)
        this.selectSprite.setVisible(false);
        this.selectSprite.setScale(.1);

        // this.add.text(width / 3,height * 0.1, 'Dual Interest', { fontSize: '40px', fill: '#000' }).setDepth(1);
        let playButton = this.add.image(width / 3, height / 2 - 25, 'LocalGame').setDepth(1).setScale(.8);
        this.onlineGame = this.add.image(width / 3, height / 2 + 50, 'OnlineGame').setDepth(1).setScale(.8);
        let tutorial = this.add.image(width / 3, height / 2 + 125, 'Tutorial').setDepth(1).setScale(.8);
        let options = this.add.image(width / 3, height / 2 + 200, 'Options').setDepth(1).setScale(.8);
        let credits = this.add.image(width / 3, height / 2 + 275, 'Credits').setDepth(1).setScale(.8);


        // chatText.setWordWrapWidth(778 * .5 - 20)
        // chatText.setWordWrapHeight(960 *.5 - 20)

        // *fase2* settings
        options.alpha = 0.4;
        this.onlineGame.alpha = 0.4;
        this.buttons.push(playButton);
        this.buttons.push(tutorial);
        this.buttons.push(credits);

        playButton.setInteractive();
        tutorial.setInteractive();
        credits.setInteractive();

        playButton.on('pointerdown', () => {
            this.disableListeners();
            this.stopBackgroundMusic()
            this.scene.start('Coop1');
        })
        tutorial.on('pointerdown', () => {
            this.disableListeners();
            this.stopBackgroundMusic();
            this.scene.start('Tutorial')
        })
        credits.on('pointerdown', () => {
            this.disableListeners();
            this.stopBackgroundMusic();
            this.scene.start('Credits')
        })

        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });
        // this.formUtil.showNumbers();
        this.formUtil.scaleToGameW("myText", .2);
        this.formUtil.placeElementAt(97, 'myText', true);

        this.formUtil.scaleToGameW("btnSend", .04);
        this.formUtil.placeElementAt(98, "btnSend");
        this.formUtil.addClickCallback("btnSend", () => this.sendMessage());

        
        this.formUtil.scaleToGameW("myUser", .11);
        this.formUtil.placeElementAt(1, 'myUser', true);

        
        this.formUtil.scaleToGameW("myPass", .11);
        this.formUtil.placeElementAt(12, 'myPass', true);

        this.formUtil.hideElement("myText");
        this.formUtil.hideElement("btnSend");
        this.formUtil.hideElement("myUser");
        this.formUtil.hideElement("myPass");

        //**** 778x960
        this.chatText = this.add.text(128 * 8 + 5, 58 * 1.3, '', {
            fontSize: '8px', color: '#fff', backgroundColor: '#000', fixedWidth: 128 * 3.25,
            fixedHeight: 58 * 8.2
        }).setDepth(1).setScale(.8).setVisible(false);
        this.chatText.depth = 100;

        this.loginButton = this.add.image(58, 60, 'loginButton').setDepth(1).setScale(.7);
        //let chatButton = this.add.image(width - 100, height - 50, 'ChatButton').setDepth(1).setScale(.3);
        //this.buttons.push(chatButton);
        //this.buttons.push(loginButton);
        //chatButton.setInteractive();
        this.loginButton.setInteractive();


        this.chatScreen = this.add.image(width - 200, 300, 'ChatScreen').setDepth(1).setScale(.72).setVisible(0);
        this.loginScreen = this.add.image(168, 110, 'registerScreen').setDepth(1).setScale(.4).setVisible(0);
        this.playerScreen = this.add.image(125, 60, 'PlayerScreen').setDepth(1).setScale(.7).setVisible(0);

        this.loginErrorText = this.add.text(26, 115, '', {
            fontFamily: 'ink-free-normal',
            fontSize: '22px', color: '#f00'
        }).setDepth(100).setVisible(false)
        this.logInButton = this.add.image(240, 170, 'LogIn').setDepth(1).setScale(.4).setVisible(0);
        this.registerButton = this.add.image(94, 170, 'registerButton').setDepth(1).setScale(.4).setVisible(0);
        this.logInButton.setInteractive();
        this.registerButton.setInteractive();

        this.xButton = this.add.image(width - 390, 50, 'XButton').setDepth(1).setScale(.3).setVisible(0);
        this.xButton2 = this.add.image(320, 58, 'UI_Arrow').setDepth(1).setScale(.15).setVisible(0);
        this.xButton2.flipX = true;


        this.disableResgisterScreen();
        this.disablePlayerScreen()
        const COLOR_LIGHT = 0x7b5e57;
        const COLOR_DARK = 0x260e04;
        this.textArea = this.rexUI.add.textArea({

            x: 1210,
            y: 275,
            width: 350,
            height: 400,

            // text: this.add.text(),
            text: this.rexUI.add.BBCodeText().setFontFamily('ink-free-normal'),
            // textMask: false,

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                position: 'bottom',
            },

            space: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,

                text: 10,
                // text: {
                //     top: 20,
                //     bottom: 20,
                //     left: 20,
                //     right: 20,
                // },
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },
            content: "",
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)
        this.textArea.setDepth(200).setVisible(false);
        this.textArea.scrollToBottom();
        //textArea.setText(CreateContent(10000));


        //this.buttons.push(xButton);
        this.xButton.setInteractive();
        this.xButton2.setInteractive();
        this.chatErrorText = this.add.text(128 * 8 + 60, 58 * 8, '', {
            fontFamily: 'ink-free-normal',
            fontSize: '16px', color: '#f00'
        }).setDepth(1).setScale(.8).setVisible(false)

        this.chatButton = this.add.image(width - 100, height - 50, 'ChatButton').setDepth(1).setScale(.3);

        //this.buttons.push(this.chatButton);
        this.disableChatButton();
        this.chatVisible = false;
        this.loginVisible = false;
        this.gamesVisible = false;

        this.chatButton.on('pointerdown', () => {
            if (this.chatVisible === false) {
                this.chatScreen.setVisible(1);
                this.xButton.setVisible(1);
                this.formUtil.showElement("myText");
                this.formUtil.showElement("btnSend");
                this.formUtil.placeElementAt(97, 'myText', true);
                this.formUtil.placeElementAt(98, "btnSend");
                this.textArea.setVisible(true);
                this.chatErrorText.setVisible(true);
                this.chatVisible = true;
                MessagesManager.receiveMessages(this.textArea)
            }
        })
        this.xButton.on('pointerdown', () => {
            if (this.chatVisible === true) {
                this.chatScreen.setVisible(0);
                this.xButton.setVisible(0);
                this.formUtil.hideElement("myText");
                this.formUtil.hideElement("btnSend");
                this.chatVisible = false;
                this.chatErrorText.setVisible(false);
                this.textArea.setVisible(false);
                MessagesManager.stopReceivingLastMessages()
            }
            /*
            * Si usamos el if de abajo funciona bien el cerrar y abrir de forma INDIVIDUAL cada ventana
            * pero cuando abres las dos al mismo tiempo y le das a la X se cierran ambas
            */
            /*if (loginVisible === true) {
                loginScreen.setVisible(0);
                xButton.setVisible(0);
                loginVisible = false;
            }*/
        })
        this.loginButton.on('pointerdown', () => {
            if (this.gamesVisible === false) {
                if (this.loginVisible === false) {
                    this.enableResgisterScreen()
                    // loginScreen.setVisible(1);

                    // console.log("Click");
                    this.xButton2.setVisible(1);
                    this.loginErrorText.setVisible(true);
                    this.loginErrorText.text = "";
                    this.formUtil.showElement("myUser");
                    this.formUtil.showElement("myPass");
                    this.formUtil.placeElementAt(1, 'myUser', true);
                    this.formUtil.placeElementAt(12, 'myPass', true);
                    this.loginVisible = true;
                }
            } else {
                this.enablePlayerScreen()
            }
        })
        this.xButton2.on('pointerdown', () => {
            if (this.loginVisible === true) {
                this.disableResgisterScreen()
                this.xButton2.setVisible(0);
                this.loginErrorText.setVisible(false);
                this.formUtil.hideElement("myUser");
                this.formUtil.hideElement("myPass");
                this.loginVisible = false;
            } else if (this.gamesVisible === true) {
                this.disablePlayerScreen();
            }
        })
        this.logInButton.on('pointerdown', () => {
            if (this.loginVisible === true) {
                this.logInPlayer();
            }
        })
        this.registerButton.on('pointerdown', () => {
            if (this.loginVisible === true) {
                this.signUpPlayer();
            }
        })


        this.selectButton(0);

        var arrowDown = this.input.keyboard.on('keydown-' + 'DOWN', () => this.selectNextButton(1));

        var arrowUp = this.input.keyboard.on('keydown-' + 'UP', () => this.selectNextButton(-1));

        // var enterKey = this.input.keyboard.on('keydown-' + 'ENTER', () => this.confirmSelection());
        this.defineNetworkAvailabilityFunctionalities();
        this.defineUserRegistration();
        // ServerPing.ConnectUser()
        // ServerPing.GetClientsCount()

    }

    sendMessage() {
        // console.log("sendForm");
        //content es el contenido de la area de texto con el tag de myText
        let content = this.formUtil.getTextAreaValue("myText");
        // console.log(content)
        //Metodo con el que llamabamos al mensaje, CAMBIAR
        MessagesManager.postMessage(this.user['username'], content, () => {
                this.formUtil.clearTextAreaValue("myText");
                
                this.chatErrorText.text = '';
            }, () => this.chatErrorText.text = 'Failed to sent message'
            , () => this.chatErrorText.text = 'Error while sending message');
    }

    selectButton(index) {
        const button = this.buttons[index];
        this.tweens.add({
            targets: button,
            scaleX: 1.25,
            ease: 'Quart.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 100,
            yoyo: true,
            repeat: 0,            // -1: infinity
        });

        let textureName = button.texture.key + 'Push';
        button.setTexture(textureName)
        this.selectSprite.x = button.x - button.displayWidth * 0.71
        this.selectSprite.y = button.y - 2.7;

        this.tweens.add({
            targets: this.selectSprite,
            scaleY: .08,
            ease: 'Expo.in',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 60,
            yoyo: true,
            repeat: 0,            // -1: infinity
        });

        this.selectedButtonIndex = index;
        //this.selectSprite.setVisible(true);
    }

    defineNetworkAvailabilityFunctionalities() {
        let width = this.game.canvas.width;
        let height = this.game.canvas.height;
        let networkSymbol = this.add.image(width - 100 - 128, height - 50, 'networkSymbol').setDepth(1).setScale(.5);
        this.usersConnectedWindow = this.add.image(width - 100 - 128 * 2, height - 50, 'usersConnected').setDepth(1).setScale(.8);
        this.usersConnectedCountText = this.add.text(width - 105 - 128 * 2, height - 70, '', {
            fontFamily: 'ink-free-normal',
            fontSize: '40px'
        }).setDepth(1);
        ServerConnectionManager.GetClientsCount((clientsCount) => this.usersConnectedCountText.setText(clientsCount));
        ServerConnectionManager.CheckNetworkConnection(() => {
                networkSymbol.setTexture("networkSymbolSuccess")
                this.enableClientsCountBox()
                if (this.user !== null) {
                    this.enableChatButton()
                }
            },
            () => {
                networkSymbol.setTexture("networkSymbolError")
                this.disableClientsCountBox();

                this.disableChatButton()

            })
    }

    disableClientsCountBox() {
        this.usersConnectedCountText.setVisible(false);
        this.usersConnectedWindow.setVisible(false);
    }

    enableClientsCountBox() {
        this.usersConnectedCountText.setVisible(true);
        this.usersConnectedWindow.setVisible(true);
    }

    defineUserRegistration() {
        this.userRegistration = new UserRegistration();
        // this.formUtil.addClickCallback("signUpBtn", () => this.signUpPlayer());
        // this.formUtil.addClickCallback("logInBtn", () => this.logInPlayer());
    }

    logInPlayer() {
        let username = this.formUtil.getTextAreaValue("myUser");
        let password = this.formUtil.getTextAreaValue("myPass");

        this.userRegistration.logIn(username, password, (user) => this.Registered(user),
            () => this.loginErrorText.text = "Wrong Username or Password",
            () => this.loginErrorText.text = "User has already logged in")
    }

    signUpPlayer() {
        let username = this.formUtil.getTextAreaValue("myUser");
        let password = this.formUtil.getTextAreaValue("myPass");
        let confirmPassword = this.formUtil.getTextAreaValue("myPass");
        this.userRegistration.trySignUp(username, password, confirmPassword,
            (user) => this.Registered(user), () => this.loginErrorText.text = "Username " + username + " already taken")
    }

    Registered(user) {
        if (user !== null) {
            this.user = user;
            // console.log("username obtained " + user['username'])
            this.enableChatButton();
            this. enableOnlineGameButton()
            ServerConnectionManager.setClientId(user['username'])
            ServerConnectionManager.ConnectUser();
            this.xButton2.x=240;
            this.setPlayerInformation();
            if (this.loginVisible === true) {
                this.disableResgisterScreen()
                this.xButton2.setVisible(0);
                this.loginVisible = false;
                this.gamesVisible = true;
            }

        } else {
            // console.log("User undefined")
        }
    }
    
    enableOnlineGameButton(){
        this.onlineGame.alpha=1.0;
        this.buttons.splice(1,0,this.onlineGame);
    }
    
    setPlayerInformation() {
        this.playerUsernameText = this.add.text(120, 16, this.user['username'], {
            fontFamily: 'ink-free-normal',
            fontSize: '20px', color: '#000'
        }).setDepth(100).setVisible(false);
        this.playerGamesWonText = this.add.text(160, 60, this.user['gameswon'], {
            fontFamily: 'ink-free-normal',
            fontSize: '48px', color: '#fff'
        }).setDepth(100).setVisible(false);

        this.playerIcon = this.add.image(58, 60, icons[this.user['iconIndex']]).setDepth(2).setScale(.7).setVisible(false);

        this.loginButton.setTexture(icons[this.user['iconIndex']])
        this.iconUpArrow = this.add.image(60, 10, "UI_Arrow").setScale(.1).setVisible(false);
        this.iconUpArrow.depth = 2;
        this.iconUpArrow.flipX = true;
        this.iconUpArrow.angle = 90

        this.iconDownArrow = this.add.image(60, 110, "UI_Arrow").setScale(.1).setVisible(false);
        this.iconDownArrow.depth = 2;
        this.iconDownArrow.angle = 90;
        this.iconUpArrow.setInteractive()
        this.iconDownArrow.setInteractive()

        this.iconUpArrow.on('pointerdown', () => {
            this.onIconUp()
        })
        this.iconDownArrow.on('pointerdown', () => {
            this.onIconDown()
        })
        
    }
    enableChangeIconArrows(){
        this.iconUpArrow.setVisible(true)
        this.iconDownArrow.setVisible(true)
    } 
    disableChangeIconArrows(){
        this.iconUpArrow.setVisible(false)
        this.iconDownArrow.setVisible(false)
    }
    
    onIconUp() {
        let currentIconIndex = this.user['iconIndex'];
        if ((currentIconIndex + 1) >= Object.keys(icons).length) {
            this.user['iconIndex'] = 0;

        } else {
            this.user['iconIndex']++;
        }

        this.disableChangeIconArrows()
        this.userRegistration.updatePlayerIcon(this.user['username'], this.user['iconIndex'],()=>{
            this.updateIconTextures()
            this.enableChangeIconArrows()
        })
    }
    updateIconTextures(){
        this.playerIcon.setTexture(icons[this.user['iconIndex']])
        this.loginButton.setTexture(icons[this.user['iconIndex']])
    }
    onIconDown() {
        let currentIconIndex = this.user['iconIndex'];
        if ((currentIconIndex - 1) < 0) {
            
            this.user['iconIndex'] = Object.keys(icons).length-1;

        } else {
            this.user['iconIndex']--;
        }
        this.disableChangeIconArrows()
        this.userRegistration.updatePlayerIcon(this.user['username'], this.user['iconIndex'],()=>{
            this.updateIconTextures()
            this.enableChangeIconArrows()
        })
    }

    enablePlayerScreen() {
        if (this.user !== null) {
            this.playerUsernameText.setVisible(true);
            this.playerGamesWonText.setVisible(true);

            this.playerIcon.setVisible(true)
            this.enableChangeIconArrows()
        }
        // if (this.playerUsernameText!==undefined) {
        // }
        // if (this.playerGamesWonText!==undefined) {
        // }
        this.playerScreen.setVisible(true)
        this.xButton2.setVisible(true);

    }

    disablePlayerScreen() {

        if (this.user !== null) {
            this.playerUsernameText.setVisible(false);
            this.playerGamesWonText.setVisible(false);

            this.playerIcon.setVisible(false)
            this.disableChangeIconArrows()
        }
        // if (this.playerUsernameText!==undefined) {
        //     this.playerUsernameText.setVisible(false);
        // }
        // if (this.playerGamesWonText!==undefined) {
        //     this.playerGamesWonText.setVisible(false);
        // }
        this.playerScreen.setVisible(false)
        this.xButton2.setVisible(false);

    }

    enableChatButton() {
        this.chatButton.alpha = 1;
        this.chatButton.setInteractive();
    }

    enableResgisterScreen() {
        this.formUtil.showElement("myUser");
        this.formUtil.showElement("myPass");
        this.loginErrorText.setVisible(1)
        this.loginScreen.setVisible(1);
        this.logInButton.setVisible(1);
        this.registerButton.setVisible(1);
    }

    disableResgisterScreen() {
        this.formUtil.hideElement("myUser");
        this.formUtil.hideElement("myPass");
        this.loginErrorText.setVisible(0)
        this.loginScreen.setVisible(0);
        this.logInButton.setVisible(0);
        this.registerButton.setVisible(0);
    }

    disableChatButton() {
        this.chatButton.alpha = .5;
        this.chatButton.disableInteractive();
    }

    selectNextButton(change = 1) {
        const button = this.buttons[this.selectedButtonIndex];
        let textureName = button.texture.key.replace('Push', '');
        button.setTexture(textureName)
        let index = this.selectedButtonIndex + change
        if (index >= this.buttons.length) {
            index = 0
        } else if (index < 0) {
            index = this.buttons.length - 1
        }

        this.selectButton(index)
    }

    confirmSelection() {
        const button = this.buttons[this.selectedButtonIndex];
        button.emit('selected');
    }

    disableListeners() {
        cameraFadeOut(this, 1000);

        this.input.keyboard.removeListener('keydown-' + 'DOWN');

        this.input.keyboard.removeListener('keydown-' + 'UP');

        this.input.keyboard.removeListener('keydown-' + 'ENTER');
    }

    playBackgroundMusic() {
        music.play();
    }

    loadBackgroundMusic() {
        music = this.sound.add(backgroundMusicKey, {volume: 0.18});
    }

    stopBackgroundMusic() {
        music.stop()
    }

    update() {
        // console.log("")
        this.setElementsPosition()
    }

    setElementsPosition() {
        this.formUtil.placeElementAt(97, 'myText', true);
        this.formUtil.placeElementAt(98, "btnSend");
        this.formUtil.placeElementAt(1, 'myUser', true);
        this.formUtil.placeElementAt(12, 'myPass', true);
    }
}