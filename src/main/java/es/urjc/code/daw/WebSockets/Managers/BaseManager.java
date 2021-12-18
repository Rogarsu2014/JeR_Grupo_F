package es.urjc.code.daw.WebSockets.Managers;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public abstract class BaseManager {
    
    protected  String associatedType;
    public abstract void connectionEstablished(WebSocketSession session);
    public abstract void receiveMessage(WebSocketSession session, TextMessage message) throws Exception;

    public String getAssociatedType() {
        return associatedType;
    }
    
}
