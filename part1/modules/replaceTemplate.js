// TODO: Export the replaceTemplate function that takes a template and a product object as arguments and returns a modified HTML template to be used in other files

// * Filling templates functions:
// ! This function takes a template and replaces placehosslders with actual product data.
// ! export the function using module.exports to be used in other files.
module.exports = (temp, product) => {
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