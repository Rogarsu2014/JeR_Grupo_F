package es.urjc.code.daw;


import es.urjc.code.daw.WebSockets.WebsocketGatewayHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@CrossOrigin
@SpringBootApplication
@EnableWebSocket
public class Application implements WebSocketConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		
		registry.addHandler(createMovementHandler(), "/applicationGateway")
				.setAllowedOrigins("*");
	}
	
	
	@Bean
	public WebsocketGatewayHandler createMovementHandler() {
		return new WebsocketGatewayHandler();
	}
}

