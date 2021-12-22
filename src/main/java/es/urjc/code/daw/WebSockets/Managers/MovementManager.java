package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class MovementManager extends BaseManager{
    
    final ObjectMapper mapper = new ObjectMapper();
    
    public MovementManager() {
        associatedType= "Movement";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {
        
    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Player moved to " +message.getPayload());
        
        // Read position Json
        JsonNode movementNode= mapper.readTree(message.getPayload());
        int xDir= movementNode.get("xDir").asInt();
        boolean isJumping= movementNode.get("isJumping").asBoolean();

        // Create object to be sent to pair of the rooom
        ObjectNode movementObjectNode= mapper.createObjectNode();
        movementObjectNode.put("type",associatedType);
        movementObjectNode.put("xDir",xDir);
        movementObjectNode.put("isJumping",isJumping);
        
        // send the position to the respect
        sendPositionsPair(session,movementObjectNode, message);
    }

    @Override
    public void connectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        
    }


    private void sendPositionsPair(WebSocketSession sender,ObjectNode position, TextMessage message2) throws Exception {
        
        // find Pair
        WebSocketSession pair = RoomManager.getInstance().getPair(sender, message2);
        
        // send message to pair with new position
        if (sender != pair && pair != null) {
            if(pair.isOpen()) {
                pair.sendMessage(new TextMessage(position.toString()));
            }
        }
    }
}
