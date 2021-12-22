import {InputProcessor} from "./InputProcessor.js";

export class KeyboardProcessor extends InputProcessor {
    constructor(context,player,jumpButton,dashButton,left,right ,down, empujar) {
        super(context,player,jumpButton,dashButton);
        this.left=this.context.input.keyboard.addKey(left);
        this.left.on('down',()=> {
            // console.log("Left Down")
            this.player.moveLeft()
        });
        this.bump=false;
        
        this.right=this.context.input.keyboard.addKey(right);
        this.right.on('down',()=> {
            // console.log("Right Down")
            this.player.moveRight()
        });   
        
        this.down=this.context.input.keyboard.addKey(down);
        
        
        this.empujar=this.context.input.keyboard.addKey(empujar);
        this.jumpButton=this.context.input.keyboard.addKey(jumpButton);

        this.jumpButton.on('down',()=> {
            // console.log("Right Down")
            this.player.jump( this.bump);
        });
        //this.context.input.keyboard.on("keydown-"+jumpButton,()=>this.player.jump());
        this.right.on('up',()=> {  if(!this.isAnyKeyPressed()) {this.player.idle()} });
        this.left.on('up',()=> { if(!this.isAnyKeyPressed() ){this.player.idle()} });
        this.down.on('up',()=> { if(!this.isAnyKeyPressed() ){this.player.idle()} });
        this.jumpButton.on('up',()=> { if(!this.isAnyKeyPressed() ){this.player.idle()} });
        
    }
    setPlayer(player){
        this.player=player;
    }

    isAnyKeyPressed(){
        if (!this.left.isDown && !this.right.isDown && !this.down.isDown  && !this.jumpButton.isDown)
            return false
        return true
    }
    update(bump, playerp){

        if (this.left.isDown)//Move left
        {
            // this.player.moveLeft();
        }
        else if (this.right.isDown)//Move right
        {
            // this.player.moveRight();
        }       
        else if (this.down.isDown)//Move left
        {
            this.player.moveDown();
        }
        else //Stay still
        {
            this.player.idle();
        }
        this.bump=bump;
        if (this.empujar.isDown)//Move left
        {
            playerp.selfPush(bump);
        }
        // if (this.jumpButton.isDown)
        // {
        //     // this.player.jump(bump);
        // }
    }
}