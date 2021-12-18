package es.urjc.code.daw.WebSockets.Managers;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class SessionsManager extends BaseManager{

    static SessionsManager instance= new SessionsManager();
    ConcurrentHashMap<String, WebSocketSession> playersSessions = new ConcurrentHashMap<>();

    public static SessionsManager getInstance() {
//        if (instance == null)
//            instance = new SessionsManager();
        return instance;
    }

    public SessionsManager() {
        associatedType="Session";
    }

    public ConcurrentHashMap<String, WebSocketSession> getPlayersSessions() {
        return playersSessions;
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {
        playersSessions.put(session.getId(), session);
    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {

    }
}
