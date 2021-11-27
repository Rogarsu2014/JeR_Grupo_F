package es.urjc.code.daw.ping;

import java.util.Timer;
import java.util.TimerTask;

public class UserConnectedThread extends Thread{
    
    private int checkTime;
    private ConnectionController connectionController;
    private String playerId;
    Timer timer;
    public UserConnectedThread(int checkTime, ConnectionController connectionController, String playerId) {
//        System.out.println("Thread created for client:" +playerId);
        this.checkTime = checkTime;
        this.connectionController = connectionController;
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
//        System.out.println("Thread for player: "+playerId+" runned");
        if(!connectionController.isUserConnected(playerId)){
            timer.cancel(); 
            interrupt();
        }
    }
}
