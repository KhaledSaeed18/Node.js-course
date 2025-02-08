# 🔗 API Overview and REST Architecture

## What is an API?

API stands for Application Programming Interface. It is a piece of software that enables communication between different applications or software components. APIs are not exclusive to web development and can exist in various forms, such as:

- Web APIs, which facilitate data exchange between a server and a client.
- System APIs, such as Node.js core modules (e.g., File System API, HTTP API).
- Object-oriented APIs, such as public methods in a Java class.

## Web APIs and REST Architecture

A Web API allows clients (such as web applications or mobile apps) to request and receive data from a server. One of the most widely used architectures for building web APIs is REST (Representational State Transfer).

### Principles of RESTful APIs

To design an API that follows REST principles, developers must:

1. **Use Logical Resources**: Data should be structured as resources (e.g., users, tours, reviews).
2. **Use Resource-Based URLs**: URLs should represent resources, not actions.
3. **Use HTTP Methods Correctly**:
   - `GET`: Retrieve data from the server.
   - `POST`: Create a new resource.
   - `PUT` or `PATCH`: Update an existing resource.
   - `DELETE`: Remove a resource.
4. **Use JSON Format**: The API should send and receive data in JSON format.
5. **Be Stateless**: Each request from a client should contain all the necessary information and should not rely on previous requests.

### RESTful API Endpoints Example

A well-structured REST API follows a standard convention for URLs:

- **Retrieve all tours:** `GET /tours`
- **Retrieve a specific tour:** `GET /tours/:id`
- **Create a new tour:** `POST /tours`
- **Update a tour:** `PATCH /tours/:id`
- **Delete a tour:** `DELETE /tours/:id`

### Handling Non-CRUD Operations

Some operations, like login or search, do not directly fit into the standard CRUD model. In such cases:

- **Login endpoint:** `POST /login`
- **Search endpoint:** `GET /search?query=keyword`
- **Nested resources:** If users have booked tours, an endpoint could be `GET /users/:id/tours` to retrieve a user's booked tours.

### JSON Data Format

JSON (JavaScript Object Notation) is the standard format for API responses. Example JSON response for `GET /tours/5`:

```json
{
  "id": 5,
  "name": "Grand Canyon Tour",
  "duration": 5,
  "price": 299.99,
  "available": true
}
```

### Summary

RESTful APIs provide a structured way for clients and servers to communicate. By following REST principles, developers ensure that APIs are scalable, maintainable, and easy to use. This course will focus on building RESTful APIs using Node.js and Express.js.
