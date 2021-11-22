
let text;
export class MenuSceneSpringTest extends Phaser.Scene {
    constructor() {
        super("MenuSceneSpringTest");
    }

    init() {


    }


    create() {

        let getMessageText = this.add.text(0, 0, 'Get messages').setOrigin(0).setDepth(0).setScale(1);
        let postMessageText = this.add.text(0, 50, 'post message').setOrigin(0).setDepth(0).setScale(1);
        text = this.add.text(0, 100, '').setOrigin(0).setDepth(0).setScale(1);
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
        let newContent = this.getTextAreaValue("usernameTextInput")
        $.ajax({
            method: "POST",
            dataType:'json',
            url: 'http://localhost:8080/message',
            data: JSON.stringify({
                "username": "test",
                "content": newContent
            }),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
            success: (item)=> {
                console.log("Message sent")
                console.log((item))
                console.log((item)['username'])
                console.log((item)['content'])
                text.text+=((item)['content']+"\n")
            },
            fail: ()=> {
                text.text += "Failed to send message" + "\n"
            },
            error:()=>{
                text.text += "Error while sending message" + "\n"
            }
        }).done(function (item) {
            
            // añadir al final del texto
            // text.text+=(JSON.stringify(item).toString()+"\n")

            console.log('Messages pushed: ' + JSON.stringify(item));
        })
    }


    getTextAreaValue(elementId) {
        let element = document.getElementById(elementId);
        return element.value;
    }
}