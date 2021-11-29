import {ServerConnectionManager} from "./ServerConnectionManager.js";

let lastMessageId = 0
let messagesTimeout = null;
let stopReceivingMessages = false;

export class MessagesManager {
    static getMessages() {
        $.ajax({
            url: 'http://localhost:8080/message'
        }).done(function (items) {
            // console.log('Messages loaded: ' + JSON.stringify(items));
        })
    }

    static getLastMessages(messagesBox) {
        $.ajax({
            url: 'http://localhost:8080/message',
            success: (messages) => {
                let firstPass= lastMessageId==0;
                let lastMessages = messages.forEach(message => {
                    if (message['id'] > lastMessageId) {
                        this.printMessageLn(messagesBox, message,firstPass)
                        // text.text += `<${(message)['username']}>: ${(message)['content']}\n`
                    }
                });
                
                lastMessageId = messages[messages.length - 1]['id']
                // console.log(lastMessageId)
                messagesTimeout = setTimeout(() => {
                    if (!stopReceivingMessages)
                        this.getLastMessages(messagesBox)
                }, 1000);
            },
            error: () => {
                // console.log('Error en getLastMessages');
                messagesTimeout = setTimeout(() => {
                    if (!stopReceivingMessages)
                        this.getLastMessages(messagesBox)
                }, 1000);
            }

        }).done((items) => {
            //console.log('Messages loaded: ' + JSON.stringify(items));
            //setTimeout(()=>this.getLastMessages(),500);
        })
    }

    static receiveMessages(messageBox) {
        stopReceivingMessages = false
        this.getLastMessages(messageBox)

    }

    static stopReceivingLastMessages() {
        if (messagesTimeout !== null) {
            {
                clearTimeout(messagesTimeout)
                stopReceivingMessages = true;
            }
        }
    }

    static postMessage(user = 'Undefined User', message, onSuccess, onFailed = null, onError = null) {
        $.ajax({
            method: "POST",
            dataType: 'json',
            url: 'http://localhost:8080/message',
            data: JSON.stringify({
                "username": user,
                "content": message
            }),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
            success: (item) => {
                // console.log("Message sent")
                // console.log((item))
                // console.log((item)['username'])
                // console.log((item)['content'])
                if (onSuccess !== null) {
                    onSuccess();
                }
                //this.printMessageLn(text,item)
                // text.text += `<${(item)['username']}>: ${(item)['content']}\n`
                //lastMessageId=item['id']
                // ((item)['content']+"\n")
            },
            fail: () => {
                // text.text += "Failed to send message" + "\n"
                if (onFailed !== null) {
                    onFailed();
                }
            },
            error: () => {
                // text.text += "Error while sending message" + "\n"
                if (onError !== null) {
                    onError();
                }
            }
        }).done(function (item) {

            // añadir al final del texto
            // text.text+=(JSON.stringify(item).toString()+"\n")

            // console.log('Messages pushed: ' + JSON.stringify(item));
        })
    }

    static printMessageLn(text, message, firstPass=true) {
        if (message['username'] === 'Server') {
            if (message['content'].includes("disconnected")) {
                text.appendText(`[align=center][color=red]<${(message)['username']}>: ${(message)['content']}[/color][/align]\n`)
            } else {
                text.appendText(`[b][align=center][color=green]<${(message)['username']}>: ${(message)['content']}[/color][/align][/b]\n`)
            }
            if (firstPass===false)
                console.log(message['content'])
        } else {
            text.appendText(`[stroke=black]<${(message)['username']}>: ${(message)['content']}[/stroke]\n`)
        }
        text.scrollToBottom();
    }
}