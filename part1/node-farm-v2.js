// TODO: HTTP server dynamically generates product pages by reading data from JSON files and templates. replace placeholders in HTML templates with real product data and returns dynamic content to the client.
// ! Version 2: Uses replaceTemplate function imported from another module

// Core Modules
const http = require('http');
const fs = require('fs');
const url = require('url');

// Own Modules
const replaceTemplate = require('./modules/replaceTemplate'); // import the replaceTemplate function we created in replaceTemplate.js module


// * Read the JSON data file from the dev-data folder, Reading the data synchronously as the server starts only once.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data); // ! Convert the JSON string into an array of product objects

// * Read HTML templates from the templates folder, this HTML files that serve as templates to display the content
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8'); // Template for overview page
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8'); // Template for individual product page
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8'); // Template for individual product card

const server = http.createServer((req, res) => {

    /*
    console.log(req.url); // => /product?id=#
    console.log(url.parse(req.url, true)); // => { search: '?id=#',query: [Object: null prototype] { id: '#' }, pathname: '/product', path: '/product?id=#', href: '/product?id=#'}
    */

    // * Get the query and pathname from the URL
    const { query, pathname } = url.parse(req.url, true);

    // * Overview page: If the user requests the root('/') or '/overview', render the overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html', // Specify that the response is in HTML format
        });

        // * Dynamically generate the product cards using the template
        // ? dataObj is an array of product objects from the JSON file
        // ? We map over each product object, replace the placeholders in the card template, and join them into one string.
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

        // * Insert the generated product cards into the overview template
        // ? Replace the {%PRODUCT_CARDS%} placeholder in the overview template with the actual cards HTML
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

        // ! Send the final HTML response
        res.end(output)
    }

    // * Product page
    else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html', // Specify that the response is in HTML format
        });
        const product = dataObj[query.id]; // Get the product object based on the provided ID

        const output = replaceTemplate(tempProduct, product); // Replace the placeholders in the product template with the actual product data
        res.end(output);
    }

    // * Not Found page
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end('<h1>Page Not Found!</h1>');
    }

})

const portNb = 8000;
server.listen(portNb, '127.0.0.1', () => {
    console.log(`Listening to requests on port ${portNb}`)
}); 
