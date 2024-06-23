// would be super useful if I can import "flora" in here.

import { preloadedImages } from './imagePreloader.js';

import Projectile from "./projectile.js";
var canvas = document.getElementById("canvas1");

// why is mouse stuff here? so that it can be used as "entity.mouse" in inputHandler.js
export default class Shooter {
    // constructor(x) { 
    constructor(x, y) { 
        this.width = 44;
        this.height = 34;
        this.y = y;

        this.bulletY;   // this to be added to the y. Standing: 5, Duck: 10
        this.bulletX = 19;

        this.init = false;

        this.x = x;
        this.secondX = 200;

        this.isSecond = false;
        this.initSecond = false;
        this.secondReady = false;

        this.secondStream = false;

        this.name = "Warren";
        this.disabled = true;
        this.health = 3;
        this.delete = false;
        this.dead = false;

        /* HOW PROJECTILES WORK: whenever user shoots, new projectile added to array. As he not-shoots,
        it automatically decrements until it is empty :) */
        this.projectiles = [];
        this.shooting = false;

        // DETERMINES FIRERATE:
        this.timer = 0;

        // used in input handler:
        this.duckable = true;
        this.duck = false;

        this.angle = "straight";

        // pistol, ar, and flamethrower. Firerate for rifle? 15
        this.weapon = "pistol";
        this.fireRate = 0;
        this.specialAmmo = 0;

        this.throwBoom = false; 
        this.secondNade = false;

      // mouse stuff in here lol, used in script.js
      // what's this for again?
        this.mouse = {
            x: 10,
            y: 10,
            width: 0.1,
            height: 0.1,
            clicked: false
        };

        this.flammen = new Audio();
        this.flammen.src = "src/assets/sounds/flammen2.mp3";

        this.bloop = new Audio();
        this.bloop.src = "src/assets/sounds/q009/glauncher.ogg";

        this.toggleMusic = false;

        // IMAGES:
        // 44×40
        this.grenade_stand = preloadedImages["nade_stand"];
        // this.grenade_stand = new Image();
        // this.grenade_stand.src = "src/assets/images/CLEARS/nade/nade_stand.png";

        this.grenade_crouch = preloadedImages["sheep-nade-crouch"];
        // this.grenade_crouch = new Image();
        // this.grenade_crouch.src = "src/assets/images/CLEARS/nade/sheep-nade-crouch.png";

        this.dead_warren = preloadedImages["dead-warren-clear"];
        // this.dead_warren = new Image();
        // this.dead_warren.src = "src/assets/images/CLEARS/dead-warren/dead-warren-clear.png";

        // FIX THIS CRAP:
        this.pistol_stand = preloadedImages["sheep-pistol-clear-elevate"];
        // this.pistol_stand = new Image();
        // this.pistol_stand.src = "src/assets/images/CLEARS/pistol/sheep-pistol-clear-elevate.png";
        
        // 43x36, diagnal
        // FIRE: 43×40
        this.pistol_stand_up = preloadedImages["sheep-pistol-lookup-clear"];
        // this.pistol_stand_up.src = "src/assets/images/CLEARS/pistol/sheep-pistol-lookup-clear.png";

        // 44x36
        // FIRE: 44x36
        this.pistol_stand_top = preloadedImages["sheep-pistol-top-clear"];
        // this.pistol_stand_top.src = "src/assets/images/CLEARS/pistol/sheep-pistol-top-clear.png";

        // 50x28
        // FIRE: 50×28
        this.pistol_crouch = preloadedImages["sheep-pistol-crouch-clear-new"];
        // this.pistol_crouch.src = "src/assets/images/CLEARS/pistol/sheep-pistol-crouch-clear-new.png";

        // 49x30
        // FIRE: 49x34
        this.pistol_crouch_up = preloadedImages["sheep-pistol-lookup-crouch-clear"];
        // this.pistol_crouch_up.src = "src/assets/images/CLEARS/pistol/sheep-pistol-lookup-crouch-clear.png";

        // 50x30
        // FIRE: 50×33
        this.pistol_crouch_top = preloadedImages["sheep-pistol-crouch-top-clear"];
        // this.pistol_crouch_top.src = "src/assets/images/CLEARS/pistol/sheep-pistol-crouch-top-clear.png";

        //rifle:
        // 44x40
        this.rifle_stand = preloadedImages["sheep-rifle-clear-elevate"];
        // this.rifle_stand.src = "src/assets/images/CLEARS/rifle/sheep-rifle-clear-elevate.png";

        // 43x38
        this.rifle_stand_up = preloadedImages["sheep-rifle-up-clear"];
        // this.rifle_stand_up.src = "src/assets/images/CLEARS/rifle/sheep-rifle-up-clear.png";

        // 44x37
        this.rifle_stand_top = preloadedImages["sheep-rifle-top-clear"];
        // this.rifle_stand_top.src = "src/assets/images/CLEARS/rifle/sheep-rifle-top-clear.png";

        // 50x34
        this.rifle_crouch = preloadedImages["sheep-rifle-crouch-clear"];
        // this.rifle_crouch.src = "src/assets/images/CLEARS/rifle/sheep-rifle-crouch-clear.png";

        // 49x32
        this.rifle_crouch_up = preloadedImages["sheep-rifle-up-crouch-clear"];
        // this.rifle_crouch_up.src = "src/assets/images/CLEARS/rifle/sheep-rifle-up-crouch-clear.png";

        // 50x31
        this.rifle_crouch_top = preloadedImages["sheep-rifle-top-crouch-clear"];
        // this.rifle_crouch_top.src = "src/assets/images/CLEARS/rifle/sheep-rifle-top-crouch-clear.png";

        //flammen
        // 44x39
        this.flammen_stand = preloadedImages["flammen-stand"];
        // this.flammen_stand.src = "src/assets/images/CLEARS/flammen/flammen-stand.png";

        // 43x40
        this.flammen_stand_up = preloadedImages["flammen-stand-up"];
        // this.flammen_stand_up.src = "src/assets/images/CLEARS/flammen/flammen-stand-up.png";

        // 50x33
        this.flammen_crouch = preloadedImages["flammen-crouch"];
        // this.flammen_crouch.src = "src/assets/images/CLEARS/flammen/flammen-crouch.png";

        // 49x34
        this.flammen_crouch_up = preloadedImages["flammen-crouch-up"];
        // this.flammen_crouch_up.src = "src/assets/images/CLEARS/flammen/flammen-crouch-up.png";

        // 44x39
        this.flammen_top = preloadedImages["flammen-top"];
        // this.flammen_top.src = "src/assets/images/CLEARS/flammen/flammen-top.png";

        // 50x33
        this.flammen_crouch_top = preloadedImages["flammen-crouch-top"];
        // this.flammen_crouch_top.src = "src/assets/images/CLEARS/flammen/flammen-crouch-top.png";

        // PISTOL FIRE IMAGES:  
        this.pistol_fire = preloadedImages["sheep-pistol-clear-elevate-fire"];
        // this.pistol_fire.src = "src/assets/images/fires/pistol/sheep-pistol-clear-elevate-fire.png";

        this.pistol_up_fire = preloadedImages["sheep-pistol-lookup3"];
        // this.pistol_up_fire.src = "src/assets/images/fires/pistol/sheep-pistol-lookup3.png";

        this.pistol_top_fire = preloadedImages["sheep-pistol-top3"];
        // this.pistol_top_fire.src = "src/assets/images/fires/pistol/sheep-pistol-top3.png";

        this.pistol_crouch_fire = preloadedImages["sheep-pistol-crouch-new"];
        // this.pistol_crouch_fire.src = "src/assets/images/fires/pistol/sheep-pistol-crouch-new.png";

        this.pistol_crouch_up_fire = preloadedImages["sheep-pistol-lookup-crouch3"];
        // this.pistol_crouch_up_fire.src = "src/assets/images/fires/pistol/sheep-pistol-lookup-crouch3.png";

        this.pistol_crouch_top_fire = preloadedImages["pistol-crouch-top3"];
        // this.pistol_crouch_top_fire.src = "src/assets/images/fires/pistol/pistol-crouch-top3.png";

        // RIFLE FIRE IMAGES:
        this.rifle_fire = preloadedImages["rifle-stand3-elevate"];
        // this.rifle_fire.src = "src/assets/images/fires/rifle/rifle-stand3-elevate.png";

        this.rifle_up_fire = preloadedImages["rifle-stand-up"];
        // this.rifle_up_fire.src = "src/assets/images/fires/rifle/rifle-stand-up.png";

        // done
        this.rifle_top_fire = preloadedImages["rifle-stand-top"];
        // this.rifle_top_fire.src = "src/assets/images/fires/rifle/rifle-stand-top.png";

        // done
        this.rifle_crouch_fire = preloadedImages["rifle-crouch-new"];
        // this.rifle_crouch_fire.src = "src/assets/images/fires/rifle/rifle-crouch-new.png";

        // done
        this.rifle_crouch_up_fire = preloadedImages["rifle-crouch-lookup3"];
        // this.rifle_crouch_up_fire.src = "src/assets/images/fires/rifle/rifle-crouch-lookup3.png";

        // done
        this.rifle_crouch_top_fire = preloadedImages["rifle-crouch-top2"];
        // this.rifle_crouch_top_fire.src = "src/assets/images/fires/rifle/rifle-crouch-top2.png";
        
        this.images = {
            "straight": {
                "pistol": {
                    "idle": this.pistol_stand, 
                    "fire": this.pistol_fire, 
                    "width": 44,
                    "height": 34
                },
                "ar": {
                    "idle": this.rifle_stand, 
                    "fire": this.rifle_fire,
                    "width": 44,
                    "height": 40
                },
                "flammen": {
                    "idle": this.flammen_stand, 
                    "fire": this.flammen_stand, 
                    "width": 44,
                    "height": 39
                },
            }, 
            "diagnal": {
                "pistol": {
                    "idle": this.pistol_stand_up, 
                    "fire": this.pistol_up_fire, 
                    "width": 43,
                    "height": 36,
                }, 
                "ar": {
                    "idle": this.rifle_stand_up, 
                    "fire": this.rifle_up_fire,
                    "width": 43,
                    "height": 38
                },
                "flammen": {
                    "idle": this.flammen_stand_up, 
                    "fire": this.flammen_stand_up, 
                    "width": 43,
                    "height": 40
                },
            }, 
            "up": {
                "pistol": {
                    "idle": this.pistol_stand_top, 
                   "fire": this.pistol_top_fire, 
                   "width": 44,
                   "height": 36,
                }, 
                "ar": {
                    "idle": this.rifle_stand_top, 
                    "fire": this.rifle_top_fire,
                    "width": 44,
                    "height": 37
                },
                "flammen": {
                    "idle": this.flammen_top, 
                    "fire": this.flammen_top, 
                    "width": 44,
                    "height": 39
                },
            },
            "down": {
                "pistol": {
                    "idle": this.pistol_crouch, 
                    "fire": this.pistol_crouch_fire, 
                    "width": 50,
                    "height": 28,
                },
                "ar": {
                    "idle": this.rifle_crouch,          // 50x29
                    "fire": this.rifle_crouch_fire,
                    "width": 50,
                    "height": 29
                },
                "flammen": {
                    "idle": this.flammen_crouch, 
                    "fire": this.flammen_crouch, 
                    "width": 50,
                    "height": 33
                },
            },  
            "diagnal-duck": {
                "pistol": { 
                    "idle": this.pistol_crouch_up, 
                    "fire": this.pistol_crouch_up_fire, 
                    "width": 49,
                    "height": 30  
                }, 
                "ar": {
                    "idle": this.rifle_crouch_up, 
                    "fire": this.rifle_crouch_up_fire,
                    "width": 49,
                    "height": 32
                },
                "flammen": {
                    "idle": this.flammen_crouch_up, 
                    "fire": this.flammen_crouch_up, 
                    "width": 44,
                    "height": 34
                },
            },
            // 50x31
            "down-up": {
                "pistol": {
                    "idle": this.pistol_crouch_top, 
                    "fire": this.pistol_crouch_top_fire, 
                    "width": 50,
                    "height": 30 
                }, "ar": {
                    "idle": this.rifle_crouch_top, 
                    "fire": this.rifle_crouch_top_fire,
                    "width": 44,
                    "height": 31
                },
                "flammen": {
                    "idle": this.flammen_crouch_top, 
                    "fire": this.flammen_crouch_top, 
                    "width": 50,
                    "height": 33
                },
            },
            "down-back": {
                "pistol": {
                    "idle": this.pistol_crouch, 
                    "fire": this.pistol_crouch_fire, 
                    "width": 50,
                    "height": 28,
                },
                "ar": {
                    "idle": this.rifle_crouch, 
                    "fire": this.rifle_crouch_fire,
                    "width": 50,
                    "height": 29
                },
                "flammen": {
                    "idle": this.flammen_crouch, 
                    "fire": this.flammen_crouch, 
                    "width": 44,
                    "height": 33
                },
            },
            "back": {
                "pistol": {
                    "idle": this.pistol_stand, 
                     "fire": this.pistol_fire, 
                     "width": 44,
                     "height": 34 
                }, 
                "ar": {
                    "idle": this.rifle_stand, 
                    "fire": this.rifle_fire,
                    "width": 44,
                    "height": 40
                },
                "flammen": {
                    "idle": this.flammen_stand, 
                    "fire": this.flammen_stand, 
                    "width": 44,
                    "height": 39
                },
            },
            "diagnal-back": {
                "pistol": {
                    "idle": this.pistol_stand_up, 
                    "fire": this.pistol_up_fire, 
                    "width": 43,
                    "height": 36,
                },
                "ar": {
                    "idle": this.rifle_stand_up, 
                    "fire": this.rifle_up_fire,
                    "width": 43,
                    "height": 38
                },
                "flammen": {
                    "idle": this.flammen_stand_up, 
                    "fire": this.flammen_stand_up, 
                    "width": 44,
                    "height": 40
                },
            }
        };

        this.spriteWidth = 50;
        this.spriteHeight = 28;
        this.minFrame = 0;
        this.maxFrame = 2;

        this.animation = true;
        this.animationTime = 0.5

        this.distFromFloor;
    }
    
    draw(context) {
        // SHOOTER HEIGHT CHANGED HERE:

        // WEAPON is undefined. 
        this.width = this.images[this.angle][this.weapon]["width"];
        this.height = this.images[this.angle][this.weapon]["height"];
        this.image = this.images[this.angle][this.weapon]["idle"];

        // REVELATION: no need to call "this.images" over and over again. I can just do it once.
        context.font = "20px serif";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
    }

    update(context, deltaTime) { 
        this.y = canvas.height - (canvas.height * (1/4)) - this.height;

        switch (this.angle) {
            // 44x34
            // FIRE: 44×34
            case "straight":
            case "back":
                if (this.weapon == "flammen") this.bulletY = 12;
                else if (this.weapon == "ar") {
                    this.bulletX = this.width - 15;
                    this.bulletY = 7;
                }
                else this.bulletY = 1;
                break; 

            // 43x36
            case "diagnal":
            case "diagnal-back":
                if (this.weapon == "flammen") this.bulletY = 5;
                else if (this.weapon == "ar") {
                    this.bulletY = 10;
                    this.bulletX = 19;
                }
                else this.bulletY = 5;
                break;

            // 44×36
            // FIRE: 44x39
            case "up":
                this.bulletX = 19;
                break;

            // 50x30
            // FIRE: 50×33
            case "down-up":
                this.bulletX = 23;
                break;

            // 50x28
            // FIRE: 50×28
            case "down":
            case "down-back":
                // 50x28
                this.bulletY = 11;
                this.bulletX = 23;
                break;

            // 49x30
            // FIRE: 49×34
            case "diagnal-duck":
                // 49x30
                break;
        }
        
        // FEEL LIKE I CAN SOLVE SECOND SHOOTER IMAGE CRAP HERE:
        if (this.dead) {
            this.y = 191;
            this.angle = "straight";
            context.drawImage(this.dead_warren, this.x, this.y + 2);
        } else {
            if (["straight", "down", "diagnal-duck", "down-up", "diagnal", "up"].includes(this.angle)) {
                if (this.shooting && this.animation) {
                    context.drawImage(this.images[this.angle][this.weapon]["fire"], this.x, this.y);
                } 
                else if (this.throwBoom) {
                    if (!this.duck) {
                        this.y = canvas.height - (canvas.height * (1/4)) - 40;
                        context.drawImage(this.grenade_stand, this.x, this.y);
                    } else {
                        this.y = canvas.height - (canvas.height * (1/4)) - 34;
                        context.drawImage(this.grenade_crouch, this.x, this.y);
                    }
                }
                else context.drawImage(this.image, this.x, this.y);
            } else {
                context.save();
                context.translate(this.x + this.width, this.y);
                context.scale(-1,1);
                context.drawImage(this.image, 0, 0);
    
                // this.animation is necessary for pistol, not ar:
                if (this.shooting) {
                    context.drawImage(this.images[this.angle][this.weapon]["fire"], 0, 0);
                }
                else context.drawImage(this.image, 0, 0);
                
                context.restore();
            }
        }

        // UNCOMMENT AND REPLACE: 
        if (this.shooting && this.weapon == "pistol") {
            setTimeout(() => {
                this.animation = false;
            }, 50);
        } 
        else this.animation = true;

        if (this.isSecond == true && this.initSecond == true) {
            // this.weapon = weapon;
            // this.image = image;
            if (this.x <= 200) this.x += 5;
            else this.secondReady = true;
        }  

        // else this.secondReady = true;

        // code doesn't work. fireRate not set.    
        if (this.shooting && !this.disabled) {
            // this.timer++;
            this.timer += deltaTime;

            const fireInterval = 1 / (this.fireRate * 10);
            // const fireInterval = 1 / 3;

            // DELTATIME NEEDS TO BE IMPLEMENTED HERE (pushing projectiles):
            
            // FIRERATE FOR RIFLE IS 15. FOR FLAMMEN IT'S TEN.
            // At 60 hertz, this value will have to be lowered.
            if (this.timer >= fireInterval || this.timer === deltaTime) {
            // that 1st part is needed to make automatic fire possible:
            // if (this.timer % this.fireRate === 0  || this.timer == 1) {
                this.projectiles.push(new Projectile(this.x + this.bulletX, this.y + this.bulletY, this.angle, this.weapon, this.delete, false));
                if (this.secondStream == true) {
                    this.projectiles.push(new Projectile(this.secondX, this.y + this.bulletY, this.angle, this.weapon, this.delete, true));
                }   
                
                if (this.specialAmmo > 0) {
                    this.specialAmmo--;
                }
                else {
                    this.weapon = "pistol";
                    this.fireRate = 0;
                    this.specialAmmo = 0;
                }

                this.timer -= fireInterval;
            }
        }
        else {
            this.timer = 0;
        }
    }
}