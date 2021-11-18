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

export class SweepVerticalTransitionIn {


    constructor(context) {
        this.context=context;
        this.top = undefined;
        this.bottom = undefined;
        this.gameWidth = context.game.canvas.width;
        this.gameHeight = context.game.canvas.height;
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

    playTransition(onComplete=null,completeDelay=0,duration=1000) {
        var tween = this.context.tweens.add({
            targets: [this.top,this.bottom],
            completeDelay:completeDelay,
            onComplete:()=>onComplete(),
            y: this.center[1],
            ease: 'Circ.easeIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: duration,
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

export class SweepVerticalTransitionOut {


    constructor(context) {
        this.context=context;
        this.top = undefined;
        this.bottom = undefined;
        this.gameWidth = context.game.canvas.width;
        this.gameHeight = context.game.canvas.height;
        this.center = [this.gameWidth * .5, this.gameHeight * .5]
    }

    loadTransition() {
        this.context.load.image("BlackBackground", "./Resources/assets/background/BlackPixel.png")
    }

    addToScene() {
        let gameWidth = this.gameWidth;
        let gameHeight = this.gameHeight;

        this.top = this.context.add.image(gameWidth * .5, gameHeight*.5, "BlackBackground")
        this.top.displayWidth = gameWidth;
        this.top.displayHeight = gameHeight;
        this.top.setOrigin(0.5, 1)
        this.top.depth = 100;
        //
        this.bottom = this.context.add.image(gameWidth * .5, gameHeight*.5, "BlackBackground")
        this.bottom.displayWidth = gameWidth;
        this.bottom.displayHeight = gameHeight;
        this.bottom.setOrigin(0.5, 0)
        this.bottom.depth = 100;
    }

    playTransition(onComplete=null,completeDelay=0,duration=1000) {
        var tweenTop = this.context.tweens.add({
            targets: this.top,
            y: 0,
            ease: 'Circ.easeIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: duration,
            repeat: 0,            // -1: infinity
            yoyo: false
        });
        var tweenBottom = this.context.tweens.add({
            targets: this.bottom,
            completeDelay:completeDelay,
            onComplete:()=>onComplete(),
            y: this.gameHeight,
            ease: 'Circ.easeIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: duration,
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

export class SweepTransitionHorizontalOut {


    constructor(context) {
        this.context=context;
        this.left = undefined;
        this.right = undefined;
        this.gameWidth = context.game.canvas.width;
        this.gameHeight = context.game.canvas.height;
        this.center = [this.gameWidth * .5, this.gameHeight * .5]
    }

    loadTransition() {
        this.context.load.image("BlackBackground", "./Resources/assets/background/BlackPixel.png")
    }

    addToScene() {
        let gameWidth = this.gameWidth;
        let gameHeight = this.gameHeight;

        this.left = this.context.add.image(gameWidth*.5, gameHeight*.5, "BlackBackground")
        this.left.displayWidth = gameWidth;
        this.left.displayHeight = gameHeight;
        this.left.setOrigin(1, .5)
        this.left.depth = 100;
        //
        this.right = this.context.add.image(gameWidth*.5, gameHeight*.5, "BlackBackground")
        this.right.displayWidth = gameWidth;
        this.right.displayHeight = gameHeight;
        this.right.setOrigin(0, 0.5)
        this.right.depth = 100;
    }

    playTransition(onComplete=null,completeDelay=0,duration=1000) {

        var tweenRight = this.context.tweens.add({
            targets: this.left,
            completeDelay:completeDelay,
            onComplete:()=>onComplete(),
            x: 0,
            ease: 'Circ.easeIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: duration,
        });
        var tweenRight = this.context.tweens.add({
            targets: this.right,
            completeDelay:completeDelay,
            onComplete:()=>onComplete(),
            x: this.gameWidth,
            ease: 'Circ.easeIn',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: duration,
        });
        // tween.play();

    }

    move() {
        this.top.y++;
        this.bottom.y--;
    }
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