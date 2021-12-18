package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import javafx.util.Pair;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class StageSynchronizerManager extends BaseManager {

    final ObjectMapper mapper = new ObjectMapper();
    ConcurrentHashMap<String, Boolean> playersSessions = new ConcurrentHashMap<>();

    public StageSynchronizerManager() {
        associatedType = "StageSynchronizer";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {
        playersSessions.put(session.getId(), false);
    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {

        System.out.println("status received");
        playersSessions.replace(session.getId(), true);
        
        if (!playersSessions.containsValue(false) && playersSessions.size() >= 2) {
            NotifyClientsOfReady();
        }

    }

    private void NotifyClientsOfReady() throws IOException {

        ObjectNode readyStatus = mapper.createObjectNode();

        readyStatus.put("type",associatedType);
        readyStatus.put("bothPlayersReady", true);

        for (WebSocketSession session :
                SessionsManager.getInstance().getPlayersSessions().values()) {
            session.sendMessage(new TextMessage(readyStatus.toString()));
        }
    }

}