const express = require("express");
const router = express.Router();
const joi = require("joi");
const jwt = require("jsonwebtoken");
const Profile = require("../models/user.model");
require("dotenv").config();

router.get("/getUser", async (req, res) => {
  try {
    const profile = await Profile.find();

    if (!profile) {
      return res.status(404).json({ message: "No profiles found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

module.exports = router;
