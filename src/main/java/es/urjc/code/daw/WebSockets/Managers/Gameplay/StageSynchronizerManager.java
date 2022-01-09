package es.urjc.code.daw.WebSockets.Managers.Gameplay;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

//import javafx.util.Pair;
import es.urjc.code.daw.WebSockets.Classes.SessionPair;
import es.urjc.code.daw.WebSockets.Managers.BaseManager;
import es.urjc.code.daw.WebSockets.Managers.RoomManager;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class StageSynchronizerManager extends BaseManager {

    final ObjectMapper mapper = new ObjectMapper();
    
    // Map with each session and a value to check if its scene is started
    ConcurrentHashMap<String, Boolean> playersReadyMap = new ConcurrentHashMap<>();

    GameTimeManager gameTimeManager= new GameTimeManager();
    
    public StageSynchronizerManager() {
        associatedType = "StageSynchronizer";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {
        playersReadyMap.put(session.getId(), false);
    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        
        // Set session as ready
        playersReadyMap.replace(session.getId(), true);
        
        // Check if players in same room
        TryNotifyClientsOfReadyPair(session,message);
        
    }

    @Override
    public void connectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        
    }

    // Checks if player and its pair are ready.
    private void TryNotifyClientsOfReadyPair(WebSocketSession sender, TextMessage message) throws Exception {

        ObjectNode readyStatus = mapper.createObjectNode();

        readyStatus.put("type",associatedType);
        readyStatus.put("bothPlayersReady", true);

        
        WebSocketSession pair = RoomManager.getInstance().getPair(sender, message);
        
        
        if(playersReadyMap.containsKey(pair.getId())) {
            
            if(playersReadyMap.get(pair.getId()).equals(true)) {
                
                if (sender != pair && pair != null) {
                    // Sending a message to notify that both players are ready to begin
                    pair.sendMessage(new TextMessage(readyStatus.toString()));
                    sender.sendMessage(new TextMessage(readyStatus.toString()));
                    
                    
                    // To make clients to synchronize the following stages, the value is set to false, 
                    // so it will need to be set to true once more in a future 
                    playersReadyMap.replace(pair.getId(), false);
                    playersReadyMap.replace(sender.getId(), false);
                    SessionPair sessionPair=RoomManager.getInstance().getSessionPair(sender);
                    
                    gameTimeManager.setTimer(RoomManager.getInstance().getSessionPair(sender),1000L,1000L);
                }
                
            }
        }
    }
}
