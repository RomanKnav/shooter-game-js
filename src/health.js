// this class defines a fucking ROW of items.
export default class Health {
    constructor(y, type) {
        this.x = 0;
        this.y = y;
        this.hurt = false;
        this.number = 3;
        this.type = type;
        this.image = new Image();
        this.image.src = "src/assets/images/pickups/clears/grenade copy.png";;
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
                    this.image.src = "src/assets/images/pickups/clears/aidConcept copy.png";
                    break;
                case "wall":
                    this.image.src = "src/assets/images/pickups/clears/wall copy.png";
                    break;
                case "nade":
                    this.image.src = "src/assets/images/pickups/clears/grenade copy.png";
                    break;
            }
            context.drawImage(this.image, i * 30, this.y);
        }     
    }
}

