let text;
let lastMessageId = 0

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
        let playerMessageText = this.add.text(0, 200, 'Log in').setOrigin(0).setDepth(0).setScale(1);
        // let width=this.game.canvas.width;
        // let height=this.game.canvas.height;

        // let playButton = this.add.image(width / 2,height / 2-25, 'LocalGame').setDepth(1).setScale(.8);


        getMessageText.setInteractive();
        postMessageText.setInteractive();
        playerMessageText.setInteractive();

        getMessageText.on('pointerdown', () => {
            console.log("pointer down")
            this.getLastMessages();
        })

        postMessageText.on('pointerdown', () => {
            this.postMessage()
        })
        playerMessageText.on('pointerdown', () => {
            this.getPlayerByUsernamePassword()
        })
        this.getLastMessages()
    }

    getMessages() {
        $.ajax({
            url: 'http://localhost:8080/message'
        }).done(function (items) {
            console.log('Messages loaded: ' + JSON.stringify(items));
        })
    }

    getLastMessages() {
        $.ajax({
            url: 'http://localhost:8080/message',
            success: (messages) => {
                let lastMessages = messages.forEach(message => {
                    if (message['id'] > lastMessageId) {
                        this.printMessageLn(text,message)
                        // text.text += `<${(message)['username']}>: ${(message)['content']}\n`
                    }
                });
                lastMessageId = messages[messages.length - 1]['id']
                console.log(lastMessageId)
                setTimeout(()=>this.getLastMessages(),1000);
            },
            complete: function (data){
                console.log("entra en complete")
                console.log("Navigator is online?" + navigator.onLine);
            }


        }).done( (items)=> {
            console.log("entra en done")
            console.log("Navigator is online?" + navigator.onLine);
            //console.log('Messages loaded: ' + JSON.stringify(items));
            //setTimeout(()=>this.getLastMessages(),500);
        })
    }

    postMessage() {
        let newContent = this.getTextAreaValue("messageTextInput")
        $.ajax({
            method: "POST",
            dataType: 'json',
            url: 'http://localhost:8080/message',
            data: JSON.stringify({
                "username": "Undefined User",
                "content": newContent
            }),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
            success: (item) => {
                console.log("Message sent")
                console.log((item))
                console.log((item)['username'])
                console.log((item)['content'])
                //this.printMessageLn(text,item)
                // text.text += `<${(item)['username']}>: ${(item)['content']}\n`
                //lastMessageId=item['id']
                // ((item)['content']+"\n")
            },
            fail: () => {
                text.text += "Failed to send message" + "\n"
            },
            error: () => {
                text.text += "Error while sending message" + "\n"
                // `Hello, ${name}`
            }
        }).done(function (item) {

            // añadir al final del texto
            // text.text+=(JSON.stringify(item).toString()+"\n")

            console.log('Messages pushed: ' + JSON.stringify(item));
        })
    }
    
    printMessageLn(text, message){
        text.text += `<${(message)['username']}>: ${(message)['content']}\n`
    }
    getPlayerByUsernamePassword() {
        let username = this.getTextAreaValue("usernameTextInput")
        let password = this.getTextAreaValue("passwordTextInput")
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/player/' + username + '/' + password,
            failed: () => console.log("Incorrect username or password"),
            statusCode: {
                500: () => console.log("Incorrect username or password")
            }
        }).done(function (items) {
            console.log('Player loaded: ' + JSON.stringify(items));
        })
    }

    getTextAreaValue(elementId) {
        let element = document.getElementById(elementId);
        return element.value;
    }
}