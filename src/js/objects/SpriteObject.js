/**
 * @class
 * @abstract
 */
export class SpriteObject extends Phaser.GameObjects.Sprite{

    constructor(context) {
        super(context);
        if(this.constructor===SpriteObject)
            throw new TypeError('Abstract class "Sprite Object" cannot be instantiated directly')
    }

    init(){}
    preload(){}
    create(){}
    update(){}
}