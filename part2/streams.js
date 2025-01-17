// Import the built-in 'fs' (File System) module to work with files
const fs = require("fs");
// Create an HTTP server using the 'http' module
const server = require("http").createServer();

// Listen for incoming HTTP requests
server.on("request", (req, res) => {

  /*** SOLUTION 1: Reading the entire file into memory ***/
  /*
   * In this solution, fs.readFile() reads the entire file into memory
   * before sending it to the client.
   * 
   * PROS:
   * - Simple to implement.
   * 
   * CONS:
   * - Inefficient for large files, as the entire file is loaded into memory.
   * - Can lead to high memory usage and slow performance.
   */

  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.end(data); // Send file content as the response
  // });

  /*** SOLUTION 2: Streaming the file manually ***/
  /*
   * In this solution, fs.createReadStream() reads the file in chunks
   * and sends it to the client as data becomes available.
   * 
   * PROS:
   * - More memory-efficient because it doesn't load the entire file at once.
   * - Faster response time since data is sent in chunks.
   * 
   * CONS:
   * - Backpressure issue: If the readable stream is faster than the 
   *   writable stream (res), data can be lost or buffered inefficiently.
   */

  // const readable = fs.createReadStream("test-file.txt");

  // Send each chunk of data to the response stream
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });

  // When all chunks are sent, end the response
  // readable.on("end", () => {
  //   res.end();
  // });

  // Handle any error while reading the file
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500; // Set HTTP status code to Internal Server Error
  //   res.end("File not found!");
  // });

  /*** SOLUTION 3: Using pipe() for automatic stream management ***/
  /*
   * This solution uses the pipe() method to directly send the readable
   * stream to the response (writable stream).
   * 
   * PROS:
   * - Handles backpressure automatically, preventing data loss or overload.
   * - Most efficient and recommended approach for large files.
   * 
   * CONS:
   * - None in most cases. The best way to stream files in Node.js.
   */

  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res); // Automatically manages reading and writing streams

  // General syntax: readableSource.pipe(writeableDestination)
});

// Start the server and listen for requests on port 8000
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
