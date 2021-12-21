package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import es.urjc.code.daw.player.Player;
import es.urjc.code.daw.player.PlayerRepository;
import es.urjc.code.daw.services.PlayersRepositoryService;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public class PlayerVictoryManager extends BaseManager{

    final ObjectMapper mapper = new ObjectMapper();
    PlayerRepository playerRepository=PlayersRepositoryService.getPlayerRepository();

    public PlayerVictoryManager() {
        associatedType="PlayerVictory";
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {}

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {

        
        JsonNode node = mapper.readTree(message.getPayload());
        String username= node.get("username").asText();

        Player player=getPlayer(username);
        int playerGamesWon=player.getGameswon();
        playerGamesWon++;
        player.setGameswon(playerGamesWon);
        
        playerRepository.save(player);
        
    }
    
    
    private Player getPlayer(String username) throws Exception {
        return playerRepository.findById(username).orElseThrow(() -> new Exception("Player not found") );
    }
}
