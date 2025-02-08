// TODO: Using async/await to read and write the content of a file

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

        // Fetching the image of the dog from the API
        const res = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        console.log(res.body.message);

        // Writing the image to a file
        await writeFilePromise('dog-image.txt', res.body.message);
        console.log('Image saved to file!');
    } catch (err) {
        console.log(err);
    }
};

// Calling the function to get the image of the dog
getDogPic();