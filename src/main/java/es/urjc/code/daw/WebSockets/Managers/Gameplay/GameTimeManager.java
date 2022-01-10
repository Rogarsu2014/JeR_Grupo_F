package es.urjc.code.daw.WebSockets.Managers.Gameplay;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import es.urjc.code.daw.WebSockets.Classes.SessionPair;
import es.urjc.code.daw.WebSockets.Managers.BaseManager;
import lombok.SneakyThrows;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

public class GameTimeManager {

    final ObjectMapper mapper = new ObjectMapper();
    
    ConcurrentHashMap<SessionPair, Timer> timers;
    
    public GameTimeManager() {
        timers= new ConcurrentHashMap<SessionPair, Timer>();
    }
    
    
    public void setTimer(SessionPair sessionPair,long delay, long period){
        
        TimerTask task =  new TimerTask() {
            @SneakyThrows
            @Override
            public void  run() {
                for (WebSocketSession session : sessionPair.getSessions()) {
                    ObjectNode node = mapper.createObjectNode();
                    node.put("type","GameTime");
                    session.sendMessage(new TextMessage(node.toString()));
                }
            }
        };
        
        Timer timer= new Timer();
        timer.schedule(task,delay,period);
        
        if(timers.containsKey(sessionPair)){
            timers.get(sessionPair).cancel();
            timers.get(sessionPair).purge();
            timers.replace(sessionPair,timer);
        }else {
            timers.put(sessionPair,timer);
        }
        
        
    }
    
}