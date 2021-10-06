
function cameraShake (scene,shakeTimeMs,callback){

    scene.cameras.main.shake(shakeTimeMs);

    scene.time.delayedCall(shakeTimeMs,function(){
        callback();
    },[],scene);
}

function cameraFadeOut(scene, fadeTimeMs,onComplete=null){

    scene.cameras.main.fade(fadeTimeMs);

    if (onComplete!==null) {
        scene.time.delayedCall(fadeTimeMs, onComplete, [], scene)
    }
}