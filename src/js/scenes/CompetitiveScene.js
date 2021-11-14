import {GameStage} from "./GameStage.js";

export class CompetitiveScene extends GameStage{
    constructor(sceneKey, nextLevelKey, timerTime) {
        super(sceneKey, nextLevelKey, timerTime,1408);
        this.backgroundMusicKey='compStageMusic';
    }
    create(data, tilemapKey) {
        super.create(data, tilemapKey);
    }
}