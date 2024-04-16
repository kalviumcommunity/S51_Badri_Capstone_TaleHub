const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Profile = require("../models/user.model");
require("dotenv").config();

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Profile.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid E-Mail " });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ JWTtoken: token, user: user, type: "password"});
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
      return res.status(409).json({ message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Profile({
      name,
      email,
      password: hashedPassword,
      mangaCart: [],
      booksCart: [],
    });

    await newUser.save();
    console.log(newUser);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ JWTtoken: token, user: newUser, type: "password"});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
