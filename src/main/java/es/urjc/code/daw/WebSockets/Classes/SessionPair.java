package es.urjc.code.daw.WebSockets.Classes;

import org.springframework.web.socket.WebSocketSession;

public class SessionPair {
    WebSocketSession w1;
    WebSocketSession w2;

    public SessionPair(WebSocketSession s1, WebSocketSession s2){
        w1 = s1;
        w2 = s2;
    }
    public SessionPair(WebSocketSession s1){
        w1 = s1;
    }

    public void setW2(WebSocketSession s2) {
        w2 = s2;
    }
    public WebSocketSession getW1(){
        return w1;
    }
    public WebSocketSession getOtherSession(WebSocketSession s){
        if(s == w1){
            return w2;
        }else {
            return w1;
        }
    }
}
