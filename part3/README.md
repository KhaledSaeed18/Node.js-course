# Asynchronous JavaScript | Promises and Async/Await

## Introduction

🔄️ Node.js is fundamentally built around asynchronous code execution. While traditionally this was handled using callback functions, modern JavaScript provides more elegant and maintainable solutions: **Promises and Async/Await.**

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
