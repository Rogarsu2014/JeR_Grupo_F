import {cameraFadeIn, cameraFadeOut} from "../util/cameraEffects.js";
import {Skull} from "../objects/Skull.js";
import {FormUtil} from "../util/FormUtil.js";
import {MessagesManager} from "../server/MessagesManager.js";

import {getConnection, setPlayerIndex, setRoomCode} from "../server/Websockets/SocketIntilalizer.js";
import {getNextRandomCoop, getScenesOrder, redefineArrays, setScenesOrder} from "../util/ScenesRandomizer.js";
import {setAsHost} from "../server/HostData.js";

let music;
const backgroundMusicKey = 'mainMenuMusic';
let codeRecieved = false;

let isHost = false;

export class HostOrJoin extends Phaser.Scene {
    constructor() {
        super("HostOrJoin");
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
            this.hostButton.off('selected')
            this.joinButton.off('selected');
            this.readyButton.off('selected');
        })
        this.add.image(0, 0, 'menuImage').setOrigin(0).setDepth(0).setScale(1);

        this.add.image(this.game.canvas.width * .5, 10, 'gameTittle').setOrigin(0.5, 0).setDepth(10).setScale(.25);

        this.selectSprite = new Skull(this, width / 2 - 100, height / 2 - 100, "skull", 6)
        this.selectSprite.setVisible(false);
        this.selectSprite.setScale(.1);

        this.hostScreen = this.add.image(250, 250, 'HostScreen').setOrigin(0).setDepth(1).setScale(1.3);
        this.searchRoomScreen = this.add.image(763, 250, 'SearchRoomScreen').setOrigin(0).setDepth(1).setScale(1.3);


        // this.add.text(width / 3,height * 0.1, 'Dual Interest', { fontSize: '40px', fill: '#000' }).setDepth(1);
        this.hostButton = this.add.image(325, 262, 'HostButton').setOrigin(0).setDepth(2).setScale(.8);
        //this.onlineGame = this.add.image(width / 3, height / 2 + 50, 'OnlineGame').setDepth(1).setScale(.8);
        this.joinButton = this.add.image(850, 262, 'JoinButton').setOrigin(0).setDepth(2).setScale(.8);
        this.readyButton = this.add.image(width / 2, height / 2 + 230, 'ReadyButton').setDepth(2).setScale(.8);

        this.returnButton = this.add.image(110, height - 50, 'ReturnButton').setDepth(2).setScale(.8);

        this.codeText = this.add.text(275, 350, " ", {fontFamily: 'ink-free-normal', fontSize: 33});
        this.codeText.visible = false;
        this.codeText.setDepth(3);

        // chatText.setWordWrapWidth(778 * .5 - 20)
        // chatText.setWordWrapHeight(960 *.5 - 20)

        this.buttons.push(this.hostButton);
        this.buttons.push(this.joinButton);
        this.buttons.push(this.readyButton);
        this.buttons.push(this.returnButton);

        this.hostButton.setInteractive();
        this.joinButton.setInteractive();
        this.returnButton.setInteractive();
        this.readyButton.alpha = .6
        // readyButton.setInteractive();

        this.hostButton.on('pointerdown', () => {
            let connection = getConnection()

            redefineArrays()

            let hostInfo = {
                type: "Room",
                type2: "Host",
                scenesOrder: getScenesOrder()
            }


            if (connection.readyState !== WebSocket.OPEN) {
                connection.addEventListener('open', () => {
                    connection.send(JSON.stringify(hostInfo))
                })
            } else {
                connection.send(JSON.stringify(hostInfo))
            }
            isHost = true;
            this.readyButton.setInteractive();
            this.readyButton.alpha = 1
            this.joinButton.disableInteractive();
            this.joinButton.alpha = .6;
            this.searchRoomScreen.alpha = .6;
            this.formUtil.hideElement("myText")
            this.hostButton.disableInteractive();
        })
        this.joinButton.on('pointerdown', () => {
            let connection = getConnection()
            let joinInfo = {
                type: "Room",
                type2: "Join",
                RoomCode: this.formUtil.getTextAreaValue("myText")
            }
            if (codeRecieved === true) {

                this.readyButton.setInteractive();
                this.readyButton.alpha = 1
                this.hostScreen.alpha = .6
                this.hostButton.alpha = .6
                this.joinButton.disableInteractive();
                this.hostButton.disableInteractive();
                this.formUtil.hideElement("myText")
            }
            if (connection.readyState !== WebSocket.OPEN) {
                connection.addEventListener('open', () => {
                    connection.send(JSON.stringify(joinInfo))
                })
            } else {
                connection.send(JSON.stringify(joinInfo))
            }
        })

        this.readyButton.on('pointerdown', () => {
            this.disableListeners();
            this.stopBackgroundMusic();
            // redefineArrays()
            this.loadScene("Online" + getNextRandomCoop());
        })
        this.returnButton.on('pointerdown', () => {
            this.disableListeners();
            this.loadScene('MenuSceneWS');
        })


        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });
        // this.formUtil.showNumbers();
        this.formUtil.scaleToGameW("myText", .2);
        this.formUtil.showElement("myText")
        this.formUtil.placeElementAt(97, 'myText', true);

        this.selectButton(0);

        var arrowDown = this.input.keyboard.on('keydown-' + 'DOWN', () => this.selectNextButton(1));

        var arrowUp = this.input.keyboard.on('keydown-' + 'UP', () => this.selectNextButton(-1));

        this.setOnButtonInfoReceived();

    }

    sendMessage() {
        // console.log("sendForm");
        let content = this.formUtil.getTextAreaValue("myText");
        // console.log(content)
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
        // if (codeRecieved === true){
        //     this.codeText.visible = true;
        //     this.codeText.setText("Your room code: " + getRoomCode());
        // }
    }

    setElementsPosition() {
        this.formUtil.placeElementAt(73, 'myText', true);
    }

    setOnButtonInfoReceived() {
        let connection = getConnection()
        let roomCodeMsgListener = (msg) => this.getRoomCode(msg)
        connection.addEventListener('message', roomCodeMsgListener)
        this.events.on('shutdown',()=>connection.removeEventListener('message',roomCodeMsgListener))
    }

    getRoomCode(msg) {

        let message = JSON.parse(msg.data)
        if (message.type === "RoomCode") {
            let code = message.code;
            navigator.clipboard.writeText(code)
            setPlayerIndex(message.playerIndex);
            setRoomCode(code);


            codeRecieved = true;
            this.codeText.visible = true;
            if (isHost) {
                this.codeText.setText("Your room code: " + code)
                setAsHost()
            } else {
                this.setJoinCodeText(code)
                setScenesOrder(message.scenesOrder)
            }
        }
        if (message.type === "ConnectionClosed") {
            // console.log("external Connection closed reached")
            // this.scene.manager.getScenes(true)[0].start("MenuSceneWS")
            this.scene.manager.getScenes(true)[0].scene.start("MenuSceneWS")
            // this.scene.manager.start("MenuSceneWS")

        }

    }

    setJoinCodeText(code) {


        this.codeText.x = 785
        this.codeText.setText("Joined in room: " + code)

        this.readyButton.setInteractive();
        this.readyButton.alpha = 1
        this.hostScreen.alpha = .6
        this.hostButton.alpha = .6
        this.joinButton.disableInteractive();
        this.hostButton.disableInteractive();
        this.formUtil.hideElement("myText")

    }

    loadScene(sceneKey) {
        this.scene.start(sceneKey)
        this.formUtil.hideElement("myText")
    }

    goBackToMenu() {
        this.loadScene("MenuSceneWS")
    }
}