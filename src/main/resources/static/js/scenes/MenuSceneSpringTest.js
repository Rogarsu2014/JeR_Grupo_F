import {cameraFadeIn, cameraFadeOut} from "../util/cameraEffects.js";
import {Skull} from "../objects/Skull.js";

export class MenuSceneSpringTest extends Phaser.Scene {
    constructor() {
        super("MenuSceneSpringTest");
    }

    init() {


    }


    create() {

        let getMessageText = this.add.text(0, 0, 'Get messages').setOrigin(0).setDepth(0).setScale(1);
        let postMessageText = this.add.text(0, 50, 'post message').setOrigin(0).setDepth(0).setScale(1);
        
        // let width=this.game.canvas.width;
        // let height=this.game.canvas.height;

        // let playButton = this.add.image(width / 2,height / 2-25, 'LocalGame').setDepth(1).setScale(.8);


        getMessageText.setInteractive();
        postMessageText.setInteractive();

        getMessageText.on('pointerdown', () => {
            console.log("pointer down")
            this.getMessages();
        })

        postMessageText.on('pointerdown', () => {
            this.postMessage()
        })

    }

    getMessages() {
        $.ajax({
            url: 'http://localhost:8080/message'
        }).done(function (items) {
            console.log('Messages loaded: ' + JSON.stringify(items));
        })
    }

    postMessage() {
        let content = this.getTextAreaValue("usernameTextInput")
        $.ajax({
            method: "POST",
            dataType:'json',
            url: 'http://localhost:8080/message',
            data: JSON.stringify({
                "username": "test",
                "content": content
            }),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
            fail: ()=>console.log("Failed")
        }).done(function (item) {
            console.log('Messages pushed: ' + JSON.stringify(item));
        })
    }


    getTextAreaValue(elementId) {
        let element = document.getElementById(elementId);
        return element.value;
    }
}