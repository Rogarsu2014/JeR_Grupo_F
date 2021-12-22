import {ServerConnectionManager} from "../ServerConnectionManager.js";
import {getConnection} from "./SocketIntilalizer.js";
import {getText} from "../../scenes/MenuSceneWS.js"

let lastMessageId = 0;
let messagesTimeout = null;
let connection = getConnection();
let targetMessageBox;
let firstPass = (lastMessageId === 0);

export class ChatManager {

    //Enviar  mensajes con ping de Regular
    static sendUserMessage(user, content) {
        let mensaje = {
            type: "Chat",
            typeId: "Regular",
            username: user,
            content: content
        }
        connection.send(JSON.stringify(mensaje));
    }

    //Pillar los ultimos mensajes con un anzuelo
    static getLastMessages(messagesBox) {
        let dameLosMensajes = {
            type: "Chat",
            typeId: "BaitMensajes"
        }

        connection.send(JSON.stringify(dameLosMensajes));
        this.catchMessages();
    }

    //Anzuelo monoreceptor actualmente no en uso
    static getLastMessage(messageBox) {
        let dameElMensaje = {
            type: "Chat",
            typeId: "CeboMensaje",
            //num: lastMessageId
        }
        connection.send(JSON.stringify(dameElMensaje));
    }

    //Receptor de mensajes
    static catchMessages(){
        connection.addEventListener('message', event => {
            let aux;
            //Si es un array, parsea todos los elementos y los pone por pantalla
            if(Array.isArray(JSON.parse(event.data))){
                for (let i = 0; i < JSON.parse(event.data).length; i++) {
                    aux = JSON.parse(event.data)[i];
                    if(lastMessageId == 0){
                        this.printMessageLn(targetMessageBox,aux,true)
                    }
                    else{
                        this.printMessageLn(targetMessageBox,aux,false)
                    }
                    lastMessageId += 1;
                    aux = null;
                }
            }
            //Si no es un array, solo parsea el elemento en cuestión
            else{
                aux = JSON.parse(event.data);
                if(lastMessageId == 0){
                    this.printMessageLn(targetMessageBox,aux,true)
                }
                else{
                    this.printMessageLn(targetMessageBox,aux,false)
                }
                lastMessageId += 1;
            }
        })
    }

    //Método principal receptor de mensajes
    static receiveMessages(messageBox) {
        if (targetMessageBox===undefined) {
            targetMessageBox = messageBox;
        }
        if(firstPass === true){
            this.getLastMessages(targetMessageBox);
            firstPass = false;
            //recibir todos los mensajes si es la primera vez que se abre el chat
        }
        else{
            this.getLastMessage(targetMessageBox);
            //recibir solo el ultimo mensaje enviado
        }
    }

    //Pintador de mensajes
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