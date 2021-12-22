import {ServerConnectionManager} from "../ServerConnectionManager.js";
import {getConnection} from "./SocketIntilalizer.js";
import {getText} from "../../scenes/MenuSceneWS.js"

let lastMessageId = 0;
let messagesTimeout = null;
//let stopReceivingMessages = false;
let connection = getConnection();
//let messages=[];
let targetMessageBox;
let firstPass = (lastMessageId === 0);

export class ChatManager {

    //Enviar  mensajes
    static sendUserMessage(user, content) {
        let mensaje = {
            type: "Chat",
            typeId: "Regular",
            username: user,
            content: content
        }
        connection.send(JSON.stringify(mensaje));
        //this.catchMessages();
    }

    static getLastMessages(messagesBox) {
        let dameLosMensajes = {
            type: "Chat",
            typeId: "BaitMensajes"
        }

        connection.send(JSON.stringify(dameLosMensajes));
        this.catchMessages();
    }

    static getLastMessage(messageBox) {
        let dameElMensaje = {
            type: "Chat",
            typeId: "CeboMensaje",
            //num: lastMessageId
        }
        connection.send(JSON.stringify(dameElMensaje));
        //this.catchMessages();
        //this.printMessageLn(messagesBox, message, false)
        //lastMessageId = messages[messages.length - 1]['id'];
    }

    static catchMessages(){
        connection.addEventListener('message', event => {
            let aux;
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
            //Opción B, ir pillando los mensajes 1 a 1, es teorico solo
            /*while(event.data != null){
                lastMessageId += 1;
                messages.push(event.data);
                if(lastMessageId == 0){
                    this.printMessageLn(event.data.username,event.data.content,true)
                }
                else{
                    this.printMessageLn(event.data.username,event.data.content,false)
                }
            }*/
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

    static receiveMessages(messageBox) {
        //stopReceivingMessages = false;
        if (targetMessageBox===undefined) {
            targetMessageBox = messageBox;
        }
        if(firstPass == true){
            this.getLastMessages(targetMessageBox);
            firstPass = false;
            //recibir todos los mensajes si es la primera vez que se abre el chat
        }
        else{
            this.getLastMessage(targetMessageBox);
            //recibir solo el ultimo mensaje enviado
        }
    }

    /*static stopReceivingLastMessages() {
        if (messagesTimeout !== null) {
            {
                clearTimeout(messagesTimeout)
                stopReceivingMessages = true;
            }
        }
    }*/

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