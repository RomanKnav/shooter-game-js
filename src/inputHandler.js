let flammen = new Audio();
flammen.src = "src/assets/sounds/flammen2.mp3";

// TODO: while shooting straight, pressing d+w makes bullets shoot up instead of diagnal,
// yet, pressing w+d does make it diagnal.    --DONE. Simply had to move if statement to bottom of cases.

export default class InputHandler {
  constructor(entity, canvas) {
    // constructor(entity) {
    // why doesn't this work as "this.keys"?
    this.canvas = canvas;

    let keys = {"space": false, "d": false, "w": false, "s": false, "a": false};
    
    document.addEventListener("keydown", (event) => {
      // TODO: try using if statements instead.
      if (!entity.disabled) {
      // what this do? sets respective keys value to true. "key" is a built-in property of "event" lol
      keys[event.key] = true;
      
      switch (event.key) {
        // this is just for SHOOTING, not look direction
        case ' ':
            entity.shooting = true;
            break;

        case 'd':
          // entity.angle = "down";
          if (entity.duck) entity.angle = "down";
          else entity.angle = "straight";
          break;

        case 'w':
          if (entity.duck) entity.angle = "down-up";
          else entity.angle = "up"; 
          // entity.angle = "up";         
          break;

        case 's':
          // what's duckable?
          if (entity.duckable) {
            entity.angle = "down";
            entity.duck = true;
          }
          break;
        
        case 'a':
          entity.angle = "back";
          break;

        case 'q':
          entity.weapon = "pistol";
          entity.fireRate = 0;
          entity.specialAmmo = 0;
          break;

        case 'e':
          entity.throwBoom = true;
          // entity.throwBoom = true;
          break;
      }

      // diagnal stand
      if (keys["d"] && keys["w"]) {
        if (entity.duck) entity.angle = "diagnal-duck";
        else entity.angle = "diagnal";
      }

      else if (keys["a"] && keys["s"]) entity.angle = "down-back";   
      else if (keys["a"] && keys["w"]) entity.angle = "diagnal-back";
      else if (keys["w"] && keys["s"]) entity.angle = "down-up";
    }
    });

    document.addEventListener("keyup", (event) => {

      if (!entity.dead) {
      keys[event.key] = false;

      switch (event.key) {
        // SPACE BAR:
        case ' ':
          entity.shooting = false;
          if (entity.weapon == "flammen") {
            flammen.pause();
          }
          // flammen.pause();
          break;

        case 's':
          entity.duck = false;
          if (entity.angle == "down-back") entity.angle = "back";
          else if (entity.angle == "down-up") entity.angle = "up";
          else entity.angle = "straight";
          break;

          // NEEDS WORK HERE:
        case 'a':
          if (entity.angle == "diagnal-back") entity.angle = "up";
          else if (entity.angle == "down-back" || entity.angle == "down") entity.angle = "down";
          break

        case 'd':    
          if (entity.angle == "diagnal") entity.angle = "up";
          else if (entity.angle == "diagnal-duck") entity.angle = "down-up";
          else if (!entity.duck) entity.angle = "straight";
          break;

        case 'e':
          entity.throwBoom = false;
          break;

        case 'w':
          if (entity.angle == "diagnal-back") entity.angle = "back";
          else if (entity.angle == "down-up") entity.angle = "down";
          else if (entity.angle == "diagnal" || entity.angle == "up" || entity.angle == "diagnal-duck") {
            if (entity.duck) entity.angle = "down";
            else entity.angle = "straight";
          }
          break;

        // TOGGLE MUSIC ON OR OFF (should only be possible during/after):
        case 'm':
          // AYO: NEW DISCOVERY: here is how to perfectly toggle between true/false:
          entity.toggleMusic = !(entity.toggleMusic);
          break;
      }
    }
    });

    // MOUSE INPUT: 
    document.addEventListener("mousedown", function () {
      entity.mouse.clicked = true;
    });
    document.addEventListener("mouseup", function () {
      entity.mouse.clicked = false;
    });
    
    // here is what actually reads the mouse's location:
    let canvasPosition = this.canvas.getBoundingClientRect();
    this.canvas.addEventListener("mousemove", function (e) {
      entity.mouse.x = e.x - canvasPosition.left;
      entity.mouse.y = e.y - canvasPosition.top;
    });
    this.canvas.addEventListener("mouseleave", function () {
      entity.mouse.x = undefined;
      entity.mouse.y = undefined;
    });
  }
}
// cxt