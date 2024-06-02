export default class TextWall {
    constructor(text, y, canvas) {
        this.canvas = canvas;

        this.text = text;
        this.lineheight = 15;
        this.lines = this.text.split('\n');
        this.y = Math.floor(y);
        this.vanish = false;
    }

    draw(context) {
        if (!this.vanish) {
            context.beginPath();
            context.fillStyle = "black";
            context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
            context.fillStyle = "white";
            context.font = "17px Times New Roman";
            for (let i = 0; i < this.lines.length; i++) {
                context.fillText(this.lines[i], this.canvas.width / 2, this.y + (i * this.lineheight));
            }
        }
    }
}