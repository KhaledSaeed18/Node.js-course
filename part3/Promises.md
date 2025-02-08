# Asynchronous JavaScript | 🔄 Promises

## Introduction

Node.js is fundamentally built around asynchronous code execution. While traditionally this was handled using callback functions, modern JavaScript provides more elegant and maintainable solutions: **Promises and Async/Await.**

## Understanding Promises

A Promise in JavaScript represents a value that may not be available immediately but will be resolved at some point in the future. Every Promise goes through a specific lifecycle:

1. **Pending Promise**: The initial state when a promise is created
   - This is the waiting phase where the asynchronous operation is still running
   - The promise hasn't been fulfilled or rejected yet

2. **Resolved Promise**: The promise has finished its execution
   - This leads to one of two possible outcomes:
     - **Fulfilled Promise**: The operation completed successfully
     - **Rejected Promise**: The operation failed

```javascript
// Example of Promise states
const myPromise = new Promise((resolve, reject) => {
    // Promise is in PENDING state here
    
    if (/* operation successful */) {
        resolve(value); // Promise becomes FULFILLED
    } else {
        reject(error);  // Promise becomes REJECTED
    }
});
```

This state management is what makes Promises powerful for handling asynchronous operations in a predictable way.

## Promise Chaining

Promise chaining is a powerful feature that allows you to execute a sequence of asynchronous operations in a specific order. Each `.then()` returns a new promise, enabling you to chain multiple operations.

### Example: Reading, Fetching, and Writing Files

Here's a practical example that demonstrates promise chaining:

1. Read a dog breed from a file
2. Fetch a random dog image of that breed
3. Save the image URL to another file

```javascript
readFilePromise(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`);
        // First operation complete, return a new promise
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        console.log(res.body.message);
        // Second operation complete, return a new promise
        return writeFilePromise(`${__dirname}/dog-image.txt`, res.body.message);
    })
    .then(() => {
        console.log('Image saved to file!');
    })
    .catch(err => {
        // Handle any errors in the chain
        console.log(err);
    });
```

Key benefits of Promise chaining:

- Clean and readable code flow
- Each step depends on the previous step's result
- Single error handler (`catch`) for the entire chain
- Avoids "callback hell"
- Each `.then()` creates a new promise automatically

## Handling Multiple Promises with Promise.all

Sometimes you need to run multiple promises simultaneously and wait for all of them to complete. `Promise.all` takes an array of promises and returns a new promise that resolves when all input promises have resolved.

### Example: Fetching Multiple Dog Images

```javascript
const promise1 = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
const promise2 = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
const promise3 = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);

Promise.all([promise1, promise2, promise3])
    .then(responses => {
        const images = responses.map(res => res.body.message);
        return writeFilePromise('dog-images.txt', images.join('\n'));
    })
    .then(() => {
        console.log('All images saved!');
    })
    .catch(err => {
        console.log('Error:', err);
    });
```

Key features of Promise.all:

- Runs promises in parallel (simultaneously)
- Faster than sequential execution
- If any promise fails, the entire operation fails
- Returns an array of results in the same order as the input promises
- Commonly used for bulk operations
