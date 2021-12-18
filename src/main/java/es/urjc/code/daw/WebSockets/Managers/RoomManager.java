package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import es.urjc.code.daw.WebSockets.Classes.SessionPair;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Random;

public class RoomManager extends BaseManager {

    final ObjectMapper mapper = new ObjectMapper();

    ConcurrentHashMap<String, SessionPair> games = new ConcurrentHashMap<>();

    ConcurrentHashMap<String,WebSocketSession > openRooms = new ConcurrentHashMap<>();

    public RoomManager() {
        associatedType= "Room";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) {
        openRooms.put(session.getId(),session);
    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonNode roomNode= mapper.readTree(message.getPayload());

        if(roomNode.get("type").asText() == "Host"){
            String roomCode = randomString();
            openRooms.put(roomCode, session);
            System.out.println("Created room with code :" + roomCode);
        }else if(roomNode.get("type").asText() == "Join"){
            WebSocketSession player1 = openRooms.get(roomNode.get("Code").asText());
            if(player1 == null){
                System.out.println("Room not Found");
            }else{
                SessionPair p = new SessionPair(player1, session);
                games.put(roomNode.get("Code").asText(), p);
                System.out.println("Connected in room with" ); //Falta nombre
            }
        }else{
            //Desconectar voluntariamente
        }
    }

    public void connectionLost(){
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

}
