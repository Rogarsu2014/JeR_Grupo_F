package es.urjc.code.daw.ping;

import es.urjc.code.daw.chat.Message;
import es.urjc.code.daw.chat.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Dictionary;
import java.util.Hashtable;

@RequestMapping("/ping")
@RestController
public class PingController {

    @Autowired
    MessageRepository messageRepository;
    
    private int usersCount=0;
    // Table with each id and a value to define if the client is connected or not
    private  Dictionary<String,Boolean> idsTable;

    public PingController() {
        this.idsTable = new Hashtable<>();
    }

    @GetMapping
    public Object doPing(){
        return null;
    }

    @GetMapping("/connect")
    public Object connect(String id){
        
        idsTable.put(id,true);
        new UserConnectedThread(1000,this,id);
        messageRepository.save(new Message("Server","Client "+id+" connected"));
        System.out.println("Users connected with id: " + (id));
//        System.out.println("Users connected count: " + (idsTable.size()));
        return "Connected";
    }
    
    @GetMapping("/clientConnection")
    public Object checkClientConnection(String id){
        idsTable.put(id,true);
//        System.out.println("Connection updated for: " + (id));
        return "Connected";
    }
    boolean isUserConnected(String id){
        if(idsTable.get(id).equals(true)){
            idsTable.put(id,false);
//            System.out.println("Users" + id+" is still connected connected");
            return true;
        }else {
            removeUser(id);
//            System.out.println("User left");
//            System.out.println("Users connected count: " + (idsTable.size()));
            return false;
        }
    }
    
    public void removeUser(String id){
        System.out.println("Users DISCONNECTED with id: " + (id));
        messageRepository.save(new Message("Server","Client "+id+" disconnected"));
        idsTable.remove(id);
    }

    @GetMapping("/clientsCount")
    public int getClientsCount(){
        return idsTable.size();
    }
}
