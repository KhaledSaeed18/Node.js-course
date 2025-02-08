# Environment Variables in Node.js and Express

## Overview

Environment variables are global variables that define the environment in which a Node.js application runs. They help configure settings such as databases, logging, debugging, and sensitive data storage. Express applications commonly use environment variables to distinguish between development and production environments.

## Key Concepts

- **Development vs. Production**: Applications can run in different environments, affecting configurations like database connections and logging.
- **Default Environment**: Express sets the default environment to `development`.
- **Accessing Environment Variables**: Use `process.env` to access environment variables.
- **Setting Environment Variables**: They can be set manually in the terminal or stored in a `.env` file.

## Viewing Environment Variables

```javascript
console.log(process.env);
console.log(app.get('env')); // Retrieves Express environment
```

## Setting Environment Variables via Terminal

```sh
NODE_ENV=development nodemon server.js
```

This will set `NODE_ENV` to `development` for the running process.

## Using a `.env` File

Instead of manually setting variables in the terminal, a `.env` file can store them:

```env
PASSWORD=123456
PORT=8000
```

### Installing `dotenv` Package

To load `.env` variables into the application:

```sh
npm install dotenv
```

### Configuring `dotenv` in `server.js`

```javascript
require('dotenv').config();
console.log(process.env.PORT); // Outputs: 8000
```

## Using Environment Variables in Express

- Morgan Middleware should only run in `development` mode:

```javascript
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
```

- Setting the port dynamically:

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## Ensuring Proper Load Order

Make sure `dotenv.config()` is called before requiring other files to ensure environment variables are available globally.

## Running in Different Environments

Modify `package.json` to create different scripts:

```json
"scripts": {
  "start": "nodemon server.js",
  "start:prod": "NODE_ENV=production node server.js"
}
```

## Conclusion

Environment variables help separate configuration from code, making applications more secure and adaptable to different environments. Using `.env` files and `dotenv` ensures a scalable and maintainable approach to managing configurations.
