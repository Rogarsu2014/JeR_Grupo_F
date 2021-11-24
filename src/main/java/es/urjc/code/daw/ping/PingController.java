package es.urjc.code.daw.ping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Dictionary;
import java.util.Hashtable;
import java.util.LinkedList;
import java.util.List;

@RequestMapping("/ping")
@RestController
public class PingController {
    
    int usersCount=0;
    Dictionary<String,Boolean> idsList;

    public PingController() {
        this.idsList = new Hashtable<>();
    }

    @GetMapping
    public Object doPing(){
        return null;
    }

    @GetMapping("/connect")
    public Object connect(String id){
        
        idsList.put(id,true);
        new UserConnectedThread(1000,this,id);
        System.out.println("Users connected with id: " + (id));
        System.out.println("Users connected count: " + (idsList.size()));
        return "Connected";
    }
    
    @GetMapping("/clientConnection")
    public Object checkClientConnection(String id){
        idsList.put(id,true);
        System.out.println("Connection updated for: " + (id));
        return "Connected";
    }
    boolean isUserConnected(String id){
        if(idsList.get(id).equals(true)){
            idsList.put(id,false);
            System.out.println("Users" + id+" is still connected connected");
            return true;
        }else {
            removeUser(id);
            System.out.println("User left");
            System.out.println("Users connected count: " + (idsList.size()));
            return false;
        }
    }
    
    public void removeUser(String id){
        idsList.remove(id);
    }

    @GetMapping("/clientsCount")
    public int getClientsCount(){
        return idsList.size();
    }
}
