import { imagePreloader } from '/src/imagePreloader.js';

// by this point, "ready" is already populated with img object values.

export const images = [
    // HEALTH ICONS/PICKUPS
    "src/assets/images/pickups/clears/aidConcept.png",
    "src/assets/images/pickups/clears/wall.png",
    "src/assets/images/pickups/clears/grenade.png",
    "src/assets/images/pickups/clears/flammen.png",
    "src/assets/images/pickups/clears/rifle.png",

    // ENEMY:
    "src/assets/images/civy/new-frames/civysheet.png", 
    "src/assets/images/civy/new-frames/civysheet2.png",
    "src/assets/images/dog/dog-frames/dogsheet.png",
    "src/assets/images/maggot/spritesheet/maggotsheet.png",
    "src/assets/images/assault-pig/pig-walk-clear/pigFrames.png",
    "src/assets/images/assault-pig/pig-stand-clear.png",
    "src/assets/images/assault-pig/pig-stand-fire.png",
    "src/assets/images/pig-plane-clear.png",
    "src/assets/images/bomber/bomber-clear.png",
    "src/assets/images/bomber/bomber-fire.png",
    "src/assets/images/enemy-sheep/girl-frames/clears/girlsheet.png",
    "src/assets/images/enemy-sheep/girl-sheep-clear.png",

    // SHEEP:
    "src/assets/images/CLEARS/nade/nade_stand.png",
    "src/assets/images/CLEARS/nade/sheep-nade-crouch.png",
    "src/assets/images/CLEARS/dead-warren/dead-warren-clear.png",
    "src/assets/images/CLEARS/pistol/sheep-pistol-clear-elevate.png",
    "src/assets/images/CLEARS/pistol/sheep-pistol-lookup-clear.png",
    "src/assets/images/CLEARS/pistol/sheep-pistol-top-clear.png",
    "src/assets/images/CLEARS/pistol/sheep-pistol-crouch-clear-new.png",
    "src/assets/images/CLEARS/pistol/sheep-pistol-lookup-crouch-clear.png",
    "src/assets/images/CLEARS/pistol/sheep-pistol-crouch-top-clear.png",
    "src/assets/images/CLEARS/rifle/sheep-rifle-clear-elevate.png",
    "src/assets/images/CLEARS/rifle/sheep-rifle-up-clear.png",
    "src/assets/images/CLEARS/rifle/sheep-rifle-top-clear.png",
    "src/assets/images/CLEARS/rifle/sheep-rifle-crouch-clear.png",
    "src/assets/images/CLEARS/rifle/sheep-rifle-up-crouch-clear.png",
    "src/assets/images/CLEARS/rifle/sheep-rifle-top-crouch-clear.png",
    "src/assets/images/CLEARS/flammen/flammen-stand.png",
    "src/assets/images/CLEARS/flammen/flammen-stand-up.png",
    "src/assets/images/CLEARS/flammen/flammen-crouch.png",
    "src/assets/images/CLEARS/flammen/flammen-crouch-up.png",
    "src/assets/images/CLEARS/flammen/flammen-top.png",
    "src/assets/images/CLEARS/flammen/flammen-crouch-top.png",
    "src/assets/images/fires/pistol/sheep-pistol-clear-elevate-fire.png",
    "src/assets/images/fires/pistol/sheep-pistol-lookup3.png",
    "src/assets/images/fires/pistol/sheep-pistol-top3.png",
    "src/assets/images/fires/pistol/sheep-pistol-crouch-new.png",
    "src/assets/images/fires/pistol/sheep-pistol-lookup-crouch3.png",
    "src/assets/images/fires/pistol/pistol-crouch-top3.png",
    "src/assets/images/fires/rifle/rifle-stand3-elevate.png",
    "src/assets/images/fires/rifle/rifle-stand-up.png",
    "src/assets/images/fires/rifle/rifle-stand-top.png",
    "src/assets/images/fires/rifle/rifle-crouch-new.png",
    "src/assets/images/fires/rifle/rifle-crouch-lookup3.png",
    "src/assets/images/fires/rifle/rifle-crouch-top2.png",

    // BACKGROUND:
    "src/assets/images/background/background-working3.png",

    // EXPLOSION:
    "src/assets/images/sprites/exp2FirstFramesPixel.png",
];

export const ready = {};    // image objects added here in readyImages.js
// by the time the func below finishes, ready will be populated.


window.onload = function() {
    // what're args again? array, dict, callback for error/success handling:
    imagePreloader(images, ready, () => {
        for (const name in ready) {
            // const name = images[image].substring(images[image].lastIndexOf('/') + 1, 
            //              images[image].lastIndexOf('.'));
            console.log(`${name}`, "successfully loaded!");
        }
        console.log('*********ALL the images have been preloaded!************');
        console.log("number of images: " + (images.length).toString());
    });
};

// FIRST VICTIM: health.js
// the way window.onload works, this code will execute BEFORE the above code ^^^
// let ego = ready["grenade"];
// console.log("lol");
// console.log(ready);


/* 
CHATGPT (readyImages.js):

// THIS FUNC RETURNS A FUCKING PROMISE OBJECT.
export function preloadImages() {
    return new Promise((resolve, reject) => {
        window.onload = function() {
            imagePreloader(images, ready, () => {
                for (const name in ready) {
                    console.log(`${name} successfully loaded!`);
                }
                console.log('*********ALL the images have been preloaded!************');
                console.log("number of images: " + images.length.toString());
                resolve();
            });
        };
    });
}
*/