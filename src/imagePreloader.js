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

            // gets name to set as key (word that comes after last "/" and before last "."):
            const name = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
            // key: name, value: image object:
            dict[name] = image; 

            // If all images are loaded, call the callback:
            if (loadedImages === imageUrls.length && callback) {
                callback();
            }
        };

        // Increment the loadedImages counter even if an image fails to load.
        image.onerror = () => {
            console.error(`Failed to load image, LMFAO: ${url}`);
            loadedImages++;
            if (loadedImages === imageUrls.length && callback) {
                callback();
            }
        };  
    });
};

// looks good here. This is just the func. No actual preloading done here.
// That's done in readyImages.js.