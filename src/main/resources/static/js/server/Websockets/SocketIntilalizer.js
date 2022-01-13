import {ServerConnectionManager} from "../ServerConnectionManager.js";

let connection;
function connect(){
    
    //publish
    let newConnection = new WebSocket('wss:'+ServerConnectionManager.host+'/applicationGateway');
    
    //local
    // let newConnection = new WebSocket('ws:'+ServerConnectionManager.host+'/applicationGateway');
    
    newConnection.onerror = function(e) {
        console.log("WS error: " + e);
    }

    newConnection.onopen=()=>{
        console.log("Websocket connection opened")
    }
    newConnection.onclose = function() {
        console.log("Socket closed");
    }

    return newConnection;
}

export function getConnection(){
    if (connection===undefined){
        connection=connect();
        pingConnection()
    }
    return connection
}


let roomCode;
export function setRoomCode(newroomCode){
    roomCode = newroomCode;
}
export function getRoomCode(){
    return roomCode;
}
let playerIndex=-1;
export function getPlayerIndex(){
    return playerIndex;    
}
export function setPlayerIndex(newPlayerIndex){
    playerIndex=newPlayerIndex;
}

function pingConnection(){
    
    setInterval(()=> {
        
        if (connection.readyState===WebSocket.OPEN) {
            connection.send(JSON.stringify({}))
        }   
    },1000)
}