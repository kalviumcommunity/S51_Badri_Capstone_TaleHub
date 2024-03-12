// Importing required modules
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

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
app.get("/", myMiddleware, (req, res) => {
  res.send("my capstone project");
});

// Server setup
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;