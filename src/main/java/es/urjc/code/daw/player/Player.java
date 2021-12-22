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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getGameswon() {
        return gameswon;
    }

    public void setGameswon(int gameswon) {
        this.gameswon = gameswon;
    }

    public int getIconIndex() {
        return iconIndex;
    }

    public void setIconIndex(int iconIndex) {
        this.iconIndex = iconIndex;
    }
} 


