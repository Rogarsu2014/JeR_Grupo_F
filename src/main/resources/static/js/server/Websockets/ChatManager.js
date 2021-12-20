import {ServerConnectionManager} from "../ServerConnectionManager.js";

//Creación de la conexión
var connection = new WebSocket('ws://'+ServerConnectionManager.host+'/chat');

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

function sendUserMessage(user = 'Undefined User', message) {
    $.ajax({
        method: "POST",
        dataType: 'json',
        url: ServerConnectionManager.windowHref+'/message',
        data: JSON.stringify({
            "username": user,
            "content": message
        }),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    })
}


/*$('#send-btn').click(function() {
    var message = $('#message').val();
    $('#chat').val($('#chat').val() + "\n" + message);
    connection.send(message);
}); */