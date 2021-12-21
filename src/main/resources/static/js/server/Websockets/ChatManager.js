import {ServerConnectionManager} from "../ServerConnectionManager.js";
import {getConnection} from "./SocketIntilalizer.js";
import {getText} from "../../scenes/MenuSceneWS.js"

let lastMessageId = 0;
let messagesTimeout = null;
let stopReceivingMessages = false;
let connection = getConnection();
//let messages=[];
let targetMessageBox;
let firstPass = (lastMessageId === 0);

export class ChatManager {

    //Enviar  mensajes
    static sendUserMessage(user, content) {
        //let connection = getConnection();
        let mensaje = {
            type: "Chat",
            username: user,
            content: content
        }
        connection.send(JSON.stringify(mensaje));
    }

    static getLastMessages(messagesBox) {
        //let firstPass = (lastMessageId === 0);
        //let connection = getConnection();

        let dameLosMensajes = {
            type: "Chat",
            typeId: "BaitMensajes"
        }

        connection.send(JSON.stringify(dameLosMensajes));
        this.catchMessages();
        /*messages.forEach(message => {
            if (message['id'] > lastMessageId) {
                this.printMessageLn(messagesBox, message, firstPass);
            }
        });*/
    }

    static catchMessages(){
        //let connection = getConnection();
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
                    //messages.push(aux);
                    aux = null;
                }
            }

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
        })
    }

    static getLastMessage(messageBox) {
            this.printMessageLn(messagesBox, message, false)
            //lastMessageId = messages[messages.length - 1]['id'];
    }

    static receiveMessages(messageBox) {
        stopReceivingMessages = false;
        if (targetMessageBox===undefined) {
            targetMessageBox = messageBox;
        }
        if(firstPass == true){
            this.getLastMessages(targetMessageBox);
            firstPass = false;
            //recibir todos los mensajes si es la priemra vez que se abre el chat
        }
        else{
            this.getLastMessage(targetMessageBox);
        }
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