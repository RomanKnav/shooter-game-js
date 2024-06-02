// want to make two spots where grenade can land. 
// cannot change x here for second grenade. Must do that in script.
export default class Grenade {
    constructor(x, entity, canvas) {
        this.canvas = canvas;
        this.x = x;

        this.ready = false;
        this.y = this.canvas.height / 2; 

        this.entity = entity;
        this.dudY = this.entity.y;
        this.dudX = this.entity.x;
        this.dudSize = 5;

        this.size = 10;

        this.sound = new Audio();
        this.sound.src = "src/assets/sounds/explosionLoud.mp3";

        this.bloopPlayed = false;
        this.bloop = new Audio();
        this.bloop.src = "src/assets/sounds/q009/glauncher.ogg";

        this.image = new Image();
        this.image.src = "src/assets/images/sprites/exp2FirstFramesPixel.png";

        // EXPLOSION ANIMATION CRAP:
        this.frama = 0;
        this.boomFrameX = 0;
        this.boomMaxFrame = 3;
        this.boomSpriteHeight = 64;
        this.boomSpriteWidth = 64;
        this.boomHeight = this.boomSpriteHeight * 4;
        this.boomWidth = this.boomSpriteWidth * 4;
    }

    // draws the explosion
    draw(context) {
        context.drawImage(
            this.image,
            this.boomFrameX * this.boomSpriteWidth,
            0,
            this.boomSpriteWidth,
            this.boomSpriteHeight,
            this.x - (this.y / 2) - 20,
            this.y - (this.y / 2) - 20,
            this.boomWidth ,
            this.boomHeight
        );  
    }

    update() {
        if (this.frama <= 100) this.frama++;
        else this.frama = 0;

        if (this.frama % 15 === 0) {
            if (this.boomFrameX < this.boomMaxFrame) {
            this.boomFrameX++;
            this.boomAnimation += 1;
            } else this.boomFrameX = this.minFrame;
        }
        // only updates the frames you shithead 
    }

    // draws the nade itself
    drawDud(context) {
        context.beginPath();
        context.arc(this.entity.x + this.entity.width / 2, this.dudY, this.dudSize, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
    }
    updateDud() {
        if (this.dudY > 0) {
            this.dudY -= 10;
            this.dudX -= 10;
        }
    }
}