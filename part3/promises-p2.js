// TODO: 

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

// Call the readFilePromise function to read the content of dog.txt file
readFilePromise(`${__dirname}/dog.txt`)
    // Using the then method to handle the resolved promise
    .then(data => {
        console.log(`Breed: ${data}`);
        // Making a request to the dog.ceo API to get the image of the dog breed
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    // Chaining another then method to handle the resolved promise
    .then(res => {
        console.log(res.body.message);
        // Writing the image to the file
        return writeFilePromise(`${__dirname}/dog-image.txt`, res.body.message);
    })
    // Chaining another then method to handle the resolved promise
    .then(() => {
        console.log('Image saved to file!');
    })
    // Using the catch method to handle the rejected promise
    .catch(err => {
        console.log(err);
    });

