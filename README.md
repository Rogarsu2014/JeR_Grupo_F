# <p align="center">JeR_Grupo_F</div>
 
## Nombre_del_Juego

Dual Interest
![Titulo](doc/GDDImagenes/Botones_y_Creditos/GameTittle.png)

## Descripcion_del_Juego

*Te interesa colaborar con el enemigo para poder ganar.*

Dual Interests es un videojuego multijugador de plataformas 2D de dos personas con un estilo simplificado en el que cada
jugador controla a un personaje y combinando fases cooperativas de puzzles y fases de duelo compiten por la superioridad
en una serie de niveles en los que deberán recolectar calaveras que les darán puntos para poder ganar.

## Integrantes

*Rodrigo Garcia Suarez, r.garciasu.2019@alumnos.urjc.es, Rogarsu2014*

*Mariano Jesús De Biase Rodriguez, mj.debiase.2019@alumnos.urjc.es, marianoj27*

*Pablo Pomares Crespo, p.pomaresc.2018@alumnos.urjc.es, A6MFlygon*

*Roberto García Martín, r.garciama.2018@alumnos.urjc.es, drowlerd* 

**https://trello.com/b/JyMPz9K5/improvisation-productions**

## Nota

**A la hora de trabajar, se realizan commits estando todos los integrantes en trabajando en equipo y sumando los
archivos y código del resto en un ordenador.**


___

# <p align="center">GDD</div>

# Puntos fase 5

## Beta Testing

