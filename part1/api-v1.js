// ? API: Application Programming Interface.
// ? JSON: JavaScript Object Notation.

/*
    ! Version 1:
        * Uses fs.readFile() inside the HTTP request handler.
        * Every time the '/api' route is requested, the server reads data.json from the file system.
        * Disadvantages:
            * The file is read from the file system every time a request is made to /api,
            * This can be inefficient if the file is large or if there are many requests,
            * it introduces unnecessary file I/O operations on every request.
*/

// import http and fs module
const http = require('http');
const fs = require('fs');

// ! Create an HTTP Server
const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/api') {
        // ? __dirname: where the current file is located
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            // Read data from a json file called data.json
            /*
                ! JSON.parse(): Converts a JSON string into a JavaScript object
                    * Takes a valid JSON string as input
                    * Returns a JavaScript object (or array, depending on the structure)

                ! JSON.stringify(): Converts a JavaScript object (or array) into a JSON string
                    * Takes a JavaScript object, array, or value
                    * Returns a JSON-formatted string
            */

            const productData = JSON.parse(data);
            /*
                console.log(productData); // ! JavaScript object (actual object structure)
                console.log(data); // ! raw JSON string (content of data.json as a string)
            */

            res.writeHead(200, { // 200 status code (OK)
                'Content-type': 'application/json', // tells the browser that the content returned is in JSON format
            });
            res.end(data);
        })
    }
    else {
        res.writeHead(404, { // 404 status code (Not Found)
            'Content-type': 'text/html', // content type browser except to receive
        });
        res.end('<h1>Page Not Found!</h1>');
    }

})

// ! Lisent to incoming requests from the client:
const portNb = 8000;
server.listen(portNb, '127.0.0.1', () => {
    console.log(`Listening to requests on port ${portNb}`)
}); // lisent on local host port 8000 => http://127.0.0.1:8000
