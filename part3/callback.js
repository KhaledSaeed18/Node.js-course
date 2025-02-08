// TODO: Demonstrate how callback hell can be present in the code when we have multiple asynchronous operations nested inside each other

// Import the required modules
const fs = require('fs');
const superagent = require('superagent');

// Reading the content of dog.txt file
fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
    if (err) return console.log(err.message);
    console.log(`Breed: ${data}`);

    // inside the callback function of readFile, we are reading the content of the file and then making an API request to the dog.ceo API
    // making a HTTP request to the dog.ceo API using superagent
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .end((err, res) => {
            if (err) return console.log(err.message);
            console.log(res.body.message);

            // writing the response from the API to a new file
            fs.writeFile('dog-img.txt', res.body.message, err => {
                if (err) return console.log(err.message);
                console.log('Random dog image saved to file!');
            });
        })
});