- [**Beta testing**](#beta-testing)
    * [**Excel**](#excel)
    * [**Github**](#github)
    * [**Resolución de issues**](#resoluci-n-de-issues)

## Mejoras finales

- [**Mejoras finales**](#mejoras-finales)
    * [**Barra de Carga**](#barra-de-carga)
    * [**Efectos visuales**](#efectos-visuales)
        + [**Calaveras**](#calaveras)
        + [**Pinchos**](#pinchos)
    * [**Animaciones y sonidos botones**](#animaciones-y-sonidos-botones)
    * [**Transiciones entre escenas**](#transiciones-entre-escenas)
    * [**Mejoras del Backend**](#mejoras-del-backend)

## Publicar

- [**Publicación**](#publicaci-n)

## Redes Sociales

- [**Redes Sociales**](#redes-sociales)
    * [**Discord**](#discord)

### Puntos fase 4

#### Documentación del protocolo utilizado sobre WebSockets

- [**Protocolo WS**](#protocolo-ws)
    * [**WebsocketGatewayHandler**](#websocketgatewayhandler)
    * [**Managers**](#managers)
        + [**Sesiones de usuarios**](#sesiones-de-usuarios)
        + [**Salas**](#salas)
        + [**BumpManager**](#bumpmanager)
        + [**PointsManager**](#pointsmanager)
        + [**Sincronización de escena**](#sincronizaci-n-de-escena)
        + [**Movimiento**](#movimiento)
        + [**Botones de la escena cooperativa**](#botones-de-la-escena-cooperativa)
        + [**Victoria de jugadores**](#victoria-de-jugadores)
        + [**ChatWS**](#chatws)

#### Actualización del diagrama de clases

* [**Diagrama UML implementación Websocket**](#diagrama-uml-implementaci-n-websocket)

#### Video

[![Fse4](https://img.youtube.com/vi/v3jkW5DUXs4/0.jpg)](https://www.youtube.com/watch?v=v3jkW5DUXs4)

#### Enlace a versión online

http://dualinterestonlineweb-env.eba-a9tqfimk.eu-west-3.elasticbeanstalk.com/

Se ha creado una aplicación almacenada en un servidor en la nube.

Gracais a ello, se consigue lo siguiente:

* **Hacer test del proyecto fuera del ámbito de la red local.**
* **Tener une version accesible para testing:** gracias a dicho enlace, el juego puede ser distribuido a particulares y
  comunidades con el fin de que prueban el juego y mejorar el producto.

## Índice

*Los acentos no están disponibles en el índice por el sistema de Markdown*

- [Introduccion](#introduccion)
    * [Concepto del juego](#concepto-del-juego)
    * [Caracteristicas principales](#caracteristicas-principales)
        - [Competitividad:](#competitividad-)
        - [Colaboracion:](#colaboracion-)
        - [Fácil de entender:](#f-cil-de-entender-)
            * [Frenético:](#fren-tico-)
    * [Genero](#genero)
    * [Proposito y publico objetivo](#proposito-y-publico-objetivo)
    * [Jugabilidad](#jugabilidad)
        - [Desplazamiento  y movilidad:](#desplazamiento--y-movilidad-)
        - [Interacción con el oponente:](#interacci-n-con-el-oponente-)
        - [Escenario:](#escenario-)
    * [Estilo visual](#estilo-visual)
    * [Alcance](#alcance)
- [Mecanicas de juego](#mecanicas-de-juego)
    * [Jugabilidad](#jugabilidad-1)
        + [Niveles](#niveles)
        + [Fase de cooperación](#fase-de-cooperaci-n)
        + [Funcionamiento del nivel](#funcionamiento-del-nivel)
        + [Tareas](#tareas)
        + [Recompensas](#recompensas)
        + [Fase de competición](#fase-de-competici-n)
    * [Puntos](#puntos)
    * [Salto](#salto)
    * [Empuje](#empuje)
    * [Desplazamiento lateral](#desplazamiento-lateral)
    * [Trampas](#trampas)
    * [Tiempos](#tiempos)
    * [Personaje](#personaje)
- [Movimiento y fisicas](#movimiento-y-fisicas)
    * [Colisiones](#colisiones)
    * [Controles](#controles)
- [Interfaz](#interfaz)
    * [Diagrama de flujo](#diagrama-de-flujo)
    * [Transicion de escenas](#--transicion-de-escenas--)
        + [Navegación Fase 3 Menu principal y juego](#navegaci-n-fase-3-menu-principal-y-juego)
    * [Flujo de gameplay](#--flujo-de-gameplay--)
    * [Game-loop](#--game-loop--)
    * [Menu principal](#--menu-principal--)
    * [Seleccion de Personajes (NO IMPLEMENTADA)](#seleccion-de-personajes--no-implementada-)
    * [Sistema de Log In](#--sistema-de-log-in--)
    * [Chat](#--chat--)
    * [Estado de la conexión](#--estado-de-la-conexi-n--)
    * [Estado de la conexión](#--estado-de-la-conexi-n---1)
    * [Tutorial y Creditos](#tutorial-y-creditos)
        - [Pantalla de resultados](#pantalla-de-resultados)
- [Arte](#arte)
    * [Audio](#audio)
- [Diseño de niveles](#dise-o-de-niveles)
- [Implementacion de Servidor con API REST y diagrama de clases](#implementacion-de-servidor-con-api-rest-y-diagrama-de-clases)
    * [Datos (Data)](#datos---data--)
    * [Modelo (Model)](#modelo---model--)
    * [Vista (View)](#vista---view--)
- [Protocolo WS](#protocolo-ws)
    * [WebsocketGatewayHandler](#websocketgatewayhandler)
    * [Managers](#managers)
        + [Sesiones de usuarios](#sesiones-de-usuarios)
        + [Salas](#salas)
        + [BumpManager](#bumpmanager)
        + [PointsManager](#pointsmanager)
        + [Sincronización de escena](#sincronizaci-n-de-escena)
        + [Movimiento](#movimiento)
        + [Botones de la escena cooperativa](#botones-de-la-escena-cooperativa)
        + [Victoria de jugadores](#victoria-de-jugadores)
    * [Diagrama UML implementación Websocket](#diagrama-uml-implementaci-n-websocket)
- [Instrucciones precisas para ejecutar la aplicacion](#instrucciones-precisas-para-ejecutar-la-aplicacion)
- [**Beta testing**](#beta-testing)
    * [**Excel**](#excel)
    * [**Github**](#github)
    * [**Resolución de issues**](#resoluci-n-de-issues)
- [**Mejoras finales**](#mejoras-finales)
    * [**Barra de Carga**](#barra-de-carga)
    * [**Efectos visuales**](#efectos-visuales)
        + [**Calaveras**](#calaveras)
        + [**Pinchos**](#pinchos)
    * [**Animaciones y sonidos botones**](#animaciones-y-sonidos-botones)
    * [**Transiciones entre escenas**](#transiciones-entre-escenas)
    * [**Mejoras del Backend**](#mejoras-del-backend)
- [**Publicación**](#publicaci-n)
- [**Redes Sociales**](#redes-sociales)
    * [**Discord**](#discord)
- [Hoja de ruta del desarrollo](#hoja-de-ruta-del-desarrollo)

# Introduccion

Este es el documento de diseño de juego de *Dual Interest*.Aquí expondremos la idea original del juego de plataformas y
competición que está en desarrollo.

## Concepto del juego

*Dual Interests* es un videojuego multijugador de plataformas 2D de dos personas con un estilo simplificado en el que
cada jugador controla a un personaje y combinando fases cooperativas de puzzles y fases de duelo compiten por la
superioridad en una serie de niveles en los que deberán recolectar calaveras que les darán puntos para poder ganar.

*Te interesa colaborar con el enemigo para poder ganar.*
![puerta nivel coop1](doc/GDDImagenes/Puerta_abriendose.gif)
![nivel competitivo 1](doc/GDDImagenes/Comp1.gif)

## Caracteristicas principales

El juego se centra en los siguientes puntos:

* #### Competitividad:

El objetivo del juego es ganar al otro jugador, aunque para ello se tenga que colaborar con este, por lo que siempre se
debe tener un ojo avizor a lo que hace el oponente.

* #### Colaboracion:

Interesa colaborar con el enemigo durante la fase de colaboración ya que esta recompensa esta acción dando puntos, cuya
finalidad es dar unas oportunidades más durante la fase de competición (las trampas restan puntos).

* #### Fácil de entender:

El hecho de no tener trama narrativa hace que el juego posea una gran facilidad para entender sus mecánicas y su
estructura.

* ##### Frenético:

Al ser una carrera contra el tiempo las acciones tomadas por los jugadores han de ser rápidas y eficientes,
transmitiendo ansiedad e intensidad.

## Genero

*Dual Interest* es un juego de plataformas, acción y puzzles. Ofrece en profundidad mecánicas similares a los juegos de
plataformas, ya que están pulidas y desarrolladas y está centrada en libertad de movimiento y desplazamiento. También se
incluyen los puzzles en las fases de colaboración. En cuanto a la acción se refiere a lo que sucede durante la fase de
competición en la que la mecánica de empuje provocará situaciones muy intensas y frenéticas.

## Proposito y publico objetivo

El objetivo de este juego es crear un ambiente divertido en el que los jugadores tengan una experiencia intensa, al
mezclar cooperación e interés, donde participen en niveles rápidos con amigos.

El juego está pensado para cualquier tipo de jugador capaz de soportar violencia moderada (14+). Al ser un juego sin
trama, no es necesario el entendimiento de una historia, quedando éste reducido a la comprensión de las normas por parte
del jugador.

## Jugabilidad

La jugabilidad de Dual Interests está determinada por varios factores que se mencionan a continuación:

* #### Desplazamiento  y movilidad:

El movimiento se realiza con las teclas W,A,S,D (para el primer jugador)  y U, H, J, K (para el segundo jugador en
local).

* #### Interacción con el oponente:

Es posible empujar y subirse sobre el oponente para completar el nivel usando el primer jugador la tecla F y el segundo
jugador la tecla L.

* #### Escenario:

El escenario del juego será de estética minimalista y colorida.

## Estilo visual

El estilo visual de Dual Interest es simplificado y colorido, siendo el nivel ilustrado con colores planos y una
estética simple y estilizada. Los personajes son seres geométricos, coloridos con estética similar al escenario.

![Menu](doc/GDDImagenes/MenuImage.png)
*Imagen de fondo del menú principal*

![Calavera](doc/GDDImagenes/Personajes/SpriteSkulls.png)

*SpriteSheet de la calavera*

## Alcance

La prioridad se centrará en ofrecer al jugador suficiente variedad de mapas y de objetos en la versión base para que la
experiencia sea lo más innovadora posible. De cara al futuro se añadirán nuevos mapas y objetos, ofreciendo así variedad
al jugador y mecánicas (agarrar, agacharse, entre otras) para que los nuevos contenidos y los previos puedan
experimentarse de diferentes maneras.

# Mecanicas de juego

Aquí se hablará más en profundidad de las mecánicas y funcionamiento de las mismas en Dual Interest. Principalmente nos
centraremos en ampliar los conceptos que ya han sido introducidos previamente y expandirlos con el fin de que se
comprenda mejor su estructura.

## Jugabilidad

### Niveles

Los jugadores tendrán que superar un total de 3 rondas de 2 niveles, uno cooperativo y uno competitivo. Los niveles
tendrán unos momentos en el que ambos jugadores cooperarán para poder acceder a la siguiente fase, en la que competirán
entre ellos para ganar puntos.

### Fase de cooperación

En esta fase deberán ayudarse ambos oponentes para poder desbloquear el mapa y llegar a la salida. Habrá un puzzle que
tienen que resolver, compuesto por una serie de botones que hay que pulsar en un orden determinado y por un jugador
determinado. Este jugador se puede deducir ya que el color del botón es el mismo que el del jugador.

### Funcionamiento del nivel

- En cada nivel, los jugadores tendrán que completar tareas (pulsación de botones) para ayudarse entre ellos y poder
  avanzar en el nivel.
- Si un jugador no completa la tarea, es decir, no está cooperando, se verá penalizado. Cada jugador tiene el mismo
  número de tareas que completar. Hay cierto tiempo para completar los niveles, cuando se completa una tarea, se añade
  tiempo extra al contador (suma de 5 segundos).

### Tareas

Una tarea puede ser varias cosas:

- Pulsar un botón.
- Ser el soporte para que el otro jugador salte más alto (se sobreentiende que al ser botón pulsado por el otro jugador
  este ha sido ayudado y se recompensa a los dos).

### Recompensas

- Cada vez que un jugador completa una tarea, se le dará puntos como recompensa.
- Si un jugador no completa una tarea, se le restará 100 puntos.

### Fase de competición

El siguiente paso para el jugador será competir y conseguir más puntos que el otro, a la vez que impedirle obtener
puntos mediante métodos como el empuje, que se tratará más adelante. Estos niveles a veces son algo más grandes que los
niveles de cooperación y se extienden en una dirección concreta: vertical u horizontal. Los verticales de momento no
modifican el tamaño de la pantalla. Ambos tipos de mapas tienen calaveras repartidas por su escenario donde ambos
jugadores compiten por ver quien es el que consigue más calaveras.

En los niveles horizontales, los jugadores tendrán que tener cuidado con trampas que les complican esta tarea, mientras
que en los niveles verticales, el impedimento será la habilidad del jugador haciendo saltos por las plataformas.

## Puntos

Se otorgarán puntos a los jugadores al recolectar calaveras y colaborar con el jugador (en este último caso se refiere a
la fase de colaboración, y en esta los puntos son directamente sumados). Estos puntos serán el principal indicador de
victoria para cada partida. Dichos puntos se guardarán a lo largo de la partida, compuesta por varias rondas. La
cantidad de puntos ganados por la recolección de calaveras y acciones cooperativas serán constantes. Por otra parte la
cantidad de puntos perdidos es distinta, ya que las trampas restan 50 puntos mientras que no completar una tarea
cooperativa resta 100 puntos. Cabe destacar el hecho de que el número de calaveras durante la fase de competición va a
ser impar, de manera que se intente que no haya empates durante esta fase, sino que haya un ganador por poco que sea.

## Salto

La mecánica del salto está pensada de forma que de juego a un desplazamiento entre plataformas y hacia ellas de manera
eficiente y rápida. Está pensado de forma que la distancia de salto sea constante, sin depender de la fuerza con la que
se presiona la tecla o el tiempo pulsado. Asimismo el salto puede ser sobre otro jugador, lo cual está pensado tanto
para las fases de cooperación como las de competición.

## Empuje

El empuje está diseñado como una mecánica de competición, cuyo propósito es el impedimento o la obstaculización de las
acciones del oponente. Sin embargo esta acción estará disponible también en la fase de cooperación, con el fin de que si
lo ven necesario los jugadores hagan uso de ella. Al igual que con el salto, el empuje desplazará al oponente una
distancia determinada y constante.
![Empuje](doc/GDDImagenes/emoujon.gif)

## Desplazamiento lateral

El jugador podrá desplazarse en un solo plano, pudiendo moverse a lo ancho (eje horizontal) y a lo alto (eje vertical)
mediante el uso de las mecánicas de movimiento previamente definidas y elementos del escenario.

## Trampas

Las trampas son mecanismos presentes en el escenario que dificultan el avance a los jugadores durante la fase de
competición. Las trampas actuales están representadas mediante unos pinchos rocosos que salen del suelo. Estas trampas
al caer sobre ellas hacen que el jugador reaparezca en la posición inicial del nivel y se le restan 50 puntos. Además el
jugador se queda inmovilizado durante 2 segundos como penalización.

![trampa](doc/GDDImagenes/Nivel/Trampa3.png)

*Sprite actual de la trampa*

## Tiempos

Los jugadores tendrán un límite de tiempo para completar los diferentes objetivos. Hay un tiempo para las tareas en la
fase cooperativa, y otro para la fase competitiva. El contador se encontrará centrado en la parte superior de la
pantalla. Se les dará a los jugadores 15 segundos o menos en la fase de cooperación para realizar sus tareas y se
otorgará una bonificación de tiempo cuando un jugador complete una. Para la fase competitiva los jugadores tendrán
aproximadamente 30 segundos para superar los obstáculos, luchar y avanzar hacia los puntos.

## Personaje

Los personajes presentes en el juego son controlados por los jugadores, sin NPC’s al ser el juego exclusivamente
multijugador. Dichos personajes tienen una complexión pequeña y ágil acorde con el espíritu frenético del juego, además
de que un tamaño grande sería una molestia a la hora de desplazarse.

En cuanto al aspecto físico se distinguen dos personajes geométricos diferenciables. Ambos con formas distintas y
brazos, piernas y ojos.
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

Cada escenario contará con paredes y plataformas que tendrán colisión con el jugador. Los jugadores entre sí también
tendrán colisión. Por otro lado, las calaveras podrán ser tocadas por los jugadores para ser obtenidas. Una vez
obtenidas, desaparecerán.

## Controles

El control de movimiento se realiza con el teclado. El desplazamiento lateral se realizará con las teclas A y D para
moverse a izquierda y derecha respectivamente. El movimiento de salto se realizará con la tecla W. Se encuentra la
opción de acelerar la caída usando el botón S. El empuje será realizado con la tecla F, empujando y desplazando al
jugador rival hacia donde el jugador que empuja está mirando. En teclado, el segundo jugador se moverá con H y K a
izquierda y derecha, saltará con la U, descenderá con la J y empujará con la L

![tut1](doc/GDDImagenes/Tutorial/players4.png)
![teclas jugadores](doc/GDDImagenes/Tutorial/Versiones_completas/A-press2.png)
![teclas jugadores](doc/GDDImagenes/Tutorial/Versiones_completas/D-press2.png)
![teclas jugadores](doc/GDDImagenes/Tutorial/Versiones_completas/W-press2.png)
![teclas jugadores](doc/GDDImagenes/Tutorial/Versiones_completas/F-press2.png)

En caso de usar control por mando, la palanca izquierda permite mover al jugador, al pulsar el botón inferior derecho se
produciría el salto y los botones R2 y L2 permitirían los movimientos de empuje.

# Interfaz

## Diagrama de flujo

Se desarrollarán varios diagramas para mostrar: transición de escenas, flujo de *gameplay*, *game-loop*.

## **Transicion de escenas**

![menu boceto](doc/GDDImagenes/Diagramas/Untitled_Diagram.png)

### Navegación Fase 3 Menu principal y juego

![navegacion_fase_3](doc/GDDImagenes/Diagramas/Tareas_Fase_3.png)

## **Flujo de gameplay**

![menu boceto](doc/GDDImagenes/Diagramas/Juego_diagrama.png)

## **Game-loop**

![menu boceto](doc/GDDImagenes/Diagramas/game_loop.png)

## **Menu principal**

![menu boceto](doc/GDDImagenes/BocetosUI/Menu.jpg)
___
![menu principal](doc/GDDImagenes/Menu_principal.gif)
___
![menu principal2](doc/GDDImagenes/MenuPrincipalActualizado.png)

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
![menuLoginScreen](doc/GDDImagenes/MenuLoginScreen.png)
___
![menuPlayerScreen](doc/GDDImagenes/MenuPlayerScreen.png)
![DaiaProfile](doc/GDDImagenes/UI/DaiaIcon.png)
![IbbanProfile](doc/GDDImagenes/UI/IbbanIcon.png)

El sistema de Log In se encuentra en la esquina superior izquierda del menú principal. Al hacer click al botón,
aparecerá un menú que permitirá al usuario introducir su nombre de usuario y contraseña para iniciar sesión, esto lo
realizará introduciendo su usuario y contraseña en las secciones correspondientes y haciendo click al botón de Log In.
En caso de querer registrarse, el usuario deberá rellenar los mismos campos que para iniciar sesión, pero deberá hacer
click al botón de Register. Un usuario tras iniciar sesión podrá ver cuantas partidas ha ganado haciendo click al mismo
botón de Log In (el cual pasará a ser el botón de perfil) y hablar por el chat. Para cerrar la ventana de Inicio de
sesión, bastará con darle a la flecha que aparece en el menú.

## **Chat**

![menuChat](doc/GDDImagenes/MenuChat.png)
___
Para acceder al chat se debe pulsar el botón con el icono de bocadillo de texto y tres puntitos. Siempre y cuando el
usuario esté registrado y con la sesión iniciada, podrá enviar mensajes. Para enviar mensajes, se deberá escribir el
mensaje en la caja de texto y darle al botón de enviar. El chat se cerrará al darle al botón X que aparece arriba a la
izquierda de este.

Además, se usará dicho chat para **mostrar la conexión y desconexión de clientes**. Los clientes desconectados se
mostrarán con un texto rojo y los conectados con un texto verde.

## **Estado de la conexión**

___
![Net1](doc/GDDImagenes/Botones_y_Creditos/NetworkSymbol.png)
![Net2](doc/GDDImagenes/Botones_y_Creditos/NetworkSymbolError.png)
![Net3](doc/GDDImagenes/Botones_y_Creditos/NetworkSymbolSuccess.png)

Una vez se inicie la aplicación, se mostrará el primer icono de conexión, indicando que aún no ha comprobado el estado
de la conexión con el servidor. Una vez se haya comprobado el estado de la conexión, cambiará al segundo o tercer icono
dependiendo del estado de la conexión. Es decir, su propósito es mostrar cuando el usuario se conecta o desconecta del
servidor.

## **Estado de la conexión**

___
![UsersConnected](doc/GDDImagenes/Botones_y_Creditos/User_Connected.png)

Se usará la imagen superior para mostrar cuantos usuarios hay conectados actualmente.

## Tutorial y Creditos

![creditos](doc/GDDImagenes/Creditos.gif)
![tutorial](doc/GDDImagenes/Aprende_a_jugar.gif)

Descripción de los tutoriales y créditos

* **Creditos:** Una slide de los créditos en los que se muestran los nombres de los componentes del grupo, el nombre del
  juego y el nombre del grupo, además de un agradecimiento por jugar.

* **Tutorial:** Una simple muestra de imágenes en sucesión en la que se informa de los controles a los jugadores
  relacionando las teclas con imágenes mostrando lo que pasa.

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

_Dual Interest_ tendrá estilo 2D con un carácter visual intenso, simple y con cierta inocencia irónica, ilustrado con
colores vivos que resalten a los personajes y escenarios. Estos últimos serán poco detallados con el fin de que el
jugador centre su atención en los niveles y la jugabilidad.

## Audio

La música en _Dual Interest_ trata de amplificar la idea de la competitividad poniendo una música de acción en la fase
de competición y una más tranquila en la fase de colaboración. El juego dispone de diversos sonidos cuando se interactúa
con el entorno, además de música durante los menús.

* Suma de Puntos: https://www.youtube.com/watch?v=SoeT6x0O-CM
* Tocar una trampa: https://www.youtube.com/watch?v=dLED_gBGQsk
* Hacer un click: https://creatorassets.com/a/button-sound-effects
* Fase de cooperación: https://www.youtube.com/watch?v=hdZLNZBZFlY&list=PLobY7vO0pgVIOZNKTVRhkPzrfCjDJ0CNl&index=17
* Fase de colaboración: https://www.youtube.com/watch?v=hdZLNZBZFlY&list=PLobY7vO0pgVIOZNKTVRhkPzrfCjDJ0CNl&index=17
* Música del menú: https://www.youtube.com/watch?v=9DGO2Vtppu4&list=PLobY7vO0pgVIOZNKTVRhkPzrfCjDJ0CNl&index=25
* Puerta abriendose: http://www.theallsounds.com/2018/04/door-opening-sound-effects-all-sounds.html

# Diseño de niveles

Los niveles de cooperación en Dual Interest tienen diversos elementos: suelo y pared estático(1), suelo y pared que
desaparece al pulsar un botón(2) suelo y pared que aparece al pulsar un botón (3), botones (4) y puerta (5);

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

La parte de datos (sección azul, *Data*) se ha implementado usnado una base de datos MySQL. Dicha instancia de MySQL se
ha conseguido gracias a RDS, un servicio de AWS. Con ello, no solo se ha obtenido una base de datos, si no que se ha
generado una gestión escalable de los datos gestionados. Además, se dispone de copias de seguridad realizadas
automáticamente con las que se prevenir el riesgo de los datos. finalmente, se ha optado por este servicio para tener un
sistema escalable y adaptable a futuras versiones de la apliación.

## Modelo (*Model*)

![Fase3](doc/GDDImagenes/Fase_3/Diagrama_fase_3_model.png)

Consiste en todo la gestion de la aplicación Spring gestionada en lago Java.

Las clases etiquetadas con @RestController son los las encargadas de recibir peticiones y realizar distintas peticiones
segun la instruccion recibida.

La aplicación cuenta con un total de 3 clases con anotación @RestController:

* MessageController: encargada de enviar y recibir mensajes del chat
* ConnectionController: responsable de las conexiones entre cliente y servidor. Informa a los jugadores que usuarios se
  han conectado/desconectado mandando mensajes que se recibirán en el chat.
* PlayerController: Encargada de recibir y mandar información a la base de datos sobre los jugadores.

También, la arquitectura cuenta con clases @Entity e interfaces que heredan de *Repository*. La etiqueta Entity se
encargada de definir *Entidades* que serán almacenadas en la base de datos. Y, gracias a las interfaces de tipo *
Repository*, es posible mandar y recibir objetos del tipo asociado al repositorio (p.e., en PlayerRepository, Objetos de
tipo Player).

Finalmente, la gestión de usuaios conectados/desconectados se realiza en un Thread en el que cada usuario ha de mandar
una petición al servidor para comprobar si está conectado. De no ser así, caso en el que el usuario se ha desconectado y
por ende no manda ninguna petición de que está conectado, se interrumpe el hilo y se trata al usuario como desconectado.

## Vista (*View*)

![Fase3](doc/GDDImagenes/Fase_3/Diagrama_fase_3_View.png)

La capa de vista es gestionada por el código Javascript, donde la clase *MenuScene* es la encargada de mostrar, hacer
interactivos y actualizar los elementos de la escena gracias a las clases *MessagesManager*, *ServerConnectionManager*
y *PlayersManager*.

# Protocolo WS

Para el protocolo se ha usado la siguiente implementacion:

WebsocketGatewayHandler:
Es la clase que se encarga de gestionar la conexión de los clientes. En ella, para gestionar que mensaje se ha realizado
se ha empleado un sistema de Managers.

Los Manager son clases responsables de una carácteristica concreta del programa. Las carácterísticas controladas en la
aplicación son:

* Sesiones de usuarios
* Salas
* Sincrinización de escena
* Movimiento
* Botones de la escena cooperativa

## WebsocketGatewayHandler

Extiende de la clase *TextWebSocketHandler*.

Su función es ser entre el cliente y dichos controladores para realizar las operaciones necesarias.

![img.png](doc/GDDImagenes/Fase_4/img.png)

Cuenta con un Mapa Concurrente de Managers, con clave una String que identifica al Manager en concreto, y como valor un
Manager.

Cuando se establece la conexión, todos los Managers son "avisados" de que se hay una nueva conexión:

![img.png](doc/GDDImagenes/Fase_4/connectionEstabliedWebsocketGW.png)

En cuanto al manejo de mensajes, primero se lee el tipo del mensaje recibido y se guarda en la variable .

![img.png](doc/GDDImagenes/Fase_4/getType.png)
![img.png](doc/GDDImagenes/Fase_4/typeDefinition.png)

Finalmente, con el tipo de mensaje obtenido, se llama al manejador almacenado en el diccionario y se invoca su
respectivo método para manejar el mensaje enviado por el cliente:

![img.png](doc/GDDImagenes/Fase_4/handleMessageGW.png)

## Managers

Los *Managers* son clases encargadas de una responsabilidad concreta del código.

Todos los Managers heredan de una clase abstracta BaseManager.java, la cual define la forma que tienen los *Managers*.

![img.png](doc/GDDImagenes/Fase_4/BaseManager.png)

* Sesiones de usuarios  **SessionsManager.java**
* Salas **RoomManager.java**
* Sincrinización de escena **StageSynchronizer.java**
* Movimiento **MovementManager.java**
* Botones de la escena cooperativa **CooperativeButtonsManager.java**

### Sesiones de usuarios

**Manager responsable de los datos:** Sessiones actuales en la aplicación

Es el encargado de tener referencias de las sesioens en la aplicación.

![img_1.png](doc/GDDImagenes/Fase_4/SessionsManager.png)

Controla cuando una sesión se conecta y desconecta.

### Salas

**Manager responsable del dato:** Emparejamiento de jugadores en salas y obtención de la pareja de la sala.

Es el encargado de realizar las operaciones de creación de salas, la de unión a una sala ya creada y la de buscar la
pareja de un usuario durante el envío de datos a través de websockets.

![img.png](doc/GDDImagenes/Fase_4/RoomManagerAtributes.PNG)

Cuando se envía una petición de Host la clase crea una clave aleatoria de 6 cifras (pueden ser tanto letras como
números) y crea una pareja vacía. Esta pareja se guarda en un mapa estático (Singleton) accesible desde cualquier clase.

![img.png](doc/GDDImagenes/Fase_4/RoomManagerHost.PNG)

Cuando por el contrario llega una petición de Join la clase busca en el mapa la clave. Si la encuentra comprueba si la
pareja esta llena (ya hay dos jugadores) o está vacía. Si está vacía entonces introduce al jugador a la pareja y marca
la sala como llena.

![img.png](doc/GDDImagenes/Fase_4/RoomManagerJoin.PNG)

Finalmente el método getPair() busca en el mapa la posición donde se encuentran las sesiones emparejadas y devuelve la
otra sesión con la que se está en este momento.

![img.png](doc/GDDImagenes/Fase_4/RoomManagerGetPair.PNG)

### BumpManager

**Manager responsable del dato:** Mandar las colisiones y el empujon.

Método de funcionamiento similar al de la mayoría, el cuál recibe un valor que indica si los personajes están
colisionando o no y manda a la pareja un aviso de que está siendo empujado (siempre y cuando estén colisionando)

![img.png](doc/GDDImagenes/Fase_4/BumpManager.PNG)

### PointsManager

**Manager responsable del dato:** Mandar los puntos recogidos.

Método de funcionamiento similar al de la mayoría, el cuál recibe un valor que marca el valor de la puntuación del
rival, el cual sobreescribe el valor local.

![img.png](doc/GDDImagenes/Fase_4/PointsManager.PNG)

### Sincronización de escena

**Manager responsable del dato:** sincronización del inicio de las escenas.

Se encarga de sincronizar el inicio de las escenas y que ambos jugadores comienzen a la vez.

De esta manera, el reloj se sincroniza, y el comienzo de la escena ocurre a la vez para dos jugadores conectados en una
misma sala.

![img_2.png](doc/GDDImagenes/Fase_4/stageSynchronizerManager.png)

Al recibir un mensaje de tipo "StageSynchronizer" se cambia el valor booleano asociado a la sesión que manda el mesnaje
a true.

Después, se comprueba si el par asociado a dicho jugador está listo también.

![img.png](doc/GDDImagenes/Fase_4/stageSynchronizerHandleMessage.png)

![img_1.png](doc/GDDImagenes/Fase_4/stageSynchronizerTryNotify.png)

### Movimiento

**Manager responsable del dato:** movimiento del personaje.

Es responsable de hacer llegar al otro cliente conectado a la misma sala su posición en la escena.

Para ello se usa la dirección actual en la que se está moviendo el jugador.

![img_1.png](doc/GDDImagenes/Fase_4/movementManager.png)

Al recibir un mensaje, se obtiene en forma de objeto la dirección a la que se mueve el jugador y esta se envía al par
correspondiente del cliente:

![img_2.png](doc/GDDImagenes/Fase_4/movementManagerReceiveMEssage.png)

![img_3.png](doc/GDDImagenes/Fase_4/movementManagerSendPositionPair.png)

### Botones de la escena cooperativa

**Manager responsable del dato:** pulsación de botones.

Gracias a los botones el jugador puede avanzar por las salas cooperativas.

Dada la importancia que tienen, se va a controlar cuando ha sido pulsado un botón.

![img_4.png](doc/GDDImagenes/Fase_4/cooperativeButtonsManager.png)

La infromación a mandar es el indice del boton pulsado, la cual se manda al par asociado al cliente que envía el
mensaje.

![img_5.png](doc/GDDImagenes/Fase_4/CooperativeBuutonsReceiveMessage.png)

![img_6.png](doc/GDDImagenes/Fase_4/cooperativeButtonsNotifyPair.png)

### Victoria de jugadores

**Manager responsable del dato:** añadir un punto al contador de victorias del ganador.

Se encargad e recibir el nombre de usuario del jugador ganador y actualizar su definición en la abse de datos con una
victoria más.

![img_1.png](doc/GDDImagenes/Fase_4/PlayerVictoryManager.png)

### ChatWS

![UML_WS.png](doc/GDDImagenes/Fase_4/EsquemaChatWS.png)

El funcionamiento del chat en Websockets es el siguiente:

Al entrar al chat por primera vez, el programa detecta si es la primera vez que se ha entrado al chat, si lo es, pasa a
solicitar los mensajes anteriores mandando un mensaje "anzuelo" al servidor, el cual propicia que se envíen todos los
mensajes guardados anteriormente debido a un tipo interno propio del mensaje. Al mandar el mensaje "anzuelo", el
programa también activa un eventlistener el cual reacciona a los mensajes enviados por el servidor parseándolos y
transformándolos a datos que puedan ser imprimidos por pantalla.

En cuanto al envío de mensajes, una vez que el usuario envía un mensaje dándole al botón Send, el programa recoge y
envía el mensaje al servidor, este es recibido y clasificado de acuerdo con un tipo interno genérico, el cual le dice
que es un mensaje de chat común y lo almacena en el historial de mensajes. Una vez almacenado, lo envía a todos los
usuarios conectados al chat. Al enviarse, se activa el eventListener activado anteriormente y lo transforma en datos que
a continuación son impresos por pantalla.

El motivo principal por el que se pasó de APIs REST a Webscokets el chat fue para evitar que el cliente estuviera
pidiendo constantemente al servidor una actualización de los mensajes ya fuera la respuesta dada por el servidor
positiva (hay mensajes nuevos) o negativa (no hay mensajes nuevos). Con Websockets se simplifica esto, ya que la
petición por parte del cliente solo se hace al entrar y cuando se envían mensajes, mientras que quien entrega los
mensajes nuevos es el servidor de manera automática.

## Diagrama UML implementación Websocket

![UML_WS.png](doc/GDDImagenes/Fase_4/Diagrama_Websockets.png)

# Instrucciones precisas para ejecutar la aplicacion

Para ejecutar la aplicación es necesaria la creación de un archivo .jar. que se genera en el proceso *install* a través
del pom.xml.

Además, es necesario especificar el manifiesto del propio .jar, para que trás ejecutar la aplicación por la Temrinal de
sistema, este ejecute la clase **Aplication.java* automáticamente. Para ello hay que usar los siguientes plugins:

´´´

    <build>
        <plugins>
            <!--Plugin to define Manifest, in this way, jar will run automatically-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>2.4</version>
                <configuration>
                    <archive>
                        <manifest>
                            <mainClass>es.urjc.code.daw.Application</mainClass>
                        </manifest>
                    </archive>
                </configuration>
            </plugin>
            <!--Plugin to build spring properties to make Spring Boot application funcitonal-->
                <plugin>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-maven-plugin</artifactId>
                </plugin>

        </plugins>
    </build>

´´´

Para ejecutar la aplicación, es necesario tener Java instalado. La aplicación está desarrollada con el JDK 1.8.

Una vez creado el .jar si se quiere ejecutar se puede hacer desde la consola de comandos, navegando hasta la carpeta en
la que el archivo se encuentre y ejecutando el comando:

**Fase 3**

´´´

     java -jar Dual_Interest-0.0.3.jar

´´´

**Fase 4**

´´´

     java -jar Dual_Interest-0.0.4.jar

´´´

**Fase 5**

´´´

     java -jar Dual_Interest-1.0.0.jar

´´´

Finalmente la URL necesaria para poder jugar al juego debería de ser ***localhost:8080***

# Beta testing

La ejecución del Beta-testing fue realizada por miembros del propio grupo. Estos miembros del grupo se encargaron de
probar y "romper" lo máximo posible la aplicación y de documentar los resultados de ello.

Para la resolución de los issues generados en el Beta testing se ha seguido el siguiente patrón:

1. Recogida de los resultados obtenidos en el testing en el excel
2. Subida de los issues a Github
3. Resolución de los issues por los desarrolladores

## Excel

Estos resultados fueron puestos en un excel, en el cual se documenta el tipo y nombre del problema, la prioridad o
impacto de los errores una descripción de lo que causan y como lo han logrado realizar.

## Github

Una vez documentados, el propio excel genera unos textos que sirven para ser introducidos como título y cuerpo en los
Issues de Github.

## Resolución de issues

Una vez generado el Issue, los responsables de las áreas en específico indicadas en el tipo han de ser asignados a estos
issues, que deberán realizarse y cerrarse de a cuerdo a la prioridad estimada.

La idea de este formato para el Beta testing es poder tener los issues con un formato uniforme y con ello crear una
pipeline de trabajo lo más eficiente posible.

# Mejoras finales

## Barra de Carga

![barra de carga](doc/GDDImagenes/Gifs/barra_de_carga.gif)

Se ha implementado una barra de carga para hacerle entender al jugador los recursos que se cargan al inicio dle juego

## Efectos visuales

Se han añadido los siguientes efectos visuales para mejorar la experiencia y el gamefeel del jugador:

### Calaveras

![Calaveras](doc/GDDImagenes/Gifs/effecto_calavera.gif)
Las calaveras van a la posicion del jugador que las recoja.

### Pinchos

Los pinchos hacen que apareza una animacion de "muerte" y que la cámara tiemble, dando así el efecto de golpe al
jugador.
![Calaveras](doc/GDDImagenes/Gifs/effecto_pinchos.gif)

## Animaciones y sonidos botones

![barra de carga](doc/GDDImagenes/Gifs/animaciones_UI.gif)

Se han añadido una animación a los botones de la interfaz para dar a entender al jugador sobre que boton está
interactuando

Además tienen un efecto de sonido para cuando se está sobre el elemento y para cuando se da click

## Transiciones entre escenas

![barra de carga](doc/GDDImagenes/Gifs/transiciones.gif)

Se han añadido transiciones entre ciertas escenas que no disponian de una, como el menu principal y la escena de
Victoria/Derrota

## Mejoras del Backend

* **Movimiento mejorado**: ahora el movimiento es más estable.
* **Sincronización del tiempo**: ahora más robusto gracias a que el tiempo para cada partida es gestionado por el
  servidor
* **Conexión/desconexión**: ahora se realizan con el protocolo Websocket haciendolo más eficiente y menos propenso a
  fallos
* **Limpieza de listeners entre escenas**: al acabar una escena, los listeners que ha de usar dicha escena para recibir
  mensajes se han eliminado, consiguiendo así menos errores.
* **Actualización de puntos**: los puntos aparecen actualizados en el menu principal tras ganar una partida online.

Además, se cuenta con un servidor de heroku con el que almancenar la aplicación y poder tener la infraestructura
necesaria para un juego online.

# Publicación

El juego se ha publicado en los siguientes portales:

[itch.io](https://improvisation-productions.itch.io/dual-interest)

[Newgrounds](https://www.newgrounds.com/portal/view/829271?updated=1642052026) **En supervisión**

[Outpan](https://www.outpan.com/app/7e74de5240/dual-interest)

[Gamejolt](https://gamejolt.com/games/dual-interest/679881)

# Redes Sociales

*Click en los siguientes iconos para acceder al respectivo portal.*

[![barra de carga](doc/GDDImagenes/RedesSociales/facebook.png)](https://www.outpan.com/app/7e74de5240/dual-interest)
[![barra de carga](doc/GDDImagenes/RedesSociales/twitter.png)](https://twitter.com/ImProductions21?s=20)

## Discord

Además, se ha usado Discord como red social en la que los integrantes del grupo han podido tener la oprotunidad de
interactuar con la comunidad, aprender de otros desarrolladores y dar a conocer el juego:

![img.png](doc/GDDImagenes/RedesSociales/discord_help.png)

![img.png](doc/GDDImagenes/RedesSociales/discord_showcase.png)
También se ha creado un documento en el que aquellos usuarios que lo deseen podrán dejar su feedback.

Formulario:

https://forms.gle/fqBKV8QSKm4jbuc76

# Hoja de ruta del desarrollo

**Plataformas**: Web

**Audiencia:** Edad/género/intereses.

<del> **Hito 1:** Desarrollo de juego en local </del> - 27/10/2021

<del> **Hito 2:** Extensión del juego incluyendo un back-end que utilice tecnología REST </del>- 29/11/2021 

<del> **Hito 3:** Extensión del juego utilizando REST y WebSockets </del>- 21/12/2021

<del> **Hito 4:** Beta testing / Mejoras finales. </del>- 12/01/2022 

