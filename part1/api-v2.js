// ? API: Application Programming Interface.
// ? JSON: JavaScript Object Notation.

/*
    ! Version 2:
        * Uses fs.readFileSync() at the top level.
        * The file is read once when the server starts, and the content is stored in memory as data.
        * Advantages:
            * The file is read only once when the server starts, so subsequent requests just return the data from memory,
            * This makes the API more efficient and faster, as there’s no repeated file I/O on each request,
            * Because there’s no need to read the file every time a request is made, response times will be faster.
*/

// import http and fs module
const http = require('http');
const fs = require('fs');

// ! Top level code excuted once when ever we satrt the program.
// ! Use Synchronous because its not affecting the code its called one time only.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// ! Create an HTTP Server
const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/api') {
        res.writeHead(200, { // 200 status code (OK)
            'Content-type': 'application/json', // tells the browser that the content returned is in JSON format
        });
        res.end(data)
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
