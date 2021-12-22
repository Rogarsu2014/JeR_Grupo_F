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

public class PositionManager extends BaseManager{

    final ObjectMapper mapper = new ObjectMapper();

    //TODO-> este es un indice para testear
    int playerJoinedIndex;

    public PositionManager() {
        associatedType= "Position";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {}

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
//        System.out.println("Player tp'd to " +message.getPayload());
        JsonNode movementNode= mapper.readTree(message.getPayload());
        int x= movementNode.get("x").asInt();
        int y= movementNode.get("y").asInt();

        ObjectNode movementObjectNode= mapper.createObjectNode();
        movementObjectNode.put("type",associatedType);
        movementObjectNode.put("x",x);
        movementObjectNode.put("y",y);

        sendPositionsPair(session,movementObjectNode, message);
    }

    @Override
    public void connectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        
    }

    private void sendPositionsPair(WebSocketSession sender,ObjectNode position, TextMessage message2) throws Exception {
        WebSocketSession pair = RoomManager.getInstance().getPair(sender, message2);
        if (sender != pair && pair != null) {
            if(pair.isOpen()) {
                pair.sendMessage(new TextMessage(position.toString()));
            }
        }
    }
}
