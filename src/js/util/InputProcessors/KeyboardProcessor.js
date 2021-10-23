import {InputProcessor} from "./InputProcessor.js";

export class KeyboardProcessor extends InputProcessor {
    constructor(context,player,jumpButton,dashButton,left,right ,down, empujar) {
        super(context,player,jumpButton,dashButton);
        this.left=this.context.input.keyboard.addKey(left);
        this.right=this.context.input.keyboard.addKey(right);
        this.down=this.context.input.keyboard.addKey(down);
        this.empujar=this.context.input.keyboard.addKey(empujar);
        this.jumpButton=this.context.input.keyboard.addKey(jumpButton);
        //this.context.input.keyboard.on("keydown-"+jumpButton,()=>this.player.jump());
    }

    update(chocarse, jugador){

        if (this.left.isDown)//Move left
        {
            this.player.moveLeft();
        }
        else if (this.right.isDown)//Move right
        {
            this.player.moveRight();
        }       
        else if (this.down.isDown)//Move left
        {
            this.player.moveDown();
        }
        else //Stay still
        {
            this.player.idle();
        }
        if (this.empujar.isDown)//Move left
        {
            jugador.serEmpujado(chocarse);
        }
        if (this.jumpButton.isDown)
        {
            this.player.jump(chocarse);
        }
    }
}