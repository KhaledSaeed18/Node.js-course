// TODO: Waiting for Multiple Promises Simultaneously

// Import the required modules
const fs = require('fs');
const superagent = require('superagent');

// Creating a promise to read the content of a file
const readFilePromise = file => {
    // Using the Promise constructor to create a new promise
    return new Promise((resolve, reject) => {
        // Reading the content of the file
        fs.readFile(file, 'utf8', (err, data) => {
            // rejecting the promise if there is an error while reading the file
            if (err) reject('Error reading the file!');
            // resolving the promise if the file is read successfully
            resolve(data);
        });
    });
};

// Creating a promise to write the content of a file
const writeFilePromise = (file, data) => {
    // Using the Promise constructor to create a new promise
    return new Promise((resolve, reject) => {
        // Writing the content to the file
        fs.writeFile(file, data, err => {
            // rejecting the promise if there is an error while writing the file
            if (err) reject('Error writing the file!');
            // resolving the promise if the file is written successfully
            resolve('Success!');
        });
    });
};

// Using async/await to read and write the content of a file
const getDogPic = async () => {
    try {
        // Reading the content of the file
        // The await keyword is used to wait for the promise to be resolved
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        // Fetching images from the API
        const res1Promise = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res2Promise = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res3Promise = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );

        // Waiting for all the promises to be resolved
        // The Promise.all method is used to wait for all the promises to be resolved
        const all = await Promise.all([
            res1Promise,
            res2Promise,
            res3Promise
        ]);

        // Extracting the image URLs from the response
        const images = all.map(image => image.body.message);
        console.log(images);

        // Writing the image to a file
        await writeFilePromise('dog-image.txt', images.join('\n'));
        console.log('Image saved to file!');
    } catch (err) {
        console.log(err);
        throw err;
    }
    return 'READY 🐶';
};

// Calling the function to get the image of the dog
getDogPic();
