// class Calculator {
//   add(a, b) {
//     return a + b;
//   }

//   multiply(a, b) {
//     return a * b;
//   }

//   divide(a, b) {
//     return a / b;
//   }
// }

module.exports = class {
  /**
   * Adds two numbers together
   * @param {number} a - The first number to add
   * @param {number} b - The second number to add
   * @returns {number} The sum of a and b
   */
  add(a, b) {
    return a + b;
  }

  /**
   * Multiplies two numbers together.
   * @param {number} a - The first number to multiply
   * @param {number} b - The second number to multiply
   * @returns {number} The product of a and b
   */
  multiply(a, b) {
    return a * b;
  }

  /**
   * Divides two numbers.
   * @param {number} a - The dividend (number to be divided).
   * @param {number} b - The divisor (number to divide by).
   * @returns {number} The quotient of a divided by b.
   */
  divide(a, b) {
    return a / b;
  }
};
