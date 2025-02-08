# Asynchronous JavaScript | 🔄️ Async/Await

## Introduction

🔄️ Node.js is fundamentally built around asynchronous code execution. While traditionally this was handled using callback functions, modern JavaScript provides more elegant and maintainable solutions: **Promises and Async/Await.**

## Understanding Async/Await

Async/await is syntactic sugar for promises, making asynchronous code look and behave more like synchronous code. It provides a more elegant way to handle promises.

### The `async` Keyword

- Makes a function return a Promise automatically
- Only inside an async function can we use the `await` keyword
- Transforms a regular function into an asynchronous function

```javascript
// Regular function
function getData() {
    return "data";
}

// Async function
async function getData() {
    return "data";  // Automatically wrapped in a Promise
}
```

### The `await` Keyword

- Can only be used inside async functions
- Pauses the execution until a Promise is resolved
- Extracts the resolved value from the Promise
- Makes asynchronous code look synchronous

### Example: Converting Promise Chains to Async/Await

Before (Promise chain):

```javascript
readFilePromise(`${__dirname}/dog.txt`)
    .then(data => {
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        return writeFilePromise('dog-image.txt', res.body.message);
    })
    .catch(err => console.log(err));
```

After (Async/Await):

```javascript
async function getDogPic() {
    try {
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        await writeFilePromise('dog-image.txt', res.body.message);
        console.log('Success!');
    } catch (err) {
        console.log(err);
    }
}
```

### Key Benefits

1. **Cleaner Code**: Eliminates `.then()` chains
2. **Better Error Handling**: Use traditional try/catch blocks
3. **Easier Debugging**: Code looks more like synchronous code
4. **Sequential Reading**: Code reads top to bottom
5. **Variable Scoping**: Better access to variables in outer scope

### Important Notes

- Await only works with Promises
- Async functions always return Promises
- Error handling uses try/catch instead of .catch()
- Multiple awaits will run sequentially (one after another)
