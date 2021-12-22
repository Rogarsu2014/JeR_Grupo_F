package es.urjc.code.daw.services;

import es.urjc.code.daw.player.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayersRepositoryService {
    @Autowired
    private static PlayerRepository playerRepository;
    
    public static PlayerRepository getPlayerRepository(){
        return playerRepository;
    }
}
