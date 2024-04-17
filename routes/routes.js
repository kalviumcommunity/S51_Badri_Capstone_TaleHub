const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Profile = require("../models/user.model");
const Email = require("../models/email.model");
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

router.patch("/addToCart", async (req, res) => {
  try {
    const { email, type, whereToAdd, itemToAdd } = req.body;

    let user;

    if (type === "email") {
      user = await Email.findOne({ email: email });
    } else if (type === "password") {
      user = await Profile.findOne({ email: email });
    } else {
      return res.status(400).json({ message: "Invalid 'type' value" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartToUpdate;

    if (whereToAdd === "bookCart") {
      cartToUpdate = user.bookCart;
    } else if (whereToAdd === "mangaCart") {
      cartToUpdate = user.mangaCart;
    } else {
      return res.status(400).json({ message: "Invalid 'whereToAdd' value" });
    }

    console.log("Items in the cart before adding:", cartToUpdate);

    const itemExists = cartToUpdate.some(
      (item) => item.title === itemToAdd.title
    );

    if (itemExists) {
      return res
        .status(400)
        .json({ message: "Item already exists in the cart", user: user });
    }

    cartToUpdate.push(itemToAdd);
    await user.save();

    console.log("Items in the cart after adding:", cartToUpdate);

    res
      .status(200)
      .json({ message: "Item added to cart successfully", user: user });
  } catch (error) {
    console.error("Error editing cart data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
