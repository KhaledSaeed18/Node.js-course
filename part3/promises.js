// TODO: Refactor the code to use promises

// Import the required modules
const fs = require('fs');
const superagent = require('superagent');

// Reading the content of dog.txt file
fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
    if (err) return console.log(err.message);
    console.log(`Breed: ${data}`);

    superagent
        // making a HTTP request to the dog.ceo API using superagent
        // .get() method is used to make a GET request to the specified URL,
        // it returns a promise
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        // .then() method is used to handle the fulfilled promise
        .then(res => {
            console.log(res.body.message);

            // writing the response from the API to a new file
            fs.writeFile('dog-img.txt', res.body.message, err => {
                if (err) return console.log(err.message);
                console.log('Random dog image saved to file!');
            });
        })
        // .catch() method is used to handle the rejected promise
        .catch(err => {
            console.log(err.message);
        });
});