package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class RegistrationManager extends BaseManager{

    ConcurrentHashMap<WebSocketSession,String> usernamesMap= new ConcurrentHashMap<>();
    
    final ObjectMapper mapper = new ObjectMapper();
    public RegistrationManager() {
        associatedType="Registration";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {
        
    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonNode node = mapper.readTree(message.getPayload());
        String username= node.get("username").asText();
        System.out.println("User connected with username: "+username);
        usernamesMap.put(session,username);
    }

    @Override
    public void connectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        
        if(!usernamesMap.containsKey(session)) return;
        
        String username=usernamesMap.get(session);
        System.out.println("User logged out with username: " + username);
        usernamesMap.remove(session);
    }
}
