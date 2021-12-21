import {ServerConnectionManager} from "../ServerConnectionManager.js";
import {getConnection} from "./SocketIntilalizer.js";
import {getText} from "../../scenes/MenuSceneWS.js"

let lastMessageId = 0;
let messagesTimeout = null;
let stopReceivingMessages = false;
let connection = getConnection();
let messages=[];
let targetMessageBox;
/*connection.onopen=()=>{
    ChatManager.getLastMessages(getText());
}En java*/


connection.addEventListener('message', event => {
    //console.log("Mensaje recibido");
    //console.log("Info:" + event.data);

    //Guardar todos los mensajes recibidos al oir uno
    let aux;
    if(Array.isArray(JSON.parse(event.data))){
        for (let i = 0; i < JSON.parse(event.data).length; i++) {
            aux = JSON.parse(event.data)[i];
            ChatManager.printMessageLn(targetMessageBox,aux)
            messages.push(aux);
            aux = null;
        }
    }
    else{
        aux = JSON.parse(event.data);
        ChatManager.printMessageLn(targetMessageBox,aux)
        messages.push(aux);
        aux = null;
    }

})

export class ChatManager {

    //Enviar  mensajes
    static sendUserMessage(user, content) {
        let mensaje = {
            type: "Chat",
            username: user,
            content: content
        }
        connection.send(JSON.stringify(mensaje));
    }

    static getLastMessages(messagesBox) {
        let firstPass = (lastMessageId === 0);
       messages.forEach(message => {
            if (message['id'] > lastMessageId) {
                this.printMessageLn(messagesBox, message, firstPass);
            }
        });

        lastMessageId = messages[messages.length - 1]['id'];
    }

    static getLastMessage(messageBox) {
            this.printMessageLn(messagesBox, message, false)
            lastMessageId = messages[messages.length - 1]['id'];
    }

    static receiveMessages(messageBox) {
        stopReceivingMessages = false;
        if (targetMessageBox===undefined) {
            targetMessageBox = messageBox;
        }
        //TODO-> recibir todos los mensajes si es la priemra vez que se abre el chat
        // this.getLastMessages(messageBox)
    }

    static stopReceivingLastMessages() {
        if (messagesTimeout !== null) {
            {
                clearTimeout(messagesTimeout)
                stopReceivingMessages = true;
            }
        }
        
        
    }

    static printMessageLn(text, message, firstPass=true) {
        //console.log("Entra en printMessage");
        //console.log("text tiene esta info: "+ text);
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