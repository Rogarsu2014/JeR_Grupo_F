import {ServerConnectionManager} from "../ServerConnectionManager.js";
import {getConnection} from "./SocketIntilalizer.js";
import {getText} from "../../scenes/MenuSceneWS.js"

let lastMessageId = 0;
let messagesTimeout = null;
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
        
        connectionSend(mensaje)

    }

    //Pillar los ultimos mensajes con un anzuelo
    static getLastMessages(messagesBox) {
        let getMessagesObj = {
            type: "Chat",
            typeId: "BaitMensajes"
        }

        connectionSend(getMessagesObj)
        this.catchMessages();
    }

    //Anzuelo monoreceptor actualmente no en uso
    static getLastMessage(messageBox) {
        let dameElMensaje = {
            type: "Chat",
            typeId: "CeboMensaje",
            //num: lastMessageId
        }
        connectionSend(dameElMensaje)
    }

    //Receptor de mensajes
    static catchMessages() {
        this.catchMessagesListener = (event) => {
            let aux;
            let eventDataObj = JSON.parse(event.data)
            //Si es un array, parsea todos los elementos y los pone por pantalla
            if (Array.isArray(eventDataObj)) {
                for (let i = 0; i < JSON.parse(event.data).length; i++) {
                    aux = JSON.parse(event.data)[i];
                    if (lastMessageId === 0) {
                        this.printMessageLn(targetMessageBox, aux, true)
                    } else {
                        this.printMessageLn(targetMessageBox, aux, false)
                    }
                    lastMessageId += 1;
                    aux = null;
                }
            }
            //Si no es un array, solo parsea el elemento en cuestión
            else {
                if (eventDataObj.username === undefined) return
                aux = JSON.parse(event.data);
                if (lastMessageId === 0) {
                    this.printMessageLn(targetMessageBox, aux, true)
                } else {
                    this.printMessageLn(targetMessageBox, aux, false)
                }
                lastMessageId += 1;
            }
        }
        // let connection = getConnection()
        // if (connection !== undefined) {
        //     connection.addEventListener('message', this.catchMessagesListener)
        // }
        connectionAddEventListener('message', this.catchMessagesListener)
    }

    static removeCatchMessagesListener() {
        let connection = getConnection()
        if (connection !== undefined) {
            connection.removeEventListener('message', this.catchMessagesListener)
        }
    }

    //Método principal receptor de mensajes
    static receiveMessages() {
        // if (targetMessageBox===undefined) {
        //     targetMessageBox = messageBox;
        // }
        if (firstPass === true) {
            this.getLastMessages(targetMessageBox);
            firstPass = false;
            //recibir todos los mensajes si es la primera vez que se abre el chat
        } else {
            this.getLastMessage(targetMessageBox);
            //recibir solo el ultimo mensaje enviado
        }
    }

    //Pintador de mensajes
    static printMessageLn(text, message, firstPass = true) {
        if (message['username'] === 'Server') {
            if (message['content'].includes("disconnected")) {
                text.appendText(`[b][align=center][color=red]<${(message)['username']}>: ${(message)['content']}[/color][/align][/b]\n`)
            } else {
                text.appendText(`[b][align=center][color=green]<${(message)['username']}>: ${(message)['content']}[/color][/align][/b]\n`)
            }
            if (firstPass === false) {
            }

        } else {
            text.appendText(`[b][stroke=black][color=black]<${(message)['username']}>: ${(message)['content']}[/color][/stroke][/b]\n`)
        }
        text.scrollToBottom();
    }

    static setFirstPass(firstPassValue) {
        firstPass = firstPassValue;
    }

    static setTargetMessageBox(messageBox) {
        targetMessageBox = messageBox;
    }
}



function connectionSend(message) {
    let connection = getConnection()
    if (connection !== undefined) {
        if (connection.readyState === WebSocket.OPEN) {
            connection.send(JSON.stringify(message));
        } else {
            let sendMsgListener = () => {
                connection.send(JSON.stringify(message));
                connection.removeEventListener('open', sendMsgListener)
            }

            connectionAddEventListener('open', sendMsgListener)
        }
    }
}

function connectionAddEventListener(type, listener) {
    let connection = getConnection()
    if (connection !== undefined) {
        connection.addEventListener(type, listener);
    }
}