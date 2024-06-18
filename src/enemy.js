import Projectile from "./projectile.js";

// SHIT TONNA IMAGES TO PRELOAD HERE:
import { preloadedImages } from './imagePreloader.js';

// console.log(preloadedImages);


// OVERHAUL SPEED FUNCTIONALITY:
export default class Enemy {
    // what's the speed parameter for again? to increase speed globally as rounds progress :)
    // instead of "frameSpeed", need to pass in elapsedTime:
    // constructor(x, speed, round, frameSpeed) {

    // (actual) speed is initially 1.5, increases by 0.4 every round:
    constructor(x, speed, round, frameSpeed) {
      // NEW SHIT:
      // cxt

      // cycles through frames 0-100 and back:
      this.frama = 0;
      this.speed = speed;     // this is initially: let currentSpeed = 1.5;

      this.x = x;
      this.y;

      this.bulletX;
      this.bulletY;

      this.round = round;

      this.color = "pink"
      this.dead = false;

      this.pickupNum = Math.floor(Math.random() * 15);
      this.pickupOdds = 0;
      this.pickup = false;

      this.isCivie = false;
      this.inNadeRange = false;

      this.duck = false;
      this.duckable = false;

      // ground, crawl, air, civie
      this.health = 2;

      // ENEMY GUN:
      this.projectiles = [];
      // this.fireRate = 200;
      // this.fireRate = 150;

      this.shooting = false;

      // THIS TIMER DETERMINES FIRERATE:s
      this.timer = 0;
      this.angle = "back";

      // POSITION CRAP:
      this.inPosition = false;
      this.position = 0;
      this.dead = false;

      this.beaming = false;
      this.beamHeight = 150;

      this.beamActive = false;

      // ODDS CRAP:
      // base enemies:
      // 6/10 chance to spawn ground, 4/10 ch. to spawn air, 2/10 to spawn spec (dog, bomber, sheep)

      this.typeNum = Math.floor(Math.random() * 20);
      this.groundOdds = 20; // 8
      this.airOdds = 12;    // 6
      this.crawlOdds = 6;   // 4
      this.bossOdds = 2;    // 3  
      this.dogOdds = 3;     // ONLY APPLIES for civies
      // ^ if on rounds 7-9, spawn only bomber. If on boss round, spawn bomber and sheep

      // sheep pushed on round 10:
      this.bossType = ["bomber", "sheep"][Math.floor(Math.random() * 2)];
      this.otherOdds = 5;
      this.type = "ground";

      /* EVENTS:
        round 1: only ground enemies
        round 2: only ground and air enemies
        round 3: pickups and dogs introduced (health, ar, grenade), plus ducking
        round 4: grenades introduced
        round 5: Massacre. Natural text at end
        round 6: good and soon text at beginning. Bombers introduced. pickupOdds increased.
        round 7: flammen introduced. Should have same equality as grenade. AR becomes minority
        round 8: second shooter introduced
        round 9: crazy round
        round 10: boss fight. Sheep introduced. More civies. */

      // THE ISSUE I AM HAVING LIES HERE:
      this.static = new Image;
      this.framework = new Image;

      // this.static;
      // this.framework;

      // first 3 images in sprite are 42x35, second 3 are 42x36
      this.width = 42;
      this.height = 35;
      this.pickupY= 50;

      // wtf is this again? used to move through the different frames in spritesheet
      this.frameX = 0;

      this.spriteWidth = 42;
      this.spriteHeight = 35;
      this.minFrame = 0;
      this.maxFrame = 5;

      /* wtf is pigFrame? determines speed of animations (the lower the faster
      frameSpeed initially set as 15 in script. */
      this.pigFrame = frameSpeed;   // to increase as rounds progress.
      this.statica = false;          // determine if enemy is static throughout (plane, bomber)
      this.animation = false;

      // YES, both paths are correct.
      // this.civy_frameworks = ["src/assets/images/civy/new-frames/spritesheet.png", 
      //                         "src/assets/images/civy/new-frames/spritesheet2.png"];

      // this.civy_frames = this.civy_frameworks[Math.floor(Math.random() * 2)];
      // this.dog_frames = "src/assets/images/dog/dog-frames/spritesheet.png";
      // this.civy_type;

      // THIS needs to change to use preloaded images:
      this.civy_frameworks2 = ["src/assets/images/civy/new-frames/civysheet.png", 
                              "src/assets/images/civy/new-frames/civysheet2.png"];

      // these indices are good:
      // ISSUE LIES HERE:                      
      this.civy_frameworks = [preloadedImages["civysheet"], preloadedImages["civysheet2"]];                                                                
      this.civy_frames = this.civy_frameworks[Math.floor(Math.random() * 2)];

      this.dog_frames = preloadedImages["dogsheet"];
      this.civy_type;

      // FOR CRAWL ENEMY ONLY:
      this.growl = new Audio();
      this.growl.src = "src/assets/sounds/paco.flac";

      // NEW DELTATIME SHIT:
      this.frameTime = 0;
      this.lastFrameTime = 0;
      this.frameInterval = 0.13; // in milli/seconds?

      this.openFire = 100;
      this.fireRate = 100;
      // this.openFire = 5;
      // this.fireRate = 5;
    }

    update(elapsedTime, deltaTime) {
      // determine speed of frames:
      if (elapsedTime - this.lastFrameTime >= this.frameInterval) {
          this.lastFrameTime = elapsedTime;
          if (this.frameX < this.maxFrame) {
              this.frameX++;
          } else {
              this.frameX = this.minFrame;
          }
      }

      // NEW
      if (this.timer >= this.openFire && this.timer % this.fireRate === 0) { 
        this.projectiles.push(new Projectile(this.x + this.bulletX, this.y + this.bulletY, this.angle, this.sound, this.dead, "shotty"));
        if (this.type == "bomber") {
          this.beamActive = true;
        }
      } 

      // FRAME SHIT
      // the same kind of frame shit used in script is used here:

      // if (this.frama <= 100) this.frama++;
      // else this.frama = 0;

      // if (this.frama % this.pigFrame === 0 && this.pigFrame > 0) {
      //   if (this.frameX < this.maxFrame)
      //     this.frameX++;
      //   else this.frameX = this.minFrame;
      // }

      // since deltaTime is more constant, I'd like to use that instead.
      // const movement = this.speed * elapsedTime / 2;
      const movement = this.speed * deltaTime * 100;

      if (this.isCivie == true) {
        if (this.typeNum <= this.dogOdds) this.type = "crawl"
        else this.type = "ground";
      }
      else {
        // SPAWN HEIRARCHY CRAP:
        // 0-2
        if (this.typeNum <= this.bossOdds) {
          if (this.round < 6 && this.round > 0) this.type = "ground";
          else if (this.round >= 6 && this.round < 10) this.type = "bomber";
          else this.type = this.bossType;   // <- if round 10
        }
        // 3-6
        else if (this.typeNum <= this.crawlOdds && (this.round >= 3)) {
          this.type = "crawl";
        }
        // 6-12
        else if (this.typeNum <= this.airOdds && (this.round >= 2 && this.round != 3)) {
          this.type = "air";
        }
      }
      
      // NEW:
      switch(this.type) {
        case "crawl":
          this.sound = "growl";
          this.health = 1;

          if (this.isCivie == true) {
            this.width = 52;
            this.height = 30;
            this.maxFrame = 4;
            this.spriteWidth = 52;
            this.spriteHeight = 30;

            // this.framework.src = this.dog_frames;
            this.framework = preloadedImages["dogsheet"];
          }
          else {
            this.width = 60;
            this.height = 30;
            this.spriteWidth = 60;
            this.spriteHeight = 30;
            this.maxFrame = 3;

            // this SHOULD BE PRELOADED:
            // this.framework.src = "src/assets/images/maggot/spritesheet/maggotsheet.png";
            // this.framework.src = preloadedImages["maggotsheet"];
            this.framework = preloadedImages["maggotsheet"];
          }
          break;

        case "ground":
          // this.x + this.width - 20, this.y + 5
          this.bulletX = this.width - 20;
          this.bulletY = 5; 
          this.sound = "shotty";

          if (this.isCivie == true) {
            this.width = 63;
            this.height = 41;
            this.maxFrame = 4;
            this.spriteWidth = 63;
            this.spriteHeight = 41;
            // this.framework = preloadedImages["civysheet2"];
            this.framework = this.civy_frames;
          }
          // else this.framework.src = "src/assets/images/assault-pig/pig-walk-clear/pigFrames.png";
          else this.framework = preloadedImages["pigFrames"];

          // FIRE IMAGE DOESN'T SHOW IN NEWGROUNDS:
          if (!this.animation) this.static = preloadedImages["pig-stand-clear"];
          else this.static = preloadedImages["pig-stand-fire"];

          break;

        case "air":
          this.bulletX = 26;
          this.bulletY = this.height - 23; 
          this.statica = true;
          this.sound = "shotty";
          // this.static.src = "src/assets/images/pig-plane-clear.png";
          this.static = preloadedImages["pig-plane-clear"];

          this.fireRate = 100;
          this.health = 1;
          this.width = 70;
          this.height = 70;

          // this.speed = 4;
          // this.speed = movement;
          // this.x -= movement;
          this.x -= movement;

          // THIS IS IN REVERSE LOOOL BUT THAT'S THE WAY IT WORKS (HTMS)
          if (this.isCivie) {
            this.speed = -4;
            // this.speed = -movement;
          }
          // else this.speed = movement;
          this.speed = 4;
          break;
        
        // OPENFIRE BY DEFAULT IS 
        case "bomber":
          this.openFire = 150;
          this.fireRate = 15;
          this.width = 90;
          this.height = 90;
          this.statica = true;
          if (!this.inPosition) {
            // this.static.src = "src/assets/images/bomber/bomber-clear.png";
            this.static = preloadedImages["bomber-clear"];
          }
          else {
            // this.static.src = "src/assets/images/bomber/bomber-fire.png";
            this.static = preloadedImages["bomber-fire"];
          }
          break;

        case "sheep":
          this.sound = "laser-gun";
          this.openFire = 150;
          this.fireRate = 15;
          this.width = 70;
          this.height = 58;
          this.spriteWidth = 70;
          this.spriteHeight = 58;
          this.frameSpeed = 5; 
          this.maxFrame = 5;

          this.framework = preloadedImages["girlsheet"];
          this.static = preloadedImages["girl-sheep-clear"];
          break;  
      }

      // THIS WORKS. this.shooting is true when enemies get in position.
      // TODO: to create universal speed, I believe all I have to do is multiply this by deltaTime:
      if (!this.shooting) {
        // this.x -= this.speed;
        this.x -= movement;
      } else {
        this.speed = 0;

        // NOT MENTIONED ANYWHERE, BUT TIMER IS FRAME-BASED:
        // elapsedTime updates MUCH slower than timer.
        
        this.timer++;

        // console.log(Math.floor(elapsedTime), this.timer);

        // this.openFire = 2;
        // this.fireRate = 2;
      }

      if (this.pickupNum <= this.pickupOdds && this.round >= 3) {
        this.pickup = true   
      }
    }

    draw(context) {
      // context.imageSmoothingEnabled = false;

      // NEW SHIT:  
      // this.statica is air and bomber (don't have animation)
      if (this.statica == false) {

        if (!this.inPosition || (this.type == "crawl" && this.inPosition)) {
          context.drawImage(
            this.framework,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
          );
        }
        else if (this.inPosition && (this.type != "crawl" || this.type != "air")) {
          context.imageSmoothingEnabled = false;
          // what does this apply to? ground, sheep, bomber. Draw their statics when in position:
          context.drawImage(this.static, this.x, this.y);   
        }
      } else context.drawImage(this.static, this.x, this.y);

      context.beginPath();
      context.fillStyle = this.color;

      // DO NOT FUCKING REMOVE. FOR DUCKING ENEMY PURPOSES:
      // if (this.duck) {
      //   context.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
      // } else {
      //   context.fillRect(this.x, this.y, this.width, this.height);
      // }

      context.font = "20px serif";
      context.fillStyle = "gray";

      context.textAlign = "center";
      context.textBaseline = "middle";

      // context.fillText(`${this.type}`, this.x + (this.width / 2), this.y - 10);
    } // projectiles

    // GOOD. Determine delay before UFO beam is drawn:
    renderBeam(context) {
      if (this.timer >= this.openFire) {
        context.beginPath();
        // context.fillStyle = "red";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x + 28, this.y + 45, 15, this.beamHeight);
      }
    }
}