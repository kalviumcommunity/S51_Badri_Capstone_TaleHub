const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const EmailProfile = require("../models/email.model");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    let existingUser = await EmailProfile.findOne({ email });
    let token;

    if (!existingUser) {
      const newUser = new EmailProfile({
        name: name,
        email: email,
        mangaCart: [],
        booksCart: [],
      });

      await newUser.save();
      console.log(newUser);

      token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

      res.status(201).json({ token, user: newUser, type: "email" });
    } else {
      token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

      res.status(200).json({ token, user: existingUser, type: "email" });
    }
  } catch (error) {
    console.error("Error signing up or logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
