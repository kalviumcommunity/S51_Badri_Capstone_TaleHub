const mongoose = require("mongoose");
require("dotenv").config();
const startDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};


const dbStatus = () => (mongoose.connection.readyState === 1 ? true : false);

module.exports = {
  startDB,
  dbStatus,
};
