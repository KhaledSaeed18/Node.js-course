// import file system module (fs)
const fs = require('fs');


// ! Read from file:
// Use readFileSync method from fs to read a text from a file and store the response in a variable
// * Synchronous (Blocking) - code excuted line by line:
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// log the returned data
console.log(textIn);

/*
    * Asynchronous (Non-Blocking):
    * The file writing proccess will be handled in the background,
    * the rest of the code excute normaly without wating the opertation to complete
    * and when finishing the call back function will be called.
*/
fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
    console.log(data); // Exectuted Second
});
console.log('reading file...'); // Exectuted First


// ! Write on a file:
// Store the text we want to add to the file in a variable.
const textOut = `This is what we know about the avocados: ${textIn}.\nCreated on ${Date.now()}.\nBy Khaled saeed`;

// * Synchronous (Blocking) - code excuted line by line-:
// Use writeFileSync method from fs to write a text to a file 
fs.writeFileSync('./txt/output.txt', textOut);
// if output.txt alraedy exist overide it, if no create new one.

console.log('File written!'); // log a message after writing to file to know that we finish

/*
    * Asynchronous (Non-Blocking):
    * The file writing proccess will be handled in the background,
    * the rest of the code excute normaly without wating the opertation to complete
    * and when finishing the call back function will be called.
*/
fs.writeFile('./txt/output.txt', textOut, (err, data) => {
    console.log('finishing writing!'); // Exectuted Second
});
console.log('writing to file...'); // Exectuted First

// ! Async Read and Write example (nested callbacks):
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log(err);
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        if (err) return console.log(err);
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            if (err) return console.log(err);
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, err => {
                if (err) return console.log(err);
                console.log('The file has been written!');
            });
        });
    });
});
console.log('will read file!');


