// Importing required modules
const express = require("express");
const app = express();
require("dotenv").config()
const port = process.env.PORT;
const cors = require("cors");
const {startDB, dbStatus} = require("./db")
const routes = require("./routes/routes")
const login = require("./routes/login")

app.use(express.json());
app.use(cors());
app.use("/", routes)
app.use("/", login)

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