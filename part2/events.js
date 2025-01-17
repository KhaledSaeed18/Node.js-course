// Import the built-in events module to work with the EventEmitter class
const EventEmitter = require("events");

// Import the built-in http module to create an HTTP server
const http = require("http");

// Define a custom class that extends EventEmitter, allowing it to emit events
class Sales extends EventEmitter {
  constructor() {
    super(); // Call the parent class constructor (EventEmitter)
  }
}

// Create an instance of the Sales class (which is an EventEmitter)
const myEmitter = new Sales();

// Register an event listener for the "newSale" event
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

// Register another listener for the "newSale" event
myEmitter.on("newSale", () => {
  console.log("Customer name: XYZ");
});

// Register an event listener that takes an argument (stock)
myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

// Emit (trigger) the "newSale" event with a stock value of 9
myEmitter.emit("newSale", 9);

////////////////// HTTP SERVER //////////////////

// Create an HTTP server instance
const server = http.createServer();

// Register an event listener for incoming HTTP requests
server.on("request", (req, res) => {
  console.log("Request received!"); // Log that a request was received
  console.log(req.url); // Log the request URL
  res.end("Request received"); // Send a response to the client
});

// Register another event listener for the "request" event
server.on("request", (req, res) => {
  console.log("Another request");
});

// Register an event listener for when the server is closed
server.on("close", () => {
  console.log("Server closed");
});

// Start the server and listen on port 8000, on localhost (127.0.0.1)
server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
