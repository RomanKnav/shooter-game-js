// import { imagePreloader } from '/src/imagePreloader.js';

import { preloadedImages } from './imagePreloader.js';
// THIS IS AN ARRAY OF IMAGE OBJECTS

// by this point, "ready" is already populated with img object values.

console.log(preloadedImages["aidConcept"]);

// window.onload = function() {
//     // what're args again? array, dict, callback for error/success handling:
//     imagePreloader(images, ready, () => {
//         for (const name in ready) {
//             // const name = images[image].substring(images[image].lastIndexOf('/') + 1, 
//             //              images[image].lastIndexOf('.'));
//             console.log(`${name}`, "successfully loaded!");
//         }
//         console.log('*********ALL the images have been preloaded!************');
//         console.log("number of images: " + (images.length).toString());
//     });
// };

// FIRST VICTIM: health.js
// the way window.onload works, this code will execute BEFORE the above code ^^^
// let ego = ready["grenade"];
// console.log("lol");
// console.log(ready);
