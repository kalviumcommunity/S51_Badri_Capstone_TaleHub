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
// Server setup
if (require.main === module) {
  app.listen(port, async () => {
    await startDB()
    console.log(`🚀 server running on PORT: ${port}`);
    console.log(`http://localhost:${port}/`)
  });
}

module.exports = app;