package es.urjc.code.daw.player;
import lombok.SneakyThrows;

import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping("/player")
@RestController
public class PlayerController {


    private final PlayerRepository playerRepository;

    public PlayerController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @PostMapping
    public Player savePlayer(@RequestBody Player player) {
        return playerRepository.save(player);
    }

    @GetMapping
    public List<Player> findPlayers() {
        return playerRepository.findAll();
    }


    @SneakyThrows
    @GetMapping("/{username}/{password}")
    public Player findPlayer(@PathVariable String username,@PathVariable String password) {
        
        Player player = playerRepository.findById(username).filter((player1 -> player1.getPassword().equals(password))).orElseThrow(() -> new Exception("Player not available"));
        return player;
    }
}
