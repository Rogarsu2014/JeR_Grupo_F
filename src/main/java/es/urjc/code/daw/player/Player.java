package es.urjc.code.daw.player;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
@Entity
@Table(name = "Players")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Player {

    @Id
    @Column(name = "Username")

    private String username;
    private String password;
    private int gameswon;
    private int iconIndex;
} 


