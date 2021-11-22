package es.urjc.code.daw.chat;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    
    @Id
    String username;
    String content;
}
