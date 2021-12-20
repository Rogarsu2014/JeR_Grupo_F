package es.urjc.code.daw.WebSockets.Managers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import es.urjc.code.daw.chat.Message;
import es.urjc.code.daw.chat.MessageRepository;
import org.springframework.web.bind.annotation.RequestBody;
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
        System.out.println("Mensaje recibido del chat con información " +message.getPayload());
        //Crea un nodo con el mensaje recibido, dividiendo a su vez la info de este
        JsonNode chatNode= mapper.readTree(message.getPayload());
        String user= chatNode.get("username").asText();
        String content= chatNode.get("content").asText();

        //Envía el mensaje al resto de usuarios, indicando el tipo de mensaje junto con el resto de información recibida
        ObjectNode chatObjectNode= mapper.createObjectNode();
        chatObjectNode.put("type",associatedType);
        chatObjectNode.put("username",user);
        chatObjectNode.put("content",content);

        sendMessage(session, chatObjectNode);
    }

    //Método que envia el mensaje
    private void sendMessage(WebSocketSession sender, ObjectNode mensaje) throws Exception {
        //Comprueba todas las sesiones
        for (WebSocketSession session : SessionsManager.getInstance().getPlayersSessions().values()) {
            //Si el que lo envía no es la sesión que envía...
            if (sender != session) {
                //... le envía el mensaje
                session.sendMessage(new TextMessage(mensaje.toString()));
            }
        }
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }   //Devuelve todos los mensajes

    //Quizás falte reimplementar el método de guardado


}
