package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import es.urjc.code.daw.chat.Message;
import es.urjc.code.daw.chat.MessageRepository;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class ChatManager extends BaseManager{

    private final MessageRepository messageRepository;          //Repositorio de mensajes
    final ObjectMapper mapper = new ObjectMapper();             //Mapper del chat manager


    public ChatManager(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;                //Inicializador del Chat Manager
        associatedType= "Chat";                                    //Tipo asociado al chat
    }

    @Override
    public void connectionEstablished(WebSocketSession session) {

    } //Por implementar...

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception{
    } //Por implementar...

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }   //Devuelve todos los mensajes




}
