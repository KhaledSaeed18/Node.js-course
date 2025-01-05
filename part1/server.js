// import http module
const http = require('http');

// ! Create an HTTP Server
const server = http.createServer((req, res) => {
    // console.log(req); // check the request object.
    // console.log(req.url); // check the request URL
    const pathName = req.url;

    // ? if path: http://127.0.0.1:8000 send:
    if (pathName === '/') {
        res.end('This is the -home-'); // Send a response.
    }
    // ? if path: http://127.0.0.1:8000/overview send:
    else if (pathName === '/overview') {
        res.end('This is the -overview-'); // Send a response.
    }
    // ? if path: http://127.0.0.1:8000/product send:
    else if (pathName === '/product') {
        res.end('This is the -product-'); // Send a response.
    }
    // ? if a route other than: / - /overview - /product visited send:
    else {
        // ! HTTP header: piece of information about the respone that we are send back
        res.writeHead(404, { // 404 status code (not found)
            'Content-type': 'text/html', // content type browser except to receive
            'my-own-header': 'hello world' // custom header
        }); 
        // * Header most sent before the response content 
        // * One the header we select the content type as text/html, so we send the response as an html.
        res.end('<h1>Page Not Found!</h1>'); // Send a response.
    }

})

// ! Lisent to incoming requests from the client:
const portNb = 8000;
server.listen(portNb, '127.0.0.1', () => {
    console.log(`Listening to requests on port ${portNb}`)
}); // lisent on local host port 8000 => http://127.0.0.1:8000
