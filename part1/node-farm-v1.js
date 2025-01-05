// TODO: HTTP server dynamically generates product pages by reading data from JSON files and templates. replace placeholders in HTML templates with real product data and returns dynamic content to the client.
// ! Version 1: Uses replaceTemplate function in the same file.

const http = require('http');
const fs = require('fs');
const url = require('url');

// * Read the JSON data file from the dev-data folder, Reading the data synchronously as the server starts only once.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data); // ! Convert the JSON string into an array of product objects

// * Read HTML templates from the templates folder, this HTML files that serve as templates to display the content
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8'); // Template for overview page
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8'); // Template for individual product page
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8'); // Template for individual product card

// * Filling templates functions:
// ! This function takes a template and replaces placehosslders with actual product data.
const replaceTemplate = (temp, product) => {
    // Replace {%PRODUCTNAME%} placeholder with the actual product name
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);

    // Replace other placeholders with corresponding product information
    output = output.replace(/{%IMAGE%}/g, product.image); // Replace image placeholder
    output = output.replace(/{%PRICE%}/g, product.price); // Replace price placeholder
    output = output.replace(/{%FROM%}/g, product.from); // Replace origin/country placeholder
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients); //Replace nutrients placeholder
    output = output.replace(/{%QUANTITY%}/g, product.quantity); // Replace quantity placeholder
    output = output.replace(/{%DESCRIPTION%}/g, product.description); // Replace description placeholder
    output = output.replace(/{%ID%}/g, product.id); // Replace product ID placeholder

    // If the product is not organic, replace {%NOT_ORGANIC%} with a CSS class to indicate non-organic products
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }

    // Return the modified HTML template with all placeholders replaced
    return output;
}

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
