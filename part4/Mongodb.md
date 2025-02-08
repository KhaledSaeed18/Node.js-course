# MongoDB Overview

What is MongoDB, how it works, and how it compares to traditional databases.

## What is MongoDB?

MongoDB is a NoSQL database, also referred to as "No Sequel." Unlike relational databases, MongoDB stores data in flexible, JSON-like documents rather than structured tables. This allows for greater scalability and adaptability.

### Structure of MongoDB

- **Database**: A MongoDB instance can have multiple databases.
- **Collection**: A collection is equivalent to a table in relational databases and contains multiple documents.
- **Document**: The smallest unit of data storage, similar to a row in relational databases. Each document stores information about a single entity (e.g., a user, a blog post, or a review) in key-value pairs.

### Key Features of MongoDB

1. **Document-Based Storage**: Data is stored in JSON-like BSON format, allowing flexibility in data representation.
2. **Scalability**: MongoDB can distribute data across multiple machines to handle large-scale applications efficiently.
3. **Schema Flexibility**: No predefined schema is required; each document can have a different structure and fields.
4. **High Performance**: Features like embedded data models, indexing, and sharding contribute to MongoDB’s performance.
5. **Open Source**: MongoDB is free and open-source under the SSPL license.

### BSON: The Data Format

MongoDB stores data in BSON (Binary JSON), which is similar to JSON but with additional data types such as:

- String
- Boolean
- Date
- Integer
- Double
- Object

### Comparison with Relational Databases

| Feature           | MongoDB (NoSQL)      | Relational Databases (SQL) |
|------------------|---------------------|----------------------------|
| Storage Format  | Documents (BSON/JSON) | Tables (Rows & Columns)    |
| Schema Flexibility | Dynamic Schema       | Fixed Schema               |
| Scalability     | Horizontal (Sharding) | Vertical (Scaling Up)      |
| Joins          | Embedded Documents    | Foreign Keys & Joins       |
| Performance    | High (Flexible Queries) | Slower (Complex Joins)     |

### Embedded Documents & Normalization

MongoDB allows embedding related data within a document. For example:

```json
{
  "title": "MongoDB Basics",
  "author": "John Doe",
  "tags": ["database", "NoSQL"],
  "comments": [
    { "author": "Alice", "text": "Great post!" },
    { "author": "Bob", "text": "Very informative." }
  ]
}
```

In relational databases, the comments would be stored in a separate table and joined via foreign keys.

### Document Limitations

- **Max Document Size**: 16 MB per document.
- **Unique IDs**: Each document has an automatically generated `_id` field, acting as a primary key.

### Summary

MongoDB is an ideal database for modern, scalable web applications. It is widely used with Node.js, making it a great fit for backend development. Next, we will explore practical implementations of MongoDB.

---

### Introduction to Mongoose

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing a higher level of abstraction. It serves a role similar to how Express simplifies working with Node.js—Mongoose simplifies working with MongoDB.

An ODM is essentially a tool that allows us to write JavaScript code to interact with a database. While we could use the native MongoDB driver, Mongoose provides additional functionality out of the box, making development easier and more efficient.

### Features of Mongoose

Some key features of Mongoose include:

- **Schemas**: Define the structure of data, including default values and validation rules.
- **Models**: Wrappers around schemas that provide methods for creating, reading, updating, and deleting documents.
- **Validation**: Ensures data integrity before storing it in the database.
- **Middleware**: Enables pre- and post-processing of database operations.
- **Query API**: Simplifies complex queries.

### Defining a Schema and Model

In Mongoose, a schema defines the structure of a document, and a model is a wrapper around the schema that interacts with the database.

Here’s an example of defining a schema and model in Mongoose:

```javascript
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  comments: [{
    author: String,
    text: String
  }]
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
```

This defines a `blogSchema` with fields like `title`, `content`, `tags`, and an array of embedded `comments`. The `Blog` model allows us to perform database operations on this schema.
