

let victoryStageKey="GameCompletedScene"

var coopScenes=[]
var compScenes=[]

var remainingCoopScenes=[]
var remainingCompScenes=[]


export function addCoopScene(sceneKey){
    coopScenes.push(sceneKey)
}

export function addCompScene(sceneKey){
    compScenes.push(sceneKey)
}

export function redefineArrays(){
    remainingCoopScenes=coopScenes;
    remainingCompScenes=compScenes;
}

export function getRandomCoop(){
    if (coopScenes.length===0)
        return victoryStageKey
    return getRandomScene(remainingCoopScenes)
}


export function getRandomComp(){
    return getRandomScene(remainingCompScenes)
}


function getRandomScene(sceneArray){
    let randomIndex=Math.floor(Math.random()*sceneArray.length);
    let randomScene=sceneArray[randomIndex];
    sceneArray.splice(randomIndex,1);
    return randomScene
}