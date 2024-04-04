const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Profile = require("../models/user.model");
require("dotenv").config();

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Profile.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    res.json({ JWTtoken: token, user: user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Profile.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const newUser = new Profile({
      name,
      email,
      password,
      mangaCart: [],
      booksCart: [],
    });

    await newUser.save();
    console.log(newUser);

    const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET);
    res.json({ JWTtoken: token, user: newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
