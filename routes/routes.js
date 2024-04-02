const express = require("express");
const router = express.Router();
const joi = require("joi");
const jwt = require("jsonwebtoken");
const Profile = require("../models/user.model");
const MangaData = require("../models/manga.model");
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


router.get("/getData/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const data = await MangaData.findOne({ title: title });

    if (!data) {
      return res.status(404).json({
        message: "Data not found for the provided title",
        title: title,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching manga data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;