package es.urjc.code.daw.chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.List;

@RequestMapping("/message")
@RestController
public class MessageController {

    int messageCount=0;
    @Autowired
    private final  MessageRepository  messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @GetMapping
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
    
    @PostMapping
    public Message saveMessage(@RequestBody Message message) {
        System.out.println("message received number" + (++messageCount));
        return messageRepository.save(message);
    }
}
