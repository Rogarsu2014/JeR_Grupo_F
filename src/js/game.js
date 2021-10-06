window.onload=function (){
    const config = {
        width: 320,
        height: 180,
        parent: "container",
        type: Phaser.AUTO,

        scene: [],
        input: {
            gamepad: true
        },

        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 500
                }
            }
        }

    }


    var game = new Phaser.Game(config)
}

