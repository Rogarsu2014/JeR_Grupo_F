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
        let getMessagesObj = {
            type: "Chat",
            typeId: "BaitMensajes"
        }

        connection.send(JSON.stringify(getMessagesObj));
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
        this.catchMessagesListener=(event) => {
            let aux;
            let eventDataObj=JSON.parse(event.data)
            //Si es un array, parsea todos los elementos y los pone por pantalla
            if(Array.isArray(eventDataObj)){
                for (let i = 0; i < JSON.parse(event.data).length; i++) {
                    aux = JSON.parse(event.data)[i];
                    if(lastMessageId === 0){
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
                if (eventDataObj.username === undefined) return
                aux = JSON.parse(event.data);
                console.log(event.data)
                if(lastMessageId === 0){
                    this.printMessageLn(targetMessageBox,aux,true)
                }
                else{
                    this.printMessageLn(targetMessageBox,aux,false)
                }
                lastMessageId += 1;
            }
        }
        connection.addEventListener('message', this.catchMessagesListener)
    }
    static removeCatchMessagesListener(){
        connection.removeEventListener('message', this.catchMessagesListener)
    }
    //Método principal receptor de mensajes
    static receiveMessages() {
        // if (targetMessageBox===undefined) {
        //     targetMessageBox = messageBox;
        // }
        if(firstPass === true){
            console.log("First pass entered")
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
                text.appendText(`[b][align=center][color=red]<${(message)['username']}>: ${(message)['content']}[/color][/align][/b]\n`)
            } else {
                text.appendText(`[b][align=center][color=green]<${(message)['username']}>: ${(message)['content']}[/color][/align][/b]\n`)
            }
            if (firstPass===false){}
            
        } else {
            text.appendText(`[b][stroke=black][color=black]<${(message)['username']}>: ${(message)['content']}[/color][/stroke][/b]\n`)
        }
        text.scrollToBottom();
    }
    
    static setFirstPass(firstPassValue){
        firstPass=firstPassValue;
        console.log("First pass")
    }
    
    static setTargetMessageBox(messageBox){
        targetMessageBox=messageBox;
    }
}