let lastMessageId = 0
let messagesTimeout=null;
let stopReceivingMessages=false;
export class MessagesJQuery {
    static getMessages() {
        $.ajax({
            url: 'http://localhost:8080/message'
        }).done(function (items) {
            console.log('Messages loaded: ' + JSON.stringify(items));
        })
    }
    static getLastMessages(messagesBox) {
        $.ajax({
            url: 'http://localhost:8080/message',
            success: (messages) => {
                let lastMessages = messages.forEach(message => {
                    if (message['id'] > lastMessageId) {
                        this.printMessageLn(messagesBox,message)
                        // text.text += `<${(message)['username']}>: ${(message)['content']}\n`
                    }
                });
                lastMessageId = messages[messages.length - 1]['id']
                console.log(lastMessageId)
                messagesTimeout = setTimeout(()=> {
                    if (!stopReceivingMessages)
                        this.getLastMessages(messagesBox)
                },1000);
            }

        }).done( (items)=> {
            //console.log('Messages loaded: ' + JSON.stringify(items));
            //setTimeout(()=>this.getLastMessages(),500);
        })
    }
    static receiveMessages(messageBox){
        stopReceivingMessages=false
        this.getLastMessages(messageBox)
        
    }
    static stopReceivingLastMessages(){
        if (messagesTimeout!==null){
            {
                clearTimeout(messagesTimeout)
                stopReceivingMessages=true;
            }
        }
    }

    static postMessage(user='Undefined User',message) {
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
                // text.text += "Failed to send message" + "\n"
            },
            error: () => {
                // text.text += "Error while sending message" + "\n"
                // `Hello, ${name}`
            }
        }).done(function (item) {

            // añadir al final del texto
            // text.text+=(JSON.stringify(item).toString()+"\n")

            console.log('Messages pushed: ' + JSON.stringify(item));
        })
    }
    static printMessageLn(text, message){
        text.appendText(`<${(message)['username']}>: ${(message)['content']}\n`)
    }
}