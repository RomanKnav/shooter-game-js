// FILE SHAT OUT BY CHATGPT:

/* given an array of urls and a callback function to call once all images are loaded.
   what exactly does this func return? How do I use imagesArray?

   It doesn't return anything. It's a UTILITY function.

   It is designed as a utility function to preload images and execute a callback 
   function once all images are loaded or attempted to load.

   ChatGPT has satisfied my questions.
*/

export function preloadImages(imageUrls, callback) {
    let loadedImages = 0;

    // what's this array? it stores IMAGE objects.
    // It'll end up looking like this: [img, img, img, img, img, img, img, img, img]
    const imagesArray = [];
  
    for (let i = 0; i < imageUrls.length; i++) {
        // this.image = new Image();
        // this.image.src = "src/assets/images/pickups/clears/grenade copy.png";
    
        // here's where image objects created:
        // I've never seen shit added to arrays like this (like a dictionary):
        imagesArray[i] = new Image();
        imagesArray[i].src = imageUrls[i];
    
        imagesArray[i].onerror = () => {
            console.error(`Failed to load image, lmfao: ${imageUrls[i]}`);
            loadedImages++;
        };

        imagesArray[i].onload = () => {
            loadedImages++;
            if (loadedImages === imageUrls.length && callback) {
                callback();
                console.log(imagesArray);
            }
        };
    }
}
  
  // Example usage
  const imagesToPreload = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ];
  
//   preloadImages(imagesToPreload, () => {
//     console.log('All images preloaded!');
//     console.log();
//   });
  