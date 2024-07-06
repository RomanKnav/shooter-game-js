import { preloadedImages } from './imagePreloader.js';

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

        this.sound = new Howl({
            src: ["src/assets/sounds/explosionLoud.mp3"],
            preload: true,
            volume: 1.0
        });

        this.bloopPlayed = false;

        this.bloop = new Howl({
            src: ["src/assets/sounds/q009/glauncher.ogg"],
            preload: true,
            volume: 1.0
        });

        this.image = new Image();
        // this.image.src = "src/assets/images/sprites/exp2FirstFramesPixel.png";
        this.image = preloadedImages["exp2FirstFramesPixel"];

        // EXPLOSION ANIMATION CRAP:
        this.frama = 0;
        this.boomFrameX = 0;
        this.boomMaxFrame = 3;
        this.boomSpriteHeight = 64;
        this.boomSpriteWidth = 64;
        this.boomHeight = this.boomSpriteHeight * 4;
        this.boomWidth = this.boomSpriteWidth * 4;

        // DELTATIME SHIT:
        this.frameTime = 0;
        this.lastFrameTime = 0;
        this.frameInterval = 0.13; // in milli/seconds?
    }

    // JUST FOR THE EXPLOSION FRAMES:
    update(elapsedTime) {
        // NEW DELTATIME SHIT (what determines the speed?)
        if (elapsedTime - this.lastFrameTime >= this.frameInterval) {
            this.lastFrameTime = elapsedTime;
            if (this.boomFrameX < this.boomMaxFrame) {
                this.boomFrameX++;
            } else {
                this.boomFrameX = this.minFrame;
            }
        }
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

    // draws the nade itself
    drawDud(context) {
        context.beginPath();
        context.arc(this.entity.x + this.entity.width / 2, this.dudY, this.dudSize, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
    }
    updateDud(deltaTime) {
        const movement = 8 * (deltaTime * 250);
        if (this.dudY > 0) {
            // this.dudY -= 10;
            // this.dudX -= 10;
            this.dudY -= movement;
            this.dudX -= movement;
        }
    }
}