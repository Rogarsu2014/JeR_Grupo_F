package es.urjc.code.daw.ping;


import java.util.Timer;
import java.util.TimerTask;

public class UserConnectedThread{
    
    private final int delay=3000;
    private final int period=3000;
    
    private ConnectionController connectionController;
    private String playerId;
//    private Timer timer;
    public UserConnectedThread(ConnectionController connectionController, String playerId) {
//        System.out.println("Thread created for client:" +playerId);
        this.connectionController = connectionController;
        this.playerId = playerId;

       Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                checkClientState(timer);
            }} , delay, period);
    }
    private void checkClientState(Timer timer){
       //System.out.println("Thread for player: "+playerId+" runned");
        if(!connectionController.isUserConnected(playerId)){
            timer.cancel();
            timer.purge();
        }
    }

    
}
