import { ready } from '/src/readyImages.js';

// "ready" is a dict. These are the actual image objects:
// as of RN, these are UNDEFINED:
const aid = ready["aidConcept"];
const wall = ready["wall"];
const grenade = ready["grenade"];

// this will literally look like: {aidConcept: img, wall: img, grenade: img}
// const healthPreloaded = {};

// this should go up here, BEFORE images are used in the class:
// window.onload = function() {
//     imagePreloader(healthImages, healthPreloaded, () => {
//         for (const health in healthPreloaded) {
//             console.log(`${health}`, "successfully loaded!");
//         }
//         console.log('*********All health images preloaded!************');
//         console.log(healthPreloaded);
//     });
// };

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
                    // this.image.src = "src/assets/images/pickups/clears/grenade.png";
                    this.image = aid;
                    break;
                case "wall":
                    // this.image.src = "src/assets/images/pickups/clears/grenade.png";
                    this.image = wall;
                    break;
                case "nade":
                    // this.image.src = "src/assets/images/pickups/clears/grenade.png";
                    this.image = grenade;
                    break;
            }
            context.drawImage(this.image, i * 30, this.y);
        }     
    }
}