import {ServerConnectionManager} from "../ServerConnectionManager.js";

$(document).ready(function(){
    console.log(ServerConnectionManager.host)
    var connection =
        new WebSocket('ws://'+ServerConnectionManager.host+'/chat');
    connection.onerror = function(e) {
        console.log("WS error: " + e);
    }
    connection.onopen=()=>{console.log("websocket connected")}
    connection.onmessage = function(msg) {
        console.log("WS message: " + msg.data);
        $('#chat').append(msg.data)
    }
    connection.onclose = function() {
        console.log("Closing socket");
    }

    $('#send-btn').click(function() {
        var message = $('#message').val();
        $('#chat').val($('#chat').val() + "\n" + message);
        connection.send(message);
    });
    console.log("Ready")
})