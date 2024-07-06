import { preloadedImages } from './imagePreloader.js';

// yes, these are in fact image objects:
const aid = preloadedImages["aidConcept"];
const wall = preloadedImages["wall"];
const grenade = preloadedImages["grenade"];

// this class defines a fucking ROW of items.
export default class Health {
    constructor(y, type) {
        this.x = 0;
        this.y = y;
        this.hurt = false; 
        this.number = 3;
        this.type = type;

        this.image;
    }
    update() {
        if (this.hurt) {
            this.number--;
        }
    }
    draw(context) {
        for (let i = 0; i < this.number; i++) {
            switch (this.type) {
                case "health":
                    this.image = aid;
                    break;
                case "wall":
                    this.image = wall;
                    break;
                case "nade":
                    this.image = grenade;
                    break;
            }
            context.drawImage(this.image, i * 30, this.y);
        }     
    }
}