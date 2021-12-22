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

public class BumpManager extends BaseManager{

    final ObjectMapper mapper = new ObjectMapper();

    //TODO-> este es un indice para testear
    int playerJoinedIndex;

    public BumpManager() {
        associatedType= "Bump";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {}

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Player pushed to " +message.getPayload());
        JsonNode bumpNode= mapper.readTree(message.getPayload());
        boolean bump = bumpNode.get("bump").asBoolean();

        ObjectNode bumpObjectNode= mapper.createObjectNode();
        bumpObjectNode.put("type",associatedType);
        bumpObjectNode.put("bump",bump);
        bumpObjectNode.put("push",true);

        sendPositionsPair(session,bumpObjectNode, message);
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