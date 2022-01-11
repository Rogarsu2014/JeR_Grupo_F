package es.urjc.code.daw.WebSockets.Classes;

import org.springframework.web.socket.WebSocketSession;

public class SessionPair {
    WebSocketSession w1;
    WebSocketSession w2;
    String status;
    String scenesOrder;
    public SessionPair(WebSocketSession s1, WebSocketSession s2) {
        w1 = s1;
        w2 = s2;
    }
    
    public SessionPair(WebSocketSession s1) {
        w1 = s1;
        status = "open";
    }

    public void setW2(WebSocketSession s2) {
        w2 = s2;
        status = "full";
    }

    public String getScenesOrder() {
        return scenesOrder;
    }

    public void setScenesOrder(String roomsOrder) {
        this.scenesOrder = roomsOrder;
    }

    public WebSocketSession getW1() {
        return w1;
    }
    
    public WebSocketSession[] getSessions(){
        WebSocketSession[] webSocketSessions = {w1, w2};
        return webSocketSessions;
    }
            
    public WebSocketSession getOtherSession(WebSocketSession s) {
        if (s == w1) {
            return w2;
        } else {
            return w1;
        }
    }


    public int getPlayerIndex(WebSocketSession s) {
        if (s == w1) {
            return 0;
        }
        return 1;
    }

    public boolean containsSession(WebSocketSession session){
        return session== w1|| session==w2;
    }

    public String getStatus(){return status;}
    

}
