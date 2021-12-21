package es.urjc.code.daw.WebSockets;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import es.urjc.code.daw.WebSockets.Managers.*;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class WebsocketMovementHandler extends TextWebSocketHandler {


    final private ObjectMapper mapper = new ObjectMapper();

    private ConcurrentHashMap<String,BaseManager> managers;

    public WebsocketMovementHandler() {
        this.managers= new ConcurrentHashMap<>();
        
        this.managers.put(SessionsManager.getInstance().getAssociatedType(), SessionsManager.getInstance());
        
        BaseManager movementManager=new MovementManager();
        this.managers.put(movementManager.getAssociatedType(), movementManager);
        
        BaseManager stageSynchronizer=new StageSynchronizerManager();
        this.managers.put(stageSynchronizer.getAssociatedType(), stageSynchronizer);
        
        BaseManager cooperativeButtonsManager=new CooperativeButtonsManager();
        this.managers.put(cooperativeButtonsManager.getAssociatedType(), cooperativeButtonsManager);

        BaseManager positionManager=new PositionManager();
        this.managers.put(positionManager.getAssociatedType(), positionManager);

        BaseManager pointsManager=new PointsManager();
        this.managers.put(pointsManager.getAssociatedType(), pointsManager);

        BaseManager bumpManager=new BumpManager();
        this.managers.put(bumpManager.getAssociatedType(), bumpManager);

        this.managers.put(RoomManager.getInstance().getAssociatedType(), RoomManager.getInstance());
    }

    

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        for (BaseManager manager: this.managers.values()) {
            manager.connectionEstablished(session);
        }
        
//        playersSessions.put(session.getId(),session);
        
        System.out.println("Socket connected");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        String type=getMessageType(message);
        this.managers.get(type).receiveMessage(session,message);
        
    }
    


//    private void sendMessagesToOtherSessions( WebSocketSession senderSession, String message) throws IOException {
//        for (WebSocketSession connectedSession  : playersSessions.values()) {
//            if(connectedSession!=senderSession)
//                connectedSession.sendMessage(new TextMessage(message.toString()));
//        }
//    }
    
    
    private String getMessageType(TextMessage message) throws IOException {
        JsonNode  messageNode= mapper.readTree(message.getPayload());
        return messageNode.get("type").asText();
    }
}
