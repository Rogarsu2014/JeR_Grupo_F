package es.urjc.code.daw.ping;

import lombok.SneakyThrows;

import java.util.Timer;
import java.util.TimerTask;

public class UserConnectedThread extends Thread{
    
    private int checkTime;
    private PingController pingController;
    private String playerId;
    Timer timer;
    public UserConnectedThread(int checkTime, PingController pingController,String playerId) {
        System.out.println("Thread created for client:" +playerId);
        this.checkTime = checkTime;
        this.pingController = pingController;
        this.playerId = playerId;
        
        timer= new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                checkClientState();        
            }
        }, 3000, 3000);
    }
    

//    @SneakyThrows
//    @Override
//    public void run() {
//        sleep(checkTime);
//        System.out.println("Thread for player: "+playerId+" runned");
//        if(!pingController.isUserConnected(playerId)){
//            interrupt();
//        }
//    }
    
    private void checkClientState(){
        System.out.println("Thread for player: "+playerId+" runned");
        if(!pingController.isUserConnected(playerId)){
            timer.cancel(); 
            interrupt();
        }
    }
}
