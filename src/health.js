import { imagePreloader } from '/src/imagePreloader.js';

const healthImages = [
    "src/assets/images/pickups/clears/aidConcept.png",
    "src/assets/images/pickups/clears/wall.png",
    "src/assets/images/pickups/clears/grenade.png",
];

// this will literally look like: {aidConcept: img, wall: img, grenade: img}
const healthPreloaded = {};

// this should go up here, BEFORE images are used in the class:
window.onload = function() {
    imagePreloader(healthImages, healthPreloaded, () => {
        for (const health in healthPreloaded) {
            console.log(`${health}`, "successfully loaded!");
        }
        console.log('*********All health images preloaded!************');
        console.log(healthPreloaded);
    });
};

// this class defines a fucking ROW of items.
export default class Health {
    constructor(y, type) {
        this.x = 0;
        this.y = y;
        this.hurt = false; 
        this.number = 3;
        this.type = type;

        // this.image = new Image();
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
                    this.image = healthPreloaded["aidConcept"];
                    break;
                case "wall":
                    this.image = healthPreloaded["wall"];
                    break;
                case "nade":
                    // this.image.src = "src/assets/images/pickups/clears/grenade.png";
                    this.image = healthPreloaded["grenade"];
                    break;
            }
            context.drawImage(this.image, i * 30, this.y);
        }     
    }
}