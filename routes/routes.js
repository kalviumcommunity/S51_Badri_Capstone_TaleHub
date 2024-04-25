const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Profile = require("../models/user.model");
const Email = require("../models/email.model");
const MangaData = require("../models/manga.model");
const mongoose = require("mongoose");
require("dotenv").config();

router.get("/getUser", async (req, res) => {
  try {
    const { email, type } = req.query;
    console.log(req.query);
    if (!email || !type) {
      return res
        .status(400)
        .json({ message: "Insufficient data sent to server" });
    }

    let profile;

    if (type === "email") {
      profile = await Email.findOne({ email });
    } else if (type === "password") {
      profile = await Profile.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid type provided" });
    }

    if (!profile) {
      return res
        .status(404)
        .json({ message: "No user found for the provided email" });
    }

    res.status(200).json({
      mangaCart: profile.mangaCart,
      bookCart: profile.bookCart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
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
    console.log(
      "-----------------------------------------------------------------"
    );
    const itemExists = cartToUpdate.some(
      (item) => item.title === itemToAdd.title
    );

    if (itemExists) {
      return res
        .status(400)
        .json({ message: "Item already exists in the cart", user: user });
    }
    console.log("item to add ::: ", itemToAdd);
    console.log(
      "-----------------------------------------------------------------"
    );

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

router.patch("/deleteInCart", async (req, res) => {
  try {
    const { email, type, whereToDelete, _id } = req.body;
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

    if (whereToDelete === "bookCart") {
      cartToUpdate = user.bookCart;
    } else if (whereToDelete === "mangaCart") {
      cartToUpdate = user.mangaCart;
    } else {
      return res.status(400).json({ message: "Invalid 'whereToDelete' value" });
    }

    // Find the index of the item to delete based on the string representation of _id
    const indexToDelete = cartToUpdate.findIndex(
      (item) => item._id.toString() === _id
    );

    if (indexToDelete === -1) {
      return res
        .status(404)
        .json({ message: "Item not found in the cart", user: user });
    }

    // Remove the item from the cart
    cartToUpdate.splice(indexToDelete, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Item deleted from cart successfully", user: user });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
