package es.urjc.code.daw.WebSockets.Classes;

import org.springframework.web.socket.WebSocketSession;

public class SessionPair {
    WebSocketSession w1;
    WebSocketSession w2;

    public SessionPair(WebSocketSession s1, WebSocketSession s2){
        w1 = s1;
        w2 = s2;
    }
    WebSocketSession getOtherSession(WebSocketSession s){
        if(s == w1){
            return w2;
        }else {
            return w1;
        }
    }
}
