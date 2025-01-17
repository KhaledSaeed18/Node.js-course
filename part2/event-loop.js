// ? setTimeout: Schedules a callback function to be executed in the timers phase after a specified delay (minimum 0ms).
// ? setImmediate: Schedules a callback function to be executed in the check phase, after I/O callbacks.
// ? readFile: Reads the contents of a file asynchronously and executes its callback in the I/O callbacks phase.
// ? nextTick: Schedules a callback function to be executed before the event loop continues (higher priority than timers or immediate).
// ? pbkdf2Sync: Uses a key derivation function to hash a password. Runs in the libuv thread pool, affecting performance.

// Import the fs module to read the contents of a file asynchronously.
const fs = require("fs");

// Import the crypto module to hash a password using PBKDF2.
const crypto = require("crypto");

// Store the current time in milliseconds, used to demonstrate the event loop and the order in which callbacks execute.
const start = Date.now();

// Set the thread pool size to 4 (default in Node.js).
process.env.UV_THREADPOOL_SIZE = 4;

// Schedule a timer callback with 0ms delay. It executes in the timers phase.
setTimeout(() => console.log("Timer 1 finished"), 0);

// Schedule an immediate callback. It executes in the check phase, after I/O callbacks (if any).
setImmediate(() => console.log("Immediate 1 finished"));

// Read the contents of a file asynchronously.
fs.readFile("test-file.txt", () => {
  // This callback executes in the I/O callbacks phase after the file read operation completes.
  console.log("I/O finished");

  console.log("----------------");

  // Schedule another timer callback with 0ms delay. It executes in the timers phase after the next loop iteration.
  setTimeout(() => console.log("Timer 2 finished"), 0);

  // Schedule a timer callback with a 3-second delay.
  setTimeout(() => console.log("Timer 3 finished"), 3000);

  // Schedule another immediate callback. It executes in the check phase after I/O callbacks.
  setImmediate(() => console.log("Immediate 2 finished"));

  // Schedule a microtask (higher priority than any event loop phase).
  process.nextTick(() => console.log("Process.nextTick"));

  // Use pbkdf2Sync to hash a password. This runs in the thread pool and blocks execution.
  // Since UV_THREADPOOL_SIZE is 4, only 4 tasks run in parallel.
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
});

// Log this message immediately since it is top-level synchronous code.
console.log("Hello from the top-level code");

// ! Expected Output (Approximate)
/*
  Hello from the top-level code
  Timer 1 finished
  Immediate 1 finished
  I/O finished
  ----------------
  1726 Password encrypted
  3329 Password encrypted
  4946 Password encrypted
  6620 Password encrypted
  Process.nextTick
  Immediate 2 finished
  Timer 2 finished
  Timer 3 finished
*/

// ? Explanation
// 1. "Hello from the top-level code" logs first because it is synchronous.
// 2. `setTimeout(0)` and `setImmediate()` are scheduled.
// 3. `fs.readFile()` is called but does not block execution.
// 4. The event loop starts:
//    - "Timer 1 finished" (timers phase).
//    - "Immediate 1 finished" (check phase).
// 5. Once the file read operation completes, its callback executes:
//    - "I/O finished" logs first (I/O callbacks phase).
//    - pbkdf2Sync runs (blocking the thread pool).
//    - "Password encrypted" messages log with timestamps showing thread pool delay.
//    - `process.nextTick` runs **before** any further event loop execution.
//    - "Immediate 2 finished" (check phase).
//    - "Timer 2 finished" (timers phase).
// 6. "Timer 3 finished" logs after 3 seconds.
