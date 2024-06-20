// honestly, I don't see how this actually helps

// takes image url array, dict to store preloaded images in, and callback func:
function imagePreloader(imageUrls) {
    const preloadedImages = {};
  
    // create new image obj for each URL:
    imageUrls.forEach((url) => {
        const image = new Image();
        image.src = url;

        // gets name to set as key (word that comes after last "/" and before last "."):
        const name = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
        // key: name, value: image object:
        preloadedImages[name] = image; 
    });

    return preloadedImages;
};

const imageUrls = [
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

const soundUrls = [
    "src/assets/music/prey's stand.mp3",
    "src/assets/music/hit-back.mp3",
    "src/assets/sounds/rifleReload.mp3",
    "src/assets/sounds/grenadePin.mp3",
    "src/assets/sounds/futureReload.mp3",
    "src/assets/sounds/3 heal spells/healspell1.mp3",
    "src/assets/sounds/3 heal spells/healspell2.mp3",
    "src/assets/sounds/shots/pistol.wav",
    "src/assets/sounds/shots/cg1.wav",
    "src/assets/sounds/laser.mp3",
    "src/assets/sounds/shots/rifle.wav",
    "/src/assets/sounds/paco.flac",
    "src/assets/sounds/ray-beam.mp3",
    "src/assets/sounds/laser-buzz.mp3",
    "src/assets/sounds/animals_dog_yelp_med_large.mp3",
    "src/assets/sounds/paco.flac",
    "src/assets/sounds/explosionLoud.mp3",
    "src/assets/sounds/q009/glauncher.ogg",
    "src/assets/sounds/pulse.wav",
    "src/assets/sounds/crowd2.mp3"
];

// Preloaded assets:
const preloadedImages = imagePreloader(Object.values(imageUrls));
const preloadedSounds = imagePreloader(Object.values(soundUrls));

export { preloadedImages, preloadedSounds };