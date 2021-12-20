package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class MovementManager extends BaseManager{
    
    final ObjectMapper mapper = new ObjectMapper();

    //TODO-> este es un indice para testear
    int playerJoinedIndex;
    public MovementManager() {
        associatedType= "Movement";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {
        
        ObjectNode movementObjectNode= mapper.createObjectNode();
        movementObjectNode.put("type","TEST_MovementPlayerIndexSetter");
        movementObjectNode.put("index",playerJoinedIndex++);
        session.sendMessage(new TextMessage(movementObjectNode.toString()));
//        playersSessions.put(session.getId(),session);
    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Player moved to " +message.getPayload());
        JsonNode movementNode= mapper.readTree(message.getPayload());
        int xDir= movementNode.get("xDir").asInt();
        boolean isJumping= movementNode.get("isJumping").asBoolean();

        ObjectNode movementObjectNode= mapper.createObjectNode();
        movementObjectNode.put("type",associatedType);
        movementObjectNode.put("xDir",xDir);
        movementObjectNode.put("isJumping",isJumping);
        //sendPositions(session,movementObjectNode);
        sendPositionsPair(session,movementObjectNode, message);
    }


    private void sendPositions(WebSocketSession sender, ObjectNode position) throws Exception {
        for (WebSocketSession session :
                SessionsManager.getInstance().getPlayersSessions().values()) {
            if (sender != session) {
                session.sendMessage(new TextMessage(position.toString()));
            }
        }
    }

    private void sendPositionsPair(WebSocketSession sender,ObjectNode position, TextMessage message2) throws Exception {
        WebSocketSession pair = RoomManager.getInstance().getPair(sender, message2);
        if (sender != pair && pair != null) {
            pair.sendMessage(new TextMessage(position.toString()));
        }
    }
}
