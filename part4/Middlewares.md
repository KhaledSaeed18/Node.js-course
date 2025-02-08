# Middlewares in Express.js

## What is Middleware?

Middleware in Express.js is a function that executes between receiving a request and sending a response. It can modify the request or response object, execute custom logic, or terminate the request-response cycle.

## The Request-Response Cycle

Express follows a request-response cycle where a request is received, processed through a series of middleware functions, and then a response is sent back. Middleware plays a crucial role in processing data at different stages of this cycle.

## Types of Middleware

1. **Built-in Middleware**: Middleware functions provided by Express, such as:
   - `express.json()`: Parses incoming JSON payloads.
   - `express.urlencoded()`: Parses URL-encoded payloads.

2. **Third-Party Middleware**: External middleware packages like:
   - `cors`: Enables Cross-Origin Resource Sharing.
   - `helmet`: Enhances security by setting various HTTP headers.

3. **Custom Middleware**: User-defined functions that can perform logging, authentication, request validation, etc.

## Middleware Stack and Execution Order

All middleware functions in an Express app form a middleware stack. The order in which middleware functions are defined in the code determines their execution sequence. A middleware function can:

- Process the request/response.
- Call `next()` to pass control to the next middleware.
- End the request-response cycle by sending a response.

## Example of a Custom Middleware

```ts
import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

export default loggerMiddleware;
```

## Final Middleware Function

The last middleware function in the stack is typically a route handler that sends a response to the client, marking the end of the request-response cycle.

Middleware functions provide flexibility, modularity, and better control over request processing in Express applications.
