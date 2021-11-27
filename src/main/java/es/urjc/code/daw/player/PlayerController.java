package es.urjc.code.daw.player;
import es.urjc.code.daw.ping.ConnectionController;
import lombok.SneakyThrows;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping("/player")
@RestController
public class PlayerController {

    @Autowired
    private final PlayerRepository playerRepository;
    
    @Autowired
    ConnectionController connectionController;
    
    public PlayerController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

//    @SneakyThrows
    @PostMapping
    public Player signUp(@RequestBody Player player) {
        boolean usernameAlreadyExits=playerRepository.findById(player.getUsername().trim()).isPresent();
        if(!usernameAlreadyExits) {
            System.out.println("New player with username '"+player.getUsername().trim());
            return playerRepository.save(player);
        } else {
            System.out.println("Player with username '"+player.getUsername().trim()+"' already exists.");
            return null;
        }
    }

    @GetMapping
    public List<Player> findPlayers() {
        return playerRepository.findAll();
    }

    @SneakyThrows
    @GetMapping("/{username}/{password}")
    public Player logIn(@PathVariable String username,@PathVariable String password) {
        if(!connectionController.isUserLogIn(username)) {
            Player player = playerRepository.findById(username).filter((player1 -> player1.getPassword().equals(password))).orElseThrow(() -> new Exception("Player not available"));
            return player;
        }
        return null;
    }
}
