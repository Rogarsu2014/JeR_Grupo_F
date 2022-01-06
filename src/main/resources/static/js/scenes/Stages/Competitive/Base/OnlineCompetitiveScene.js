
import {cameraFadeOut} from "../../../../util/cameraEffects.js";
import {Skull} from "../../../../objects/Skull.js";
import {OnlineGameStage} from "../../Base/OnlineGameStage.js";
import {getRandomComp} from "../../../../util/ScenesRandomizer.js";

export class OnlineCompetitiveScene extends OnlineGameStage{

    constructor(sceneKey, timerTime,tilemapKey,sceneWidth) {
        super(sceneKey, "Online"+getRandomComp(), timerTime,tilemapKey,sceneWidth);
        this.backgroundMusicKey='compStageMusic';
        this.skulls=[]
    }

    create(data) {
        super.create(data);
        this.defineSkulls()
        this.setSkullsCollision()
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
    stageCompleted(){
        this.disableAllPlayersMovement()
        cameraFadeOut(this, 1000, () => {
            this.music.stop()
            this.startNextLevel()
        })
    }

}