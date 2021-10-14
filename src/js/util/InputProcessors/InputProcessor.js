export class InputProcessor {
    constructor(context, player,jumpButton,dashButton) {
        this.context = context;

        if(this.constructor===InputProcessor)
            throw new TypeError('Abstract class "InputProcessor" cannot be instantiated directly')

        this.player=player;
        // this.leftButton;
        // this.rightButton;
        this.jumpButton=jumpButton;
        this.dashButton=dashButton;
    }

    setJumpButton(){

    }
    setDashButton(){

    }

    // leftMovement(){
    //     this.player.setVelocityX(-300);
    //     this.player.anims.play('left', true);
    // }
    // rightMovement(){
    //     this.player.setVelocityX(300);
    //     this.player.anims.play('right', true);
    // }
    //
    // jumpAction(){
    //     if(this.player.isOnFloor())
    //         this.player.jump();
    // }
    dashAction(){}
}