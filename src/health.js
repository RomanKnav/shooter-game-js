// this class defines a fucking ROW of items.
export default class Health {
    constructor(y, type, images) {
        this.x = 0;
        this.y = y;
        this.hurt = false; 
        this.number = 3;
        this.type = type;
        this.images = images;

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
                    this.image = this.images["aidConcept"];
                    break;
                case "wall":
                    this.image = this.images["wall"];
                    break;
                case "nade":
                    this.image = this.images["grenade"];
                    break;
            }
            context.drawImage(this.image, i * 30, this.y);
        }     
    }
}