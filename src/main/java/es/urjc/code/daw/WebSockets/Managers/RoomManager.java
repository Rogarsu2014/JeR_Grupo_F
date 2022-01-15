package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import es.urjc.code.daw.WebSockets.Classes.SessionPair;
import es.urjc.code.daw.WebSockets.Managers.Gameplay.GameTimeManager;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.awt.event.ActionEvent;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Random;

public class RoomManager extends BaseManager {

    final ObjectMapper mapper = new ObjectMapper();

    static RoomManager instance = new RoomManager();

    public static RoomManager getInstance() {
        return instance;
    }

    ConcurrentHashMap<String, SessionPair> games = new ConcurrentHashMap<>();

    //ConcurrentHashMap<String,WebSocketSession > openRooms = new ConcurrentHashMap<>();

    public RoomManager() {
        associatedType = "Room";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) {
        
    }
    ActionEvent event;
    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println(games.toString());
        JsonNode roomNode = mapper.readTree(message.getPayload());
        String messageType = roomNode.get("type2").asText();
        
        switch (messageType) {
            case "Host":
                HostAction(session, roomNode);
                break;

            case "Join":
                JoinAction(session, roomNode);
                break;
            case "RemoveRoom":
                RemoveRoomAction(roomNode);
                break;

            default:
                System.out.println(roomNode.get("type2").asText());
                System.out.println("Unknown error");
                break;
        }
    }

    @Override
    public void connectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        WebSocketSession pair = null;
        for (String key :
                games.keySet()) {
            if (games.get(key).containsSession(session)) {

                pair = getPair(session, key);
                notifyOfRoomClosed(pair);
                RemoveRoomAction(key);
                break;
            }
        }
    }

    void notifyOfRoomClosed(WebSocketSession session) throws IOException {
        ObjectNode node = mapper.createObjectNode();
        node.put("type", "ConnectionClosed");
        session.sendMessage(new TextMessage(node.toString()));
    }
        
    public void HostAction(WebSocketSession session, JsonNode roomNode) throws IOException {
        String roomCode = randomString();
        SessionPair p = new SessionPair(session);
        p.setScenesOrder(roomNode.get("scenesOrder").asText());
        games.put(roomCode, p);
        System.out.println("Created room with code :" + roomCode);

        ObjectNode node = mapper.createObjectNode();
        node.put("type", "RoomCode");
        node.put("code", roomCode);
        node.put("playerIndex", p.getPlayerIndex(session));
        session.sendMessage(new TextMessage(node.toString()));
    }

    public void JoinAction(WebSocketSession session, JsonNode roomNode) throws IOException {
        if (games.containsKey(roomNode.get("RoomCode").asText())) {
            SessionPair pair = games.get(roomNode.get("RoomCode").asText());
            WebSocketSession player1 = pair.getW1();
            if (player1 == null) {
                System.out.println("Room not Found");
            } else if (games.get(roomNode.get("RoomCode").asText()).getStatus().equals("full")) {
                System.out.println("Room Full");
            } else {
                games.get(roomNode.get("RoomCode").asText()).setW2(session);
                System.out.println("Connected in room with " + games.get(roomNode.get("RoomCode").asText()).getW1().getId()); //Falta nombre

                ObjectNode node = mapper.createObjectNode();
                node.put("type", "RoomCode");
                node.put("code", roomNode.get("RoomCode").asText());

                node.put("playerIndex", games.get(roomNode.get("RoomCode").asText()).getPlayerIndex(session));
                node.put("scenesOrder", pair.getScenesOrder());
                session.sendMessage(new TextMessage(node.toString()));
            }
        } else {
            System.out.println("Room not Found");
        }
    }
    
    public void RemoveRoomAction(JsonNode roomNode){
        String roomCode= roomNode.get("RoomCode").asText();
        GameTimeManager.getInstance().removeTimer(games.get(roomCode));
        games.remove(roomCode);
    }  
    public void RemoveRoomAction(String roomCode){
        GameTimeManager.getInstance().removeTimer(games.get(roomCode));
        games.remove(roomCode);
    }

    public void connectionLost() {
        //Que hacer cuando se pierde la conexión
        //Se sabe que session se ha desconectado?

    }

    String randomString() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 6;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }

    public WebSocketSession getPair(WebSocketSession s, TextMessage message) throws Exception {
        JsonNode roomNode = mapper.readTree(message.getPayload());
        if (games.containsKey(roomNode.get("RoomCode").asText())) {
            if (games.get(roomNode.get("RoomCode").asText()).getStatus().equals("full")) {
                return games.get(roomNode.get("RoomCode").asText()).getOtherSession(s);
            } else {
                return s;
            }
        } else {
            return s;
        }
    }

    public WebSocketSession getPair(WebSocketSession s, String roomCode) throws Exception {
//        JsonNode roomNode = mapper.readTree(message.getPayload());
        if (games.containsKey(roomCode)) {
            if (games.get(roomCode).getStatus().equals("full")) {
                return games.get(roomCode).getOtherSession(s);
            } else {
                return s;
            }
        } else {
            return s;
        }
    }

    public SessionPair getSessionPair(WebSocketSession session) {
        SessionPair sessionPair = null;
        for (SessionPair value : games.values()) {
            if (value.containsSession(session)) {
                sessionPair = value;
            }
        }
        return sessionPair;
    }
}
