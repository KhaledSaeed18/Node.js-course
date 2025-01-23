/**
 * Main module demonstrating different module import patterns and caching in Node.js
 * 
 * This file shows three different ways to work with modules:
 * 1. Class-based module exports using module.exports
 * 2. Object destructuring exports using exports object
 * 3. Module caching demonstration
 * 
 * Note on caching: Node.js caches modules after they are loaded for the first time.
 * When a module is required multiple times, Node.js returns the same cached instance
 * rather than reloading and re-executing the module code. This is why multiple
 * requires of test-module-3 will reuse the same instance.
 * 
 * @module modules
 * @requires ./test-module-1 - Class-based calculator module
 * @requires ./test-module-2 - Module with destructured math functions
 * @requires ./test-module-3 - Module demonstrating caching behavior
 * 
 * @example
 * // Using class-based module
 * const C = require("./test-module-1");
 * const calc1 = new C();
 * calc1.add(2, 5); // Returns 7
 * 
 * // Using destructured exports
 * const { add, multiply } = require("./test-module-2");
 * multiply(2, 5); // Returns 10
 * 
 * // Demonstrating module caching
 * require("./test-module-3")(); // First call - initializes module
 * require("./test-module-3")(); // Uses cached instance
 * require("./test-module-3")(); // Uses cached instance
 */

// exports
// const calc2 = require("./test-module-2");
const { add, multiply } = require("./test-module-2");
console.log(multiply(2, 5));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
