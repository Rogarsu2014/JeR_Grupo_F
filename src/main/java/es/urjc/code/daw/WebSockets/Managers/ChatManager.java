package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import es.urjc.code.daw.chat.Message;
import es.urjc.code.daw.chat.MessageRepository;
import es.urjc.code.daw.services.MessageRepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class ChatManager extends BaseManager {


    private MessageRepository messageRepository = MessageRepositoryService.getMessageRepository();          //Repositorio de mensajes

    final ObjectMapper mapper = new ObjectMapper();             //Mapper del chat manager


    public ChatManager() {
        associatedType = "Chat";                                    //Tipo asociado al chat
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {

    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Mensaje recibido del chat con información " + message.getPayload());

        //Crea un nodo con el mensaje recibido
        JsonNode chatNode = mapper.readTree(message.getPayload());

        if (chatNode.get("typeId").asText().equals("BaitMensajes")) {
            //Recibe todos los mensajes del chat
            ArrayNode messages = mapper.valueToTree(messageRepository.findAll());
            session.sendMessage(new TextMessage(messages.toString()));
        } else {
            if (chatNode.get("typeId").asText().equals("CeboMensaje")) {
                //Recibe el útlimo mensaje enviado, actualmente no en uso, dejado por si acaso
                //ArrayNode messages = mapper.valueToTree(messageRepository.findById(lastMessageId);
                session.sendMessage(message);//new TextMessage(messages.toString()));
            } else {
                String user = chatNode.get("username").asText();
                String content = chatNode.get("content").asText();

                //Mensaje para guardarse
                Message newMessage = new Message(user, content);
                saveMessage(newMessage);

                //session.sendMessage(message);

                //Envía el mensaje al resto de usuarios, indicando el tipo de mensaje junto con el resto de información recibida
                ObjectNode chatObjectNode = mapper.valueToTree(newMessage);
                chatObjectNode.put("type", associatedType);
                
                    sendMessage(session, chatObjectNode);
                
            }
        }

    }

    @Override
    public void connectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

    }

    //Método que envia el mensaje
    private void sendMessage(WebSocketSession sender, ObjectNode mensaje) throws Exception {
        //Comprueba todas las sesiones

        System.out.println("entra en send message");

        for (WebSocketSession session : SessionsManager.getInstance().getPlayersSessions().values()) {
            synchronized (session) {
                session.sendMessage(new TextMessage(mensaje.toString()));
            }

        }
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }   //Devuelve todos los mensajes

    //Método de guardado
    public Message saveMessage(Message message) {
        System.out.println("entra en save message");
        return messageRepository.save(message);
    }


}
