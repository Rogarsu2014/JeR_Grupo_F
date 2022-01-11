
import {cameraFadeOut} from "../../../../util/cameraEffects.js";
import {Skull} from "../../../../objects/Skull.js";
import {OnlineGameStage} from "../../Base/OnlineGameStage.js";
import {getNextRandomCoop} from "../../../../util/ScenesRandomizer.js";

import {OnlineTrap} from "../../../../objects/online/OnlineTrap.js";

export class OnlineCompetitiveScene extends OnlineGameStage{

    constructor(sceneKey, timerTime,tilemapKey,sceneWidth) {
        super(sceneKey, timerTime,tilemapKey,sceneWidth);
        this.backgroundMusicKey='compStageMusic';
        this.skulls=[]
        this.traps=[]
    }

    create(data) {
        super.create(data);
        this.defineSkulls()
        this.setSkullsCollision()
        this.setTraps()
        this.nextLevelKey="Online"+getNextRandomCoop()
    }

    setPlayerPosition(playerIndex, x, y) {
        super.setPlayerPosition(playerIndex,x,y);
        this.players[playerIndex].setPlayerInitialPosition(x,y);
    }

    onTimeOverPrimitive() {
        cameraFadeOut(this, 1000, () => {
            this.music.stop()
            this.startNextLevel()
        })
    }

    defineSkulls(){
        throw new Error("Skulls to be implemented")
    }
    setSkullsCollision(){
        let counter=this.skulls.length;
        for (let i = 0; i < this.skulls.length; i += 1) {
            this.physics.add.collider(this.players[0], this.skulls[i],  ()=> {
                this.skulls[i].remove(this.players[0]);
                this.scores[0].setText("Player 1: " + this.players[0].points);

                if (--counter == 0) {
                    this.stageCompleted();
                }

            });
            this.physics.add.collider(this.players[1], this.skulls[i], ()=> {

                this.skulls[i].remove(this.players[1]);
                this.scores[1].setText("Player 2: " + this.players[1].points);

                if (--counter == 0) {
                    this.stageCompleted();
                }

            });
        }
    }

    addSkull(x,y){
        this.skulls.push(new Skull(this, x, y, "skull"));
    }
    
    
    
    setTraps(){
        this.primitiveSetTraps()
        this.setTrapsCollisions()
    }
    setTrapsCollisions(){
        if (this.traps.length===0) return;
        for (let i = 0; i < this.traps.length; i += 1) {
            this.physics.add.collider(this.players[0], this.traps[i],  ()=> {
                this.traps[i].harm(this.players[0]);
                this.scores[0].setText("Jugador 1: " + this.players[0].points);
            });
            this.physics.add.collider(this.players[1], this.traps[i],  ()=> {
                this.traps[i].harm(this.players[1]);

                this.scores[1].setText("Jugador 2: " + this.players[1].points);
            });
        }
    }
    
    stageCompleted(){
        this.disableAllPlayersMovement()
        cameraFadeOut(this, 1000, () => {
            this.music.stop()
            this.startNextLevel()
        })
    }
    addTrap(x,y){
        this.traps.push(new OnlineTrap(this, x, y, "trap"))
    }

    primitiveSetTraps() {}
}