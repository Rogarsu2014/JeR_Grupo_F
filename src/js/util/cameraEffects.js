export function cameraShake(context, shakeTimeMs, onComplete = null) {

    cameraEffect(() => context.cameras.main.shake(shakeTimeMs),
        context, shakeTimeMs, onComplete)
}

export function cameraFadeOut(context, fadeTimeMs, onComplete = null) {

    cameraEffect(() => context.cameras.main.fadeOut(fadeTimeMs),
        context, fadeTimeMs, onComplete)

}

export function cameraFadeIn(context, fadeTimeMs, onComplete = null) {

    cameraEffect(() => context.cameras.main.fadeIn(fadeTimeMs),
        context, fadeTimeMs, onComplete);

}

export class SweepTransition {


    constructor(context) {
        this.context=context;
        this.top = undefined;
        this.bottom = undefined;
        this.gameWidth = context.game.config.width;
        this.gameHeight = context.game.config.height;
        this.center = [this.gameWidth * .5, this.gameHeight * .5]
    }

    loadTransition() {
        this.context.load.image("BlackBackground", "./Resources/assets/background/BlackPixel.png")
    }

    addToScene() {
        let gameWidth = this.gameWidth;
        let gameHeight = this.gameHeight;

        this.top = this.context.add.image(gameWidth * .5, 0, "BlackBackground")
        this.top.displayWidth = gameWidth;
        this.top.displayHeight = gameHeight;
        this.top.setOrigin(0.5, 1)
        this.top.depth = 100;
        //
        this.bottom = this.context.add.image(gameWidth * .5, gameHeight, "BlackBackground")
        this.bottom.displayWidth = gameWidth;
        this.bottom.displayHeight = gameHeight;
        this.bottom.setOrigin(0.5, 0)
        this.bottom.depth = 100;
    }

    playTransition(onComplete=null,completeDelay=0) {
        var tween = this.context.tweens.add({
            targets: [this.top,this.bottom],
            completeDelay:completeDelay,
            onComplete:()=>onComplete(),
            y: this.center[1],
            ease: 'Circ.easeIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0,            // -1: infinity
            yoyo: false
        });
        // tween.play();

    }

    move() {
        this.top.y++;
        this.bottom.y--;
    }
}

export function LoadTransition(context) {
    context.load.image("BlackBackground", "./Resources/assets/background/BlackPixel.png")
}

export function AddTransition(context) {
    context.add.image("BlackBackground", "./Resources/assets/background/BlackPixel.png")
}


function callOnCompleted(context, time, onComplete) {
    if (onComplete !== null) {
        context.time.delayedCall(time, onComplete, [], context)
    }
}

function cameraEffect(effect, context, effectTimeMs, onComplete = null) {

    effect();
    callOnCompleted(context, effectTimeMs, onComplete);
}