// KEEP IN MIND: NEED TO PRELOAD SOUND EFFECTS TOO

export default class Pickup {
    constructor(x, y, round, images) {

        // this.width = this.height = 25;
        this.width = this.height = 20;

        this.x = x;
        this.y = y;
        this.delete = false;

        // this.sound;
        this.sound;
        this.round = round;

        this.images = images;

        this.sfx = {
            // PICKUP SFX:
            arReload: new Howl({
                src: [
                    "src/assets/sounds/rifleReload.mp3",    // good
                ],
                preload: true,
                volume: 1,
            }),
            nadePin: new Howl({
                src: [

                    "src/assets/sounds/grenadePin.mp3",     // good
                ],
                preload: true,
                volume: 1,
            }),
            flammenReload: new Howl({
                src: [

                    "src/assets/sounds/futureReload.mp3",   // good
                ],
                preload: true,
                volume: 1,
            }),
            health: new Howl({
                src: [

                    "src/assets/sounds/3 heal spells/healspell1.mp3",
                ],
                preload: true,
                loop: false,
            }),
            wall: new Howl({
                src: [

                    "src/assets/sounds/3 heal spells/healspell2.mp3",
                ], 
                preload: true,
                loop: false,
                volume: 1
            }),
        }

        // ONLY A 0/10 CHANCE TO SPAWN PICKUP IN GENERAL (see enemy.js):
        // equal chance to spawn aid and weapons?
        this.typeNum = Math.floor(Math.random() * 10);

        // how many pickup types? IIIII ->  5

        this.nadeOdds = 10;  // 5
        this.aidOdds = 5;    // 4
        // this.weaponOdds = 1; // 2
        this.weaponOdds = 4;
        
        //  FIX THIS CRAP
        // this introduced at round
        this.weapon = ["flammen", "ar"][Math.floor(Math.random() * 2)];
        this.aid = ["health", "wall"][Math.floor(Math.random() * 2)];

        // type by default is ar
        this.type;

        this.image = new Image();
        // this.image;
    }

    // if not current respective weapon round, should default to aid pickup
    update() {
       //this.y += 5;
       this.y += 10;

        // NEEDS LOADS OF WORK DONE:
        // weaponOdds encompasses flammen, ar, and grenade
        // REMEMBER: typeNum is num 0-10
        if (this.typeNum <= this.weaponOdds) {
            if (this.round <= 6) this.type = "ar";
            // if (this.round <= 1) this.type = "ar";
            else this.type = this.weapon;
        }
        else if (this.typeNum <= this.aidOdds) this.type = this.aid;
        else if (this.typeNum <= this.nadeOdds) this.type = "grenade";

        //  SOUND TO PLAY WHEN PICKED UP:
        switch (this.type) {
            case "flammen":
                this.sound = this.sfx.flammenReload;
                // this.image.src = "src/assets/images/pickups/clears/flammen copy.png";
                this.image = this.images["flammen"];
                break;
            case "ar":
                this.sound = this.sfx.arReload;
                // this.image.src = "src/assets/images/pickups/clears/rifle copy.png";
                this.image = this.images["rifle"];
                break;
            case "grenade":
                this.sound = this.sfx.nadePin;
                // this.image.src = "src/assets/images/pickups/clears/grenade copy.png";
                this.image = this.images["grenade"];
                break;
            case "health":
                this.sound = this.sfx.health;
                // this.image.src = "src/assets/images/pickups/clears/aidConcept copy.png";
                this.image = this.images["aidConcept"];
                break;
            case "wall":
                this.sound = this.sfx.wall;
                // this.image.src = "src/assets/images/pickups/clears/wall copy.png";
                this.image = this.images["wall"];
                break;
        }
    }

    draw(context) {
        if (!this.delete) {
            context.drawImage(this.image, this.x, this.y);
        };        
    }
}