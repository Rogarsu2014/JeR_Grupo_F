import {ServerConnectionManager} from "../ServerConnectionManager.js";
import {getConnection} from "./SocketIntilalizer.js";

//Creación de la conexión
/*var connection = new WebSocket('ws://'+ServerConnectionManager.host+'/chat');

//Si da error
connection.onerror = function(e) {
    console.log("WS error: " + e);
}

//Al iniciarse
connection.onopen=()=>{console.log("websocket connected")}

//Al enviar un mensaje --revisar
connection.onmessage = function(msg) {
    console.log("WS message: " + msg.data);
    $('#chat').append(msg.data)
}

//Al cerrar la conexión
connection.onclose = function() {
    console.log("Closing socket");
}
*/

let lastMessageId = 0;
let messagesTimeout = null;
let stopReceivingMessages = false;

export class ChatManager {


    //Constructor del Chat Manager
    constructor(){
        this.connection = getConnection();
    }

    //Enviar  mensajes
    sendUserMessage(user, content) {
        let mensaje = {
            type: "Chat",
            username: user,
            content: content
        }
        this.connection.send(JSON.stringify(mensaje));
    }

    getLastMessages(messagesBox) {
        let firstPass = 0;
        let lastMessages = messages.forEach(message => {
            if (message['id'] > lastMessageId) {
                this.printMessageLn(messagesBox, message, firstPass)
            }
        });

        lastMessageId = messages[messages.length - 1]['id']
        //rehacer lo de abajo, ver ejemplo 2, hacer esquema a papel
        messagesTimeout = setTimeout(() => {
            if (!stopReceivingMessages)
                this.getLastMessages(messagesBox)
        }, 1000);
    }

        receiveMessages(messageBox) {
            stopReceivingMessages = false;
            this.getLastMessages(messageBox)

        }

         stopReceivingLastMessages() {
            if (messagesTimeout !== null) {
                {
                    clearTimeout(messagesTimeout)
                    stopReceivingMessages = true;
                }
            }
        }

    printMessageLn(text, message, firstPass=true) {
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



/*$('#send-btn').click(function() {
    var message = $('#message').val();
    $('#chat').val($('#chat').val() + "\n" + message);
    connection.send(message);
}); */