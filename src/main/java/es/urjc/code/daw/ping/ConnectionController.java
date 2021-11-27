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
public class ConnectionController {

    private static ConnectionController instance;

    public static ConnectionController getInstance() {
        return instance;
    }

    private final MessageRepository messageRepository;

    // Table with each id and a value to define if the client is connected or not
    private Hashtable<String, Boolean> idsTable;

    public ConnectionController(MessageRepository messageRepository) {

        this.messageRepository = messageRepository;
//        if(instance==null)
        instance = this;
        this.idsTable = new Hashtable<>();
    }

    @GetMapping
    public Object doPing() {
        return null;
    }

    @GetMapping("/connect")
    public Object connect(String id) {

        idsTable.put(id, true);
        new UserConnectedThread(this, id);
        messageRepository.save(new Message("Server", "Client " + id + " connected"));
        System.out.println("Users connected with id: " + (id));
//        System.out.println("Users connected count: " + (idsTable.size()));
        return "Connected";
    }

    @GetMapping("/clientConnection")
    public Object checkClientConnection(String id) {
        idsTable.put(id, true);
//        System.out.println("Connection updated for: " + (id));
        return "Connected";
    }

    boolean isUserConnected(String id) {
        if (idsTable.get(id).equals(true)) {
            idsTable.put(id, false);
            return true;
        } else {
            removeUser(id);
            return false;
        }
    }

    public boolean isUserLogIn(String username) {
        return idsTable.containsKey(username);
    }

    public void removeUser(String id) {
        System.out.println("Users DISCONNECTED with id: " + (id));
        messageRepository.save(new Message("Server", "Client " + id + " disconnected"));
        idsTable.remove(id);
    }

    @GetMapping("/clientsCount")
    public int getClientsCount() {
        return idsTable.size();
    }
}
