
import {cameraFadeOut} from "../../../../util/cameraEffects.js";
import {Skull} from "../../../../objects/Skull.js";
import {OnlineGameStage} from "../../Base/OnlineGameStage.js";
import {getNextRandomCoop} from "../../../../util/ScenesRandomizer.js";

import {OnlineTrap} from "../../../../objects/online/OnlineTrap.js";

export class OnlineCompetitiveScene extends OnlineGameStage{

    constructor(sceneKey, timerTime,tilemapKey,sceneWidth) {
        super(sceneKey, timerTime,tilemapKey,sceneWidth);
        this.backgroundMusicKey='compStageMusic';

    }

    create(data) {
        super.create(data);
        this.skulls=[]
        this.traps=[]
        this.defineSkulls()
        this.setSkullsCollisions()
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
    setSkullsCollisions() {
        let counter = this.skulls.length;
        for (let i = 0; i < this.skulls.length; i += 1) {
            for (let j = 0; j < this.players.length; j++) {
                this.physics.add.collider(this.players[j], this.skulls[i], () => {
                    this.skulls[i].remove(this.players[j],this.scores[j].x,this.scores[j].y);

                    let playerIndex=j+1;
                    this.scores[j].setText("Player "+ playerIndex +": " + this.players[j].points);

                    if (--counter === 0) {
                        this.stageCompleted();
                    }
                });
            }
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
        super.stageCompleted()
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