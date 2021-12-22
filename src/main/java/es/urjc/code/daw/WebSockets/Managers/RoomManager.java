package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import es.urjc.code.daw.WebSockets.Classes.SessionPair;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Random;

public class RoomManager extends BaseManager {

    final ObjectMapper mapper = new ObjectMapper();

    static RoomManager instance= new RoomManager();

    public static RoomManager getInstance() {
        return instance;
    }

    ConcurrentHashMap<String, SessionPair> games = new ConcurrentHashMap<>();

    //ConcurrentHashMap<String,WebSocketSession > openRooms = new ConcurrentHashMap<>();

    public RoomManager() {
        associatedType= "Room";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) {

    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonNode roomNode= mapper.readTree(message.getPayload());

        if(roomNode.get("type2").asText().equals("Host")){
            String roomCode = randomString();
            SessionPair p = new SessionPair(session);
            games.put(roomCode, p);
            System.out.println("Created room with code :" + roomCode);

            ObjectNode node= mapper.createObjectNode();
            node.put("type","RoomCode");
            node.put("code",roomCode);
            node.put("playerIndex",p.getPlayerIndex(session));
            session.sendMessage(new TextMessage(node.toString()));

        }else if(roomNode.get("type2").asText().equals("Join")){
            if(games.containsKey(roomNode.get("RoomCode").asText())){
                WebSocketSession player1 = games.get(roomNode.get("RoomCode").asText()).getW1();
                if(player1 == null){
                    System.out.println("Room not Found");
                }else if(games.get(roomNode.get("RoomCode").asText()).getStatus().equals("full")){
                    System.out.println("Room Full");
                }else{
                    games.get(roomNode.get("RoomCode").asText()).setW2(session);
                    System.out.println("Connected in room with " + games.get(roomNode.get("RoomCode").asText()).getW1().getId() ); //Falta nombre

                    ObjectNode node= mapper.createObjectNode();
                    node.put("type","RoomCode");
                    node.put("code",roomNode.get("RoomCode").asText());

                    node.put("playerIndex",games.get(roomNode.get("RoomCode").asText()).getPlayerIndex(session));

                    session.sendMessage(new TextMessage(node.toString()));
                }
            }else{
                System.out.println("Room not Found");
            }
        }else{
            //Desconectar voluntariamente
            System.out.println(roomNode.get("type2").asText());
            System.out.println("Unknown error");
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

    public WebSocketSession getPair(WebSocketSession s, TextMessage message)throws Exception{
        JsonNode roomNode= mapper.readTree(message.getPayload());
        if(games.containsKey(roomNode.get("RoomCode").asText())){
            if(games.get(roomNode.get("RoomCode").asText()).getStatus().equals("full")){
                return games.get(roomNode.get("RoomCode").asText()).getOtherSession(s);
            }else{
                return s;
            }
        }else{
            return s;
        }
    }
}
