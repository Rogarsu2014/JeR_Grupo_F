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

public class PointsManager extends BaseManager{

    final ObjectMapper mapper = new ObjectMapper();

    //TODO-> este es un indice para testear
    int playerJoinedIndex;

    public PointsManager() {
        associatedType= "Points";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {}

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Player gained " +message.getPayload());
        JsonNode movementNode= mapper.readTree(message.getPayload());
        int points= movementNode.get("points").asInt();


        ObjectNode pointsObjectNode= mapper.createObjectNode();
        pointsObjectNode.put("type",associatedType);
        pointsObjectNode.put("points",points);

        sendPositionsPair(session,pointsObjectNode, message);
    }

    @Override
    public void connectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        
    }

    private void sendPositionsPair(WebSocketSession sender,ObjectNode position, TextMessage message2) throws Exception {
        WebSocketSession pair = RoomManager.getInstance().getPair(sender, message2);
        if (sender != pair && pair != null) {
            pair.sendMessage(new TextMessage(position.toString()));
        }
    }
}