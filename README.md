# Getting Started with the Project

This project is built using **Node.js** for backend logic, **Express.js** for routing, and **MongoDB** for the database.

## Available Commands

In the project directory, you can run:

### `npm install`

Installs all project dependencies listed in `package.json`.  
You must run this command before starting the server.

### `npm start`

Starts the server in production mode.  
Server runs on [http://localhost:3000](http://localhost:3000) by default.  
You can configure the port in `.env` or `index.js`.

### `npm run dev`

Starts the server in development mode using **nodemon**.  
Automatically reloads when file changes are detected.

> Make sure `nodemon` is installed globally or as a dev dependency.

### `node filename.js`

Runs a specific JavaScript file using Node.js.  
Useful for utility scripts, data imports, or standalone logic.

### `npm test`

Runs the test suite if testing is set up (e.g., using Jest, Mocha).  
You can define tests in a `test/` directory.

## MongoDB Setup

Make sure you have MongoDB running locally:

```bash
mongod
```

You can also connect to a remote MongoDB Atlas instance.  
[MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)

## Learn More

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [Mongoose Docs](https://mongoosejs.com/docs/guide.html)
- [dotenv Docs](https://www.npmjs.com/package/dotenv)

## Deployment

You can deploy this backend application using:

- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Heroku (deprecated for free tier)](https://devcenter.heroku.com/)
- [VPS (e.g., DigitalOcean)](https://www.digitalocean.com/)

## Troubleshooting

- Ensure MongoDB is running locally or the remote URI is correct.
- Check `.env` variables are loaded correctly using `dotenv`.
- Use `console.log()` and `try/catch` for debugging.
- View logs in the terminal and check HTTP status codes for errors.
