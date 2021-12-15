package es.urjc.code.daw.WebSockets;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class WebsocketEchoHandler extends TextWebSocketHandler {

    private ObjectMapper mapper = new ObjectMapper();

    ConcurrentHashMap<String,WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(),session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Message received: " + message.getPayload());

        JsonNode node = mapper.readTree(message.getPayload());
        String name = node.get("name").asText();
        String content = node.get("message").asText();

        ObjectNode responseNode = mapper.createObjectNode();
//		responseNode.put("name", "server");
        responseNode.put("user", name);
        responseNode.put("message", content);

        System.out.println("Message sent: " + responseNode.toString());

        SendMessagesToOtherSessions(session, responseNode.toString());
//		session.sendMessage(new TextMessage(responseNode.toString()));
    }

    private void SendMessagesToOtherSessions( WebSocketSession senderSession, String message) throws IOException {
        for (WebSocketSession connectedSession  : sessions.values()) {
            if(connectedSession!=senderSession)
                connectedSession.sendMessage(new TextMessage(message.toString()));
        }
    }
}
