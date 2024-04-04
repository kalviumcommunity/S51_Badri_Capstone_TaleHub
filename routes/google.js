const express = require("express");
const router = express.Router();
const EmailProfile = require("../models/email.model");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    let existingUser = await EmailProfile.findOne({ email });
    if (!existingUser) {
      const newUser = new EmailProfile({
        name: name,
        email: email,
        mangaCart: [],
        booksCart: [],
      });

      await newUser.save();
      console.log(newUser);
    }

    res.status(200).json(existingUser);
  } catch (error) {
    console.error("Error signing up or logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
