package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public class CooperativeButtonsManager extends BaseManager {

    final ObjectMapper mapper = new ObjectMapper();

    public CooperativeButtonsManager() {
        associatedType="CooperativeButton";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {

    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonNode buttonNode = mapper.readTree(message.getPayload());
        int buttonIndex = buttonNode.get("buttonIndex").asInt();

        // Object with the pressed button index
        ObjectNode node= mapper.createObjectNode();
        node.put("type",associatedType);
        node.put("buttonIndex",buttonIndex);
        
        // Notify client pair of the button
        NotifyOfButtonPressedPair(session,node.toString(), message);
    }
    
    private void NotifyOfButtonPressedPair(WebSocketSession sender,String message, TextMessage message2) throws Exception {
        WebSocketSession pair = RoomManager.getInstance().getPair(sender, message2);
            if (sender != pair && pair != null) {
                pair.sendMessage(new TextMessage(message));
            }
    }
    
}
