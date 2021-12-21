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
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class ChatManager extends BaseManager{

    
    private MessageRepository messageRepository = MessageRepositoryService.getMessageRepository();          //Repositorio de mensajes

    final ObjectMapper mapper = new ObjectMapper();             //Mapper del chat manager


    public ChatManager() {
       associatedType= "Chat";                                    //Tipo asociado al chat
    }

    @Override
    public void connectionEstablished(WebSocketSession session) throws IOException {
        //Pilla todos los mensajes y los parsea a Json, los mensajes parseados los envia a la sesión que se ha conectado
//        ArrayNode messages = mapper.valueToTree(messageRepository.findAll());
//        session.sendMessage(new TextMessage(messages.toString()));
    }

    @Override
    public void receiveMessage(WebSocketSession session, TextMessage message) throws Exception{
        System.out.println("Mensaje recibido del chat con información " +message.getPayload());
        
        //Crea un nodo con el mensaje recibido, dividiendo a su vez la info de este
        JsonNode chatNode= mapper.readTree(message.getPayload());

        if(chatNode.get("typeId").asText().equals("BaitMensajes")){
            //for (Message mensaje : messageRepository.findAll()) {
                //sendMessage(session, mapper.valueToTree(mensaje));
            //}

            ArrayNode messages = mapper.valueToTree(messageRepository.findAll());
            session.sendMessage(new TextMessage(messages.toString()));
        }
        else{
            String user= chatNode.get("username").asText();
            String content= chatNode.get("content").asText();

            //Mensaje para guardarse
            Message newMessage = new Message(user, content);
            saveMessage(newMessage);

            //Envía el mensaje al resto de usuarios, indicando el tipo de mensaje junto con el resto de información recibida
            ObjectNode chatObjectNode= mapper.valueToTree(newMessage);
            chatObjectNode.put("type",associatedType);

            sendMessage(session, chatObjectNode);
        }
    }

    //Método que envia el mensaje
    private void sendMessage(WebSocketSession sender, ObjectNode mensaje) throws Exception {
        //Comprueba todas las sesiones

        System.out.println("entra en send message");

        for (WebSocketSession session : SessionsManager.getInstance().getPlayersSessions().values()) {
            //Si el que lo envía no es la sesión que envía...
            //if (sender != session) {
                //... le envía el mensaje
                session.sendMessage(new TextMessage(mensaje.toString()));
            //}
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
