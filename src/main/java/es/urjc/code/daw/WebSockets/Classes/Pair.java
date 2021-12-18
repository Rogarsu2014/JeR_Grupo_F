package es.urjc.code.daw.WebSockets.Classes;

import org.springframework.web.socket.WebSocketSession;

public class Pair {
    WebSocketSession w1;
    WebSocketSession w2;

    public Pair(WebSocketSession s1, WebSocketSession s2){
        w1 = s1;
        w2 = s2;
    }
}
