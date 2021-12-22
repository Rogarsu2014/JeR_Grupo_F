package es.urjc.code.daw.services;

import es.urjc.code.daw.chat.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageRepositoryService {
    
    private static MessageRepository messageRepository;          //Repositorio de mensajes

    public MessageRepositoryService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }


    public static MessageRepository getMessageRepository(){
        return  messageRepository;
    }
}
