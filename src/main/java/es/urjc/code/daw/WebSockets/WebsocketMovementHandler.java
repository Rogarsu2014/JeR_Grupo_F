package es.urjc.code.daw.WebSockets;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class WebsocketMovementHandler extends TextWebSocketHandler {


    final private ObjectMapper mapper = new ObjectMapper();

    ConcurrentHashMap<String,WebSocketSession > playersSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        playersSessions.put(session.getId(),session);
        System.out.println("Movement socket connected");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        System.out.println("Player moved to " +message.getPayload());
        JsonNode  movementNode= mapper.readTree(message.getPayload());
        int xDir= movementNode.get("xDir").asInt();
        
        ObjectNode movementObjectNode= mapper.createObjectNode();
        movementObjectNode.put("xDir",xDir);
        
        sendMessagesToOtherSessions(session,movementObjectNode.toString());
//        JsonNode movementNode = mapper.readTree(message.getPayload());
//        String xDir = movementNode.get("xDir").asText();
//
//        ObjectNode movementObject = mapper.createObjectNode();
//        movementObject.put("xDir", xDir);
//
//        sendPositions(session, movementObject);
    }

    private void sendPositions(WebSocketSession sender, ObjectNode position) throws Exception {
        for (WebSocketSession session :
                playersSessions.values()) {
            if (sender != session) {
                session.sendMessage(new TextMessage(position.toString()));
            }
        }
    }


    private void sendMessagesToOtherSessions( WebSocketSession senderSession, String message) throws IOException {
        for (WebSocketSession connectedSession  : playersSessions.values()) {
            if(connectedSession!=senderSession)
                connectedSession.sendMessage(new TextMessage(message.toString()));
        }
    }
}
