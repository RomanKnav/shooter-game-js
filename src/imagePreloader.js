// FILE SHAT OUT BY CHATGPT:

/* given an array of urls and a callback function to call once all images are loaded.
   what exactly does this func return? How do I use imagesArray?

   It doesn't return anything. It's a UTILITY function.

   It is designed as a utility function to preload images and execute a callback 
   function once all images are loaded or attempted to load.

   ChatGPT has satisfied my questions.
*/

// takes image url array, dict to store preloaded images in, and callback func:
export function imagePreloader(imageUrls, dict, callback) {
    let loadedImages = 0;
  
    // create new image obj for each URL:
    imageUrls.forEach((url) => {
        const image = new Image();
        image.src = url;

        // if image loaded successfully:
        image.onload = () => {
            loadedImages++;
            // If all images are loaded, call the callback:
            if (loadedImages === imageUrls.length && callback) {
                callback();
            }
        };

        // Increment the loadedImages counter even if an image fails to load.
        image.onerror = () => {
            console.error(`Failed to load image: ${url}`);
            loadedImages++;
        };

        // gets name to set as key (word that comes after last "/" and before last "."):
        const name = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
        // key: name, value: image object:
        dict[name] = image;   
    });
};