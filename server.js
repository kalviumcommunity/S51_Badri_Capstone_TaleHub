// Importing required modules
const express = require("express");
const app = express();
require("dotenv").config()
const port = process.env.PORT;
const cors = require("cors");
const {startDB, dbStatus} = require("./db")

const myMiddleware = (req, res, next) => {
    // Doing something with the request
    console.log('Middleware executed');
    next();
};

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Adding middleware
app.use(express.json());
app.use(cors());
app.use(myMiddleware); // Adding example middleware globally

// Route definition
app.get("/", (req, res) => {
  res.json({ status: dbStatus ? "connected" : "disconnected" });
});
if (require.main === module) {
  if (!port) {
      console.error('PORT environment variable is not set');
      process.exit(1); 
  }

  app.listen(port, async () => {
      if (!process.env.DATABASE_URL) {
          console.error('DB_URL environment variable is not set');
          process.exit(1);
      }

      await startDB()
      console.log(`🚀 server running on PORT: ${port}`);
      console.log(`http://localhost:${port}/`)
  });
}


module.exports = app;