export default class Floor {
    constructor(canvas) {
        this.canvas = canvas;
        this.y = this.canvas.height - (this.canvas.height * (1/4)); // y of floor is 225. So, floor is 75px tall.
        this.x = 0;
        this.width = this.canvas.width;
        this.height = this.canvas.height / 2;
    }
    draw(context) {
        context.beginPath();
        // context.fillStyle = "green";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}