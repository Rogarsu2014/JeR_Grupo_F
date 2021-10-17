import {InputProcessor} from "./InputProcessor.js";

export class KeyboardProcessor extends InputProcessor {
    constructor(context,player,jumpButton,dashButton,left,right) {
        super(context,player,jumpButton,dashButton);

        this.left=this.context.input.keyboard.addKey(left);
        this.right=this.context.input.keyboard.addKey(right);
        this.context.input.keyboard.on("keydown-"+jumpButton,()=>this.player.jump())
        // this.context.input.keyboard.on("keydown-"+dashButton,()=>this.player.jump())
        //
        // this.context.input.keyboard.on("keydown-"+left,()=>this.player.moveLeft())
        // this.context.input.keyboard.on("keyup-"+left,()=>this.player.idle())
        //
        // this.context.input.keyboard.on("keydown-"+right,()=>this.player.moveRight())
        // this.context.input.keyboard.on("keyup-"+right,()=>this.player.idle())

    }

    update(){
        if (this.left.isDown)//Move left
        {
            this.player.moveLeft()
        }
        else if (this.right.isDown)//Move right
        {
            this.player.moveRight()
        }
        else //Stay still
        {
            this.player.idle()
        }

        // if (this.context.cursors.up.isDown && this.player.isOnFloor())//Jump as long as you are on the floor
        // {
        //     this.player.jump()
        // }
        // if (this.context.cursors.down.isDown)//Optional go down key
        // {
        //     // this.player.setVelocityY(600);
        // }
    }
}