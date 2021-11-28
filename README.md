# <p align="center">JeR_Grupo_F</div>

## Nombre_del_Juego
Dual Interest
![Titulo](doc/GDDImagenes/Botones_y_Creditos/GameTittle.png)
## Descripcion_del_Juego
*Te interesa colaborar con el enemigo para poder ganar.*

Dual Interests es un videojuego multijugador de plataformas 2D de dos personas con un estilo simplificado en el que cada jugador controla a un personaje y combinando fases cooperativas de puzzles y fases de duelo compiten por la superioridad en una serie de niveles en los que deberán recolectar calaveras que les darán puntos para poder ganar.



## Integrantes
*Rodrigo Garcia Suarez, r.garciasu.2019@alumnos.urjc.es, Rogarsu2014*

*Mariano Jesús De Biase Rodriguez, mj.debiase.2019@alumnos.urjc.es, marianoj27*


*Pablo Pomares Crespo, p.pomaresc.2018@alumnos.urjc.es, A6MFlygon*

*Roberto García Martín, r.garciama.2018@alumnos.urjc.es, drowlerd*

**https://trello.com/b/JyMPz9K5/improvisation-productions**

## Nota

**A la hora de trabajar, se realizan commits enstando todos los integrantes en trabajando en equipo y sumando los archivos y código del resto en un odenaro**
___
# <p align="center">GDD</div>

## Índice

*Los acentos no están disponibles en el índice por el sistema de Markdown*

- [Introducción](#introduccion)
  - [Concepto del juego](#concepto-del-juego)
  - [Características principales](#caracteristicas-principales)
  - [Género](#genero)
  - [Propósito y público objetivo](#proposito-y-publico-objetivo)
  - [Jugabilidad](#jugabilidad)
  - [Estilo visual](#estilo-visual)
  - [Alcance](#alcance)
- [Mecánicas de juego](#mecanicas-de-juego)
  - [Jugabilidad](#jugabilidad)
  - [Puntos](#puntos)
  - [Salto](#salto)
  - [Empuje](#empuje)
  - [Desplazamiento lateral](#desplazamiento-lateral)
  - [Trampas](#trampas)
  - [Tiempos](#tiempos)
  - [Personaje](#personaje)
- [Movimiento y físicas](#movimiento-y-fisicas)
  - [Colisiones](#colisiones)
  - [Controles](#controles)
- [Interfaz](#interfaz)
  - [**Diagrama de flujo**](#diagrama-de-flujo)
  - [<span style="color:lightgreen">**Transición de escenas** </span>](#transicion-de-escenas)
  - [Flujo de gameplay](#flujo-de-gameplay)
  - [Game-loop](#game-loop)
  - [Menú principal](#menu-principal)
  - [Selección de Personajes (NO IMPLEMENTADA)](#seleccion-de-personajes-no-implementada)
  - [Tutorial y Créditos](#tutorial-y-creditos)
- [Arte](#arte)
  - [Audio](#audio)
- [Diseño de niveles](#Diseño-de-niveles)
- [<span style="color:lightgreen">**Implementación de Servidor con API REST y diagrama de clases**</span>](#implementacion-de-servidor-con-api-rest-y-diagrama-de-clases)
  - [<span style="color:lightgreen">**Datos (*Data*)**</span>](#datos-data)
  - [<span style="color:lightgreen">**Modelo (*Model*)**</span>](#modelo-model)
  - [<span style="color:lightgreen">**Vista (*View*)**</span>](#vista-view)

 

# Introduccion

Este es el documento de diseño de juego de *Dual Interest*.Aquí expondremos la idea original del juego de plataformas y competición que está en desarrollo. 


## Concepto del juego  
*Dual Interests* es un videojuego multijugador de plataformas 2D de dos personas con un estilo simplificado en el que cada jugador controla a un personaje y combinando fases cooperativas de puzzles y fases de duelo compiten por la superioridad en una serie de niveles en los que deberán recolectar calaveras que les darán puntos para poder ganar.

*Te interesa colaborar con el enemigo para poder ganar.*
![puerta nivel coop1](doc/GDDImagenes/Puerta_abriendose.gif)
![nivel competitivo 1](doc/GDDImagenes/Comp1.gif)
## Caracteristicas principales 
El juego se centra en los siguientes puntos:

* #### Competitividad: 
El objetivo del juego es ganar al otro jugador, aunque para ello se tenga que colaborar con este, por lo que siempre se debe tener un ojo avizor a lo que hace el oponente.
* #### Colaboracion: 
Interesa colaborar con el enemigo durante la fase de colaboración ya que esta recompensa esta acción dando puntos, cuya finalidad es dar unas oportunidades más durante la fase de competición (las trampas restan puntos).
* #### Fácil de entender: 
El hecho de no tener trama narrativa hace que el juego posea una gran facilidad para entender sus mecánicas y su estructura. 
* ##### Frenético: 
Al ser una carrera contra el tiempo las acciones tomadas por los jugadores han de ser rápidas y eficientes, transmitiendo ansiedad e intensidad.

## Genero
*Dual Interest* es un juego de plataformas, acción y puzzles. Ofrece en profundidad  mecánicas similares a los juegos de plataformas, ya que están pulidas y desarrolladas y está centrada en libertad de movimiento y desplazamiento. También se incluyen los puzzles en las fases de colaboración. En cuanto a la acción se refiere a lo que sucede durante la fase de competición en la que la mecánica de empuje provocará situaciones muy intensas y frenéticas.

## Proposito y publico objetivo

El objetivo de este juego es crear un ambiente divertido en el que los jugadores tengan una experiencia intensa, al mezclar cooperación e interés, donde participen en niveles rápidos con amigos.

El juego está pensado para cualquier tipo de jugador capaz de soportar violencia moderada (14+). Al ser un juego sin trama, no es necesario el entendimiento de una historia, quedando éste reducido a la comprensión de las normas por parte del jugador.

## Jugabilidad 
La jugabilidad de Dual Interests está determinada por varios factores que se mencionan a continuación:

* #### Desplazamiento  y movilidad: 
El movimiento se realiza con las teclas W,A,S,D (para el primer jugador)  y U, H, J, K (para el segundo jugador en local).
* #### Interacción con el oponente: 
Es posible empujar y subirse sobre el oponente para completar el nivel usando el primer jugador la tecla F y el segundo jugador la tecla L.
* #### Escenario: 
El escenario del juego será de estética minimalista y colorida.

## Estilo visual
El estilo visual de Dual Interest es simplificado y colorido, siendo el nivel ilustrado con colores planos y una estética simple y estilizada. Los personajes son seres geométricos, coloridos con estética similar al escenario.

![Menu](doc/GDDImagenes/MenuImage.png)
*Imagen de fondo del menú principal*

![Calavera](doc/GDDImagenes/Personajes/SpriteSkulls.png)

*SpriteSheet de la calavera*


## Alcance
La prioridad se centrará en ofrecer al jugador suficiente variedad de mapas y de objetos en la versión base para que la experiencia sea lo más innovadora posible. 
De cara al futuro se añadirán nuevos mapas y objetos, ofreciendo así variedad al jugador y mecánicas (agarrar, agacharse, entre otras) para que los nuevos contenidos y los previos puedan experimentarse de diferentes maneras.

# Mecanicas de juego 
Aquí se hablará más en profundidad de las mecánicas y funcionamiento de las mismas en Dual Interest. Principalmente nos centraremos en ampliar los conceptos que ya han sido introducidos previamente y expandirlos con el fin de que se comprenda mejor su estructura. 

## Jugabilidad

### Niveles
Los jugadores tendrán que superar un total de 3 rondas de 2 niveles, uno cooperativo y uno competitivo. Los niveles tendrán unos momentos en el que ambos jugadores cooperarán para poder acceder a la siguiente fase, en la que competirán entre ellos para ganar puntos.
### Fase de cooperación
En esta fase deberán ayudarse ambos oponentes para poder desbloquear el mapa y llegar a la salida. Habrá un puzzle que tienen que resolver, compuesto por una serie de botones que hay que pulsar en un orden determinado y por un jugador determinado. Este jugador se puede deducir ya que el color del botón es el mismo que el del jugador.


### Funcionamiento del nivel
- En cada nivel, los jugadores tendrán que completar tareas (pulsación de botones) para ayudarse entre ellos y poder avanzar en el nivel. 
- Si un jugador no completa la tarea, es decir, no está cooperando, se verá penalizado. 
Cada jugador tiene el mismo número de tareas que completar.
Hay cierto tiempo para completar los niveles, cuando se completa una tarea, se añade tiempo extra al contador (suma de 5 segundos).

### Tareas
Una tarea puede ser varias cosas:
- Pulsar un botón.
- Ser el soporte para que el otro jugador salte más alto (se sobreentiende que al ser botón pulsado por el otro jugador este ha sido ayudado y se recompensa a los dos).

### Recompensas
- Cada vez que un jugador completa una tarea, se le dará puntos como recompensa.
- Si un jugador no completa una tarea, se le restará 100 puntos. 


### Fase de competición 
El siguiente paso para el jugador será competir y conseguir más puntos que el otro, a la vez que impedirle obtener puntos mediante métodos como el empuje, que se tratará más adelante. Estos niveles a veces son algo más grandes que los niveles de cooperación y se extienden en una dirección concreta: vertical u horizontal. Los verticales de momento no modifican el tamaño de la pantalla. Ambos tipos de mapas tienen calaveras repartidas por su escenario donde ambos jugadores compiten por ver quien es el que consigue más calaveras. 

En los niveles horizontales, los jugadores tendrán que tener cuidado con trampas que les complican esta tarea, mientras que en los niveles verticales, el impedimento será la habilidad del jugador haciendo saltos por las plataformas.

## Puntos
Se otorgarán puntos a los jugadores al recolectar calaveras y colaborar con el jugador (en este último caso se refiere a la fase de colaboración, y en esta los puntos son directamente sumados). Estos puntos serán el principal indicador de victoria para cada partida. Dichos puntos se guardarán a lo largo de la partida, compuesta por varias rondas. La cantidad de puntos ganados por la recolección de calaveras y acciones cooperativas serán constantes.
Por otra parte la cantidad de puntos perdidos es distinta, ya que las trampas restan 50 puntos mientras que no completar una tarea cooperativa resta 100 puntos. Cabe destacar el hecho de que el número de calaveras durante la fase de competición va a ser impar, de manera que se intente que no haya empates durante esta fase, sino que haya un ganador por poco que sea.

## Salto
La mecánica del salto está pensada de forma que de juego a un desplazamiento entre plataformas y hacia ellas de manera eficiente y rápida. Está pensado de forma que la distancia de salto sea constante, sin depender de la fuerza con la que se presiona la tecla o el tiempo pulsado. Asimismo el salto puede ser sobre otro jugador, lo cual está pensado tanto para las fases de cooperación como las de competición.

## Empuje
El empuje está diseñado como una mecánica de competición, cuyo propósito es el impedimento o la obstaculización de las acciones del oponente. Sin embargo esta acción estará disponible también en la fase de cooperación, con el fin de que si lo ven necesario los jugadores hagan uso de ella. Al igual que con el salto, el empuje desplazará al oponente una distancia determinada y constante.
![Empuje](doc/GDDImagenes/emoujon.gif)

## Desplazamiento lateral
El jugador podrá desplazarse en un solo plano, pudiendo moverse a lo ancho (eje horizontal) y a lo alto (eje vertical) mediante el uso de las mecánicas de movimiento previamente definidas y elementos del escenario.

## Trampas 
Las trampas son mecanismos presentes en el escenario que dificultan el avance  a los jugadores durante la fase de competición. Las trampas actuales están representadas mediante unos pinchos rocosos que salen del suelo. Estas trampas al caer sobre ellas hacen que el jugador reaparezca en la posición inicial del nivel y se le restan 50 puntos. Además el jugador se queda inmovilizado durante 2 segundos como penalización.

![trampa](doc/GDDImagenes/Nivel/Trampa3.png)

*Sprite de la trampa*

## Tiempos
Los jugadores tendrán un límite de tiempo para completar los diferentes objetivos. Hay un tiempo para las tareas en la fase cooperativa, y otro para la fase competitiva. El contador se encontrará centrado en la parte superior de la pantalla. Se les dará a los jugadores 15 segundos o menos en la fase de cooperación para realizar sus tareas y se otorgará una bonificación de tiempo cuando un jugador complete una. Para la fase competitiva los jugadores tendrán aproximadamente 30 segundos para superar los obstáculos, luchar y avanzar hacia los puntos.

## Personaje
Los personajes presentes en el juego son controlados por los jugadores, sin NPC’s al ser el juego exclusivamente multijugador. Dichos personajes tienen una complexión pequeña y ágil acorde con el espíritu frenético del juego, además de que un tamaño grande sería una molestia a la hora de desplazarse. 

En cuanto al aspecto físico se distinguen dos personajes geométricos diferenciables. Ambos con formas distintas y brazos, piernas y ojos.
![ibban](doc/GDDImagenes/Personajes/Ibban.png)![daia](doc/GDDImagenes/Personajes/Daia0.png)

*Primeros Diseños de personaje*
![daia2](doc/GDDImagenes/Personajes/SPRITE_SHIIIIIITTT.png)
![daia2](doc/GDDImagenes/Personajes/spriteshit2.png)
*Hojas de Sprite de los personajes*

# Movimiento y fisicas 
## Colisiones

Las colisiones producidas son:

- Jugador - Escenario
- Jugador - Trampa
- Jugador - Jugador
- Jugador - Calavera (puntos)

Cada escenario contará con paredes y plataformas que tendrán colisión con el jugador.
Los jugadores entre sí también tendrán colisión.
Por otro lado, las calaveras podrán ser tocadas por los jugadores para ser obtenidas. Una vez obtenidas, desaparecerán.

## Controles 
El control de movimiento se realiza con el teclado. El desplazamiento lateral se realizará con las teclas A y D para moverse a izquierda y derecha respectivamente. El movimiento de salto se realizará con la tecla W. Se encuentra la opción de acelerar la caída usando el botón S.
El empuje será realizado con la tecla F, empujando y desplazando al jugador rival hacia donde el jugador que empuja está mirando. En teclado, el segundo jugador se moverá con H y K a izquierda y derecha, saltará con la U, descenderá con la J y empujará con la L

![tut1](doc/GDDImagenes/Tutorial/players4.png)
![teclas jugadores](doc/GDDImagenes/Tutorial/Versiones_completas/A-press2.png) 
![teclas jugadores](doc/GDDImagenes/Tutorial/Versiones_completas/D-press2.png)
![teclas jugadores](doc/GDDImagenes/Tutorial/Versiones_completas/W-press2.png)
![teclas jugadores](doc/GDDImagenes/Tutorial/Versiones_completas/F-press2.png)



En caso de usar control por mando, la palanca izquierda permite mover al jugador, al pulsar el botón inferior derecho se produciría el salto y los botones R2 y L2 permitirían los movimientos de empuje.


# Interfaz 
## Diagrama de flujo

Se desarrollarán varios diagramas para mostrar: transición de escenas, flujo de *gameplay*, *game-loop*.

## **Transicion de escenas**

![menu boceto](doc/GDDImagenes/Diagramas/Untitled_Diagram.png)

### Navegación Fase 3 Menu principal y juego
![navegacion_fase_3](doc/GDDImagenes/Diagramas/Tareas_Fase_3.png)


##  **Flujo de gameplay**
![menu boceto](doc/GDDImagenes/Diagramas/Juego_diagrama.png)

## **Game-loop**
![menu boceto](doc/GDDImagenes/Diagramas/game_loop.png)



## **Menu principal**
![menu boceto](doc/GDDImagenes/BocetosUI/Menu.jpg)
___
![menu principal](doc/GDDImagenes/Menu_principal.gif)
___
![menu principal2](doc/GDDImagenes/MenuPrincipalActualizado.png)            <-- Aquí poner captura del menú principal que aparezcan todos los botones

Descripción del menú principal:

* **Botón juego local:** Al ser pulsado entra en la pantalla de selección de personaje.

* **Botón juego online:** Al ser pulsado entra en el modo online ( por definir ).

* **Botón tutorial:** Al ser pulsado entra en un nivel especial de tutorial.

* **Botón opciones:** Al ser pulsado abre la personalización de los ajustes del juego.

* **Botón créditos:** Al ser pulsado nos lleva a la pantalla de créditos.


## Seleccion de Personajes (NO IMPLEMENTADA)

![boceto sleección de personaje](doc/GDDImagenes/BocetosUI/Seleccion_de_personaje.jpg)
___

Descripción de la selección de personaje

* Botón empezar partida: Al ser pulsado entra en la pantalla de carga del juego.

* Botón salir al menú principal: Al ser pulsado sale al menú principal.

* Flechas de dirección (al lado de los personajes): Al ser pulsadas selecciona diferentes modelos de personaje.

## **Sistema de Log In**
![ButtonLogin](doc/GDDImagenes/Botones_y_Creditos/ButtonLogin.png)
![LoginScreen](doc/GDDImagenes/UI/LoginScreen.png)                               <-- aquí poner captura del menú principal que aparezca el login
___
![UserScreen](doc/GDDImagenes/UI/PlayerScreen.png)                               <-- aquí poner captura del menú principal que aparezca registrado
![DaiaProfile](doc/GDDImagenes/UI/DaiaIcon.png)
![IbbanProfile](doc/GDDImagenes/UI/IbbanIcon.png)

El sistema de Log In se encuentra en la esquina superior izquierda del menú principal. Al hacer click al botón, aparecerá un menú que permitirá al usuario introducir su nombre de usuario y contraseña para iniciar sesión, esto lo realizará introduciendo su usuario y contraseña en las secciones correspondientes y haciendo click al botón de Log In. 
En caso de querer registrarse, el usuario deberá rellenar los mismos campos que para iniciar sesión, pero deberá hacer click al botón de Register.
Un usuario tras iniciar sesión podrá ver cuantas partidas ha ganado haciendo click al mismo botón de Log In (el cual pasará a ser el botón de perfil) y hablar por el chat.
Para cerrar la ventana de Inicio de sesión, bastará con darle al botón X que aparece arriba a la izquierda de esta.

## **Chat**
                                                                                   <-- Aquí captura del menú principal que aparezca el chat activo
___
Para acceder al chat se debe pulsar el botón con el icono de bocadillo de texto y tres puntitos. Siempre y cuando el usuario esté registrado y con la sesión iniciada,  podrá enviar mensajes. Para enviar mensajes, se deberá escribir el mensaje en la caja de texto y darle al botón de enviar. El chat se cerrará al darle al botón X que aparece arriba a la izquierda de este.


## **Estado de la conexión**
___
![Net1](doc/GDDImagenes/Botones_y_Creditos/NetworkSymbol.png)
![Net2](doc/GDDImagenes/Botones_y_Creditos/NetworkSymbolError.png)
![Net3](doc/GDDImagenes/Botones_y_Creditos/NetworkSymbolSuccess.png)

Una vez se inicie la aplicación, se mostrará el primer icono de conexión, indicando que aún no ha comprobado el estado de la conexión con el servidor. Una vez se haya comprobado el estado de la conexión, cambiará al segundo o tercer icono dependiendo del estado de la conexión.
Es decir, su propósito es mostrar cuando el usuario se conecta o desconecta del servidor.

## Tutorial y Creditos
![creditos](doc/GDDImagenes/Creditos.gif)
![tutorial](doc/GDDImagenes/Aprende_a_jugar.gif)


Descripción de los tutoriales y créditos

* **Creditos:** Una slide de los créditos en los que se muestran los nombres de los componentes del grupo, el nombre del juego y el nombre del grupo, además de un agradecimiento por jugar.

* **Tutorial:** Una simple muestra de imágenes en sucesión en la que se informa de los controles a los jugadores relacionando las teclas con imágenes mostrando lo que pasa.

#### Pantalla de resultados

![ggez](doc/GDDImagenes/BocetosUI/FindeNivel2.jpg)

![ggez](doc/GDDImagenes/ggez.png)

Descripción de la pantalla de fin de nivel:

* **Ganador:** Dice claramente quien es el ganador de la partida.
* **Personajes:** Muestra a los personajes de cada jugador.
* **Puntuaciones:** Muestra las puntuaciones de los jugadores
* **Jugar de nuevo:**  Al ser pulsado inicia una nueva partida.
* **Volver al menú principal:** Al ser pulsado te lleva al menú principal.

# Arte

_Dual Interest_ tendrá estilo 2D con un carácter visual intenso, simple y con cierta inocencia irónica, ilustrado con colores vivos que resalten a los personajes y escenarios. Estos últimos serán poco detallados con el fin de que el jugador centre su atención en los niveles y la jugabilidad.

## Audio

La música en _Dual Interest_ trata de amplificar la idea de la competitividad poniendo una música de acción en la fase de competición y una más tranquila en la fase de colaboración. El juego dispone de diversos sonidos cuando se interactúa con el entorno, además de música durante los menús.

* Suma de Puntos: https://www.youtube.com/watch?v=SoeT6x0O-CM
* Tocar una trampa: https://www.youtube.com/watch?v=dLED_gBGQsk
* Hacer un click: https://creatorassets.com/a/button-sound-effects
* Fase de cooperación: https://www.youtube.com/watch?v=hdZLNZBZFlY&list=PLobY7vO0pgVIOZNKTVRhkPzrfCjDJ0CNl&index=17
* Fase de colaboración: https://www.youtube.com/watch?v=hdZLNZBZFlY&list=PLobY7vO0pgVIOZNKTVRhkPzrfCjDJ0CNl&index=17
* Música del menú: https://www.youtube.com/watch?v=9DGO2Vtppu4&list=PLobY7vO0pgVIOZNKTVRhkPzrfCjDJ0CNl&index=25
* Puerta abriendose: http://www.theallsounds.com/2018/04/door-opening-sound-effects-all-sounds.html

# Diseño de niveles

Los niveles de cooperación en Dual Interest tienen diversos elementos: suelo y pared estático(1), suelo y pared que desaparece al pulsar un botón(2) suelo y pared que aparece al pulsar un botón (3), botones (4) y puerta (5);

En este boceto de nivel se pueden apreciar todos estos elementos. Los personajes aparecen en los Spawns

![ggez](doc/GDDImagenes/BocetoNivel1.jpg)

![ggez](doc/GDDImagenes/Coop1.png)
Versión final del nivel bocetado arriba


![ggez](doc/GDDImagenes/Comp1.gif)


![ggez](doc/GDDImagenes/Comp3.gif)
 y esta
![ggez](doc/GDDImagenes/Coop2.png)

![ggez](doc/GDDImagenes/emoujon.gif)

![ggez](doc/GDDImagenes/Coop3.png)


# Implementacion de Servidor con API REST y diagrama de clases

Siguiendo una arquitectura MVC (Model View Data), el diagrama de la aplicación tiene la siguiente forma:

![Fase3](doc/GDDImagenes/Fase_3/Diagrama_fase_3.png)

## Datos (*Data*)

![Fase3](doc/GDDImagenes/Fase_3/Diagrama_fase_3_data.png)

La parte de datos (sección azul, *Data*) se ha implementado usnado una base de datos MySQL.
Dicha instancia de MySQL se ha conseguido gracias a RDS, un servicio de AWS.
Con ello, no solo se ha obtenido una base de datos, si no que se ha generado una gestión escalable de los datos gestionados.
Además, se dispone de copias de seguridad realizadas automáticamente con las que se prevenir el riesgo de los datos.
finalmente, se ha optado por este servicio para tener un sistema escalable y adaptable a futuras versiones de la apliación.

## Modelo (*Model*)

![Fase3](doc/GDDImagenes/Fase_3/Diagrama_fase_3_model.png)

Consiste en todo la gestion de la aplicación Spring gestionada en lago Java.

Las clases etiquetadas con @RestController son los las encargadas de recibir peticiones y realizar distintas peticiones segun la instruccion recibida.

La aplicación cuenta con un total de 3 clases con anotación @RestController:
* MessageController: encargada de enviar y recibir mensajes del chat
* ConnectionController: responsable de las conexiones entre cliente y servidor. Informa a los jugadores que usuarios se han conectado/desconectado mandando mensajes que se recibirán en el chat.
* PlayerController: Encargada de recibir y mandar información a la base de datos sobre los jugadores.

También, la arquitectura cuenta con clases @Entity e interfaces que heredan de *Repository*.
La etiqueta Entity se encargada de definir *Entidades* que serán almacenadas en la base de datos. Y, gracias a las interfaces de tipo *Repository*, es posible mandar y recibir objetos del tipo asociado al repositorio (p.e., en PlayerRepository, Objetos de tipo Player). 

Finalmente, la gestión de usuaios conectados/desconectados se realiza en un Thread en el que cada usuario ha de mandar una petición al servidor para comprobar si está conectado.
De no ser así, caso en el que el usuario se ha desconectado y por ende no manda ninguna petición de que está conectado, se interrumpe el hilo y se trata al usuario como desconectado.

# Vista (*View*)

![Fase3](doc/GDDImagenes/Fase_3/Diagrama_fase_3_View.png)

La capa de vista es gestionada por el código Javascript, donde la clase *MenuScene* es la encargada de mostrar, hacer interactivos y actualizar los elementos de la escena gracias a las clases *MessagesManager*, *ServerConnectionManager* y *PlayersManager*.


### Instrucciones precisas para ejecutar la aplicación

Para ejecutar la aplicación es necesaria la creación de un archivo .jar a través del pom.xml. En este proceso es necesario especificar el manifiesto del propio.jar, ya que es obligatorio especificar los plugins y dependencias del mismo. 

Una vez creado el .jar si se quiere ejecutar se puede hacer desde la consola de comandos, navegando hasta la carpeta en la que el archivo se encuentre y ejecutando el comando “introduzca comando aquí“ . En cuanto a la instalación de archivos en la máquina no debería ser necesario siempre y cuando se posean los archivos del propio juego. 

Finalmente la URL necesaria para poder jugar al juego debería de ser localhost:8080



### Hoja de ruta del desarrollo

**Plataformas**: Web

**Audiencia:** Edad/género/intereses.

**Hito 1:** Desarrollo de juego en local - 27/10/2021

**Hito 2:** Extensión del juego incluyendo un back-end que utilice tecnología REST - 29/11/2021

**Hito 3:** Extensión del juego utilizando REST y WebSockets -  21/12/2021

**Hito 4:** Beta testing / Mejoras finales. - Sin definir

