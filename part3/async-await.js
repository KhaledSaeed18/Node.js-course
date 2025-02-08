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
        throw err;
    }
    return 'READY 🐶';
};

// Calling the function to get the image of the dog
const getDogPicData = getDogPic();
console.log(getDogPicData); // Promise { <pending> }
// The function returns a promise because it is an async function
// The promise is pending because the function is still executing
// The promise will be resolved when the function execution is completed

// In order to handle the promise returned by the async function, we can use the then() method
getDogPicData
    .then(result => {
        console.log(result); // READY 🐶
        console.log('Task completed!');
    })
    // The then() method is used to handle the resolved value of the promise
    // The result is the resolved value returned by the async function
    // The then() method is called when the promise is resolved
    .catch(err => {
        console.log('Error!');
    });
// The catch() method is used to handle the rejected value of the promise
// The err is the rejected value thrown by the async function
// The catch() method is called when the promise is rejected

// Other way to implement the async/await function
(async () => {
    try {
        const result = await getDogPic();
        console.log(result);
        console.log('Task completed!');
    } catch (err) {
        console.log('Error!');
    }
})();

/*
This syntax is used to create an immediately invoked async function expression (IIFE).
called: Immediately Invoked Function Expression (IIFE)
(async () => {
    ....
})();
*/