// BULLETS

// NOTHING TO DO WITH FIRERATE HERE:
export default class Projectile {
  // "dead" used as determinant for playing sounds
  constructor(x, y, direction, weapon, dead, isSecond) {
    this.isSecond = isSecond;

    // NEW HOWLER CRAP (sound fx "bucket"):
    this.sfx = {
      pistol: new Howl({
        /* accepts multiple versions of the same audio! (automatically selects the best one for the 
        current web browser */
        src: [
          "src/assets/sounds/shots/pistol.wav",
        ],
        preload: true,
        loop: false,
        volume: 0.1
      }),
      ar: new Howl({
        src: [
          "src/assets/sounds/shots/cg1.wav",
        ],
        preload: true,
        // the "loop" flag is false by default!
        loop: false,
        volume: 0.2
      }), 
      flammen: new Howl({
        src: [
          "src/assets/sounds/laser.mp3",
        ],
        preload: true,
        // the "loop" flag is false by default!
        loop: false,
        // function to execute as soon as the sound effect ends:
        // good use case: when there is an intro to a song. Play the intro first, then use "onend" 
        // to play the song without having to worry about the intro repeating. 
        onend: function() {},
        volume: 0.2
      }), 
      shotty: new Howl({
        src: [
          "src/assets/sounds/shots/rifle.wav",
        ],
        preload: true,
        // the "loop" flag is false by default!
        loop: false,
        volume: 0.6,
        onend: function() {},
        volume: 0.2
      }), 
      bomber: new Howl({
        src: [
          "src/assets/sounds/ray-beam.mp3",
        ],
        // the "loop" flag is false by default!
        preload: true,
        loop: false,
        volume: 0.4
      }), 
      laser: new Howl({
        src: [
          "src/assets/sounds/laser-buzz.mp3",
        ],
        preload: true,
        // the "loop" flag is false by default!
        loop: false,
      }), 
    }

    this.x = x;
    this.y = y;
    this.direction = direction;
    this.weapon = weapon;
    this.dead = dead;

    this.size = 2;

    this.speed = 15;
    this.delete = false;
    this.randomY = [1.7, 2, 2.2, 2.4, 2.6, 2.8, 3];
    // needs to shoot in the same directon (110 y) as randomY values:
    this.randomY_duck = [1.1, 1.2, 1.3, 1.4];

    this.bulletLimit;
  }

  playSound(sound) {
    if (!sound.playing()) {
      sound.play();
    }
  }
  
  // ONLY SPEED of bullet should be affected, not push-rate.
  update(deltaTime) {
    const movement = deltaTime * this.speed * 100;

    switch (this.weapon) {
      case "pistol":
        if (!this.isSecond) this.playSound(this.sfx.pistol);
        break;

      // FOR GROUND FORCES:
      case "shotty":
        this.speed = 100;
        // this.size = 3;
        if (!this.dead) {
          this.playSound(this.sfx.shotty);
        } else {
          this.sfx.shotty.stop();
        } 
        break;  
      case "ar":
        this.size = 2;
        this.speed = 25;
        if (!this.isSecond) this.playSound(this.sfx.ar);
        break;

      case "flammen":
        if (!this.isSecond) this.playSound(this.sfx.flammen);
        this.speed = 11;
        break;

      case "laser-gun":
        this.playSound(this.sfx.laser);
        this.speed = 7;
        break;
    }

    // DIRECTION TO SHOOT IN:
    switch (this.direction) {
      case "straight":
        this.x += movement;

        // this.y += this.speed; <- yup, this works
        break

      case "up":
      case "down-up":   
        this.x += 0;
        // this.y -= this.speed;
        this.y -= movement;
        break;
      
      case "diagnal":
        this.x += movement;
        this.y -= movement / this.randomY[Math.floor(Math.random() * this.randomY.length)];
        
        break;
      
      case "diagnal-duck":
        this.x += movement;
        this.y -= movement / this.randomY[Math.floor(Math.random() * this.randomY.length)];
        break;

      case "down":
        this.x += movement;
        break;

      case "back":
      case "down-back":
        // this.x -= this.speed;
        this.x -= movement;
        break;
      
      case "diagnal-back":
        // this.x -= this.speed + 1;
        // this.y -= this.speed * 2  

        this.x -= movement + 1;
        this.y -= movement * 2  
        break;

      // THIS IS FOR AIR ENEMIES:
      case "down-diagnal":
        // this.x -= this.speed / 1.3;
        // this.y += this.speed / 3;

        this.x -= movement / 1.3;
        this.y += movement / 3;
        break;

      // FOR BOMBERS:
      case "straight-down":
        // this.y += this.speed;
        this.y += movement;
        break;  
    }
  }
  draw(context) {
    if (this.weapon == "flammen") {
      context.strokeStyle = "green";
      context.beginPath();
      context.lineWidth = 3;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.stroke();
    } 
    else if (this.weapon == "ar") {
      context.save(); 
      context.fillStyle = "black";
      context.beginPath();
      context.ellipse(this.x, this.y, this.size + 1, this.size + 1, 0, Math.PI / 4, Math.PI * 2);
      // context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    } 
    else if (this.direction == "down-diagnal") {
      context.beginPath();
      context.ellipse(this.x, this.y, 5, 15, Math.PI / 3, 0, 2 * Math.PI);
      context.stroke();
    }
    else {
      context.fillStyle = "black";
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
  } 
}