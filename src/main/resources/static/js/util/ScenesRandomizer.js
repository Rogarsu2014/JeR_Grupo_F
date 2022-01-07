

let victoryStageKey="GameCompletedScene"

var coopScenes=[]
var compScenes=[]

var randomCoopScenes=[]
var randomCompScenes=[]


export function getScenesOrder(){
    let scenes={
        randomCoopScenes: randomCoopScenes,
        randomCompScenes: randomCompScenes
    }
    return JSON.stringify(scenes) 
}

export function setScenesOrder(scenesOrderJSON){
    let scenesOrder = JSON.parse(scenesOrderJSON);
    
    randomCoopScenes= scenesOrder.randomCoopScenes
    randomCompScenes= scenesOrder.randomCompScenes
}

export function addCoopScene(sceneKey){
    coopScenes.push(sceneKey)
}

export function addCompScene(sceneKey){
    compScenes.push(sceneKey)
}

export function redefineArrays(){
    randomCoopScenes=shuffle(coopScenes);
    randomCompScenes=shuffle(compScenes);
}

export function getNextRandomCoop(){
    if (randomCoopScenes.length===0)
        return victoryStageKey
    // return getRandomScene(randomCoopScenes)
    return randomCoopScenes.pop()
}


export function getNextRandomComp(){
    // return getRandomScene(randomCompScenes)
    return randomCompScenes.pop()
}


function getRandomScene(sceneArray){
    let randomIndex=Math.floor(Math.random()*sceneArray.length);
    let randomScene=sceneArray[randomIndex];
    sceneArray.splice(randomIndex,1);
    return randomScene
}

function shuffle(array){
    let newArray=[];
    let arrayLength=array.length;
    let arraycopy=array.slice(0);
    for (let i = 0; i < arrayLength; i++) {
        let randomIndex=Math.floor(Math.random()*arraycopy.length);
        newArray.push(arraycopy[randomIndex])
        arraycopy.splice(randomIndex,1)
    }
    return newArray;
}