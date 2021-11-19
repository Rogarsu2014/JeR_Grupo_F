export class InputProcessor {
    constructor(context, player,jumpButton,dashButton) {
        this.context = context;

        if(this.constructor===InputProcessor)
            throw new TypeError('Abstract class "InputProcessor" cannot be instantiated directly')

        this.player=player;
        this.jumpButton=jumpButton;
        this.dashButton=dashButton;

    }


    setJumpButton(){

    }
    setDashButton(){

    }
    dashAction(){

    }
}