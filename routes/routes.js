const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Profile = require("../models/user.model");
const Email = require("../models/email.model");
const MangaData = require("../models/manga.model");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");
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

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateSummary(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  return text;
}

router.post("/generateStory", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const summary = await generateSummary(prompt);
    res.json({ summary });
  } catch (error) {
    console.error("Error generating story:", error);
    if (error.response && error.response.candidates) {
      const candidates = error.response.candidates;
      if (candidates && candidates.length > 0) {
        const safetyRatings = candidates[0].safetyRatings;
        const highProbabilityCategories = safetyRatings.filter(
          (rating) =>
            rating.probability === "HIGH" || rating.probability === "MEDIUM"
        );
        if (highProbabilityCategories.length > 0) {
          const category = highProbabilityCategories[0].category;
          res.status(200).json({
            summary: `The story was not generated because your story description was in this category : ${category}.`,
          });
          return;
        }
      }
    }
    res.status(500).json({ error: error });
  }
});

async function generateBooks(userSentence) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  I have a user who provided a one-sentence description of a book: "${userSentence}".

  Based on this description, can you recommend 5-10 books with similar themes, plots, or genres that are also available through the Google Books API?

  For each recommendation, please provide the following information in the format specified below, using unique delimiters to separate each book and each property:

  BOOK START
  Title: [Book Title]
  Author: [Author Name]
  BOOK END

  Ensure each book's details are enclosed within "BOOK START" and "BOOK END" markers.
  `;

  const result = await model.generateContent(prompt);
  const response = result.response.candidates[0].content.parts[0].text;
  console.log(result);

  // Split the response into individual book descriptions
  const bookDescriptions = response.split("BOOK START").slice(1); // split by "BOOK START" and ignore the first empty entry
  const books = bookDescriptions.map((book) => {
    const lines = book.split("BOOK END")[0].trim(); // split by "BOOK END" and take the first part
    const bookObject = {};

    lines.split("\n").forEach((line) => {
      const [key, ...value] = line.split(": ");
      if (key && value) {
        const formattedKey = key.trim().toLowerCase().replace(/ /g, "");
        bookObject[formattedKey] = value.join(": ").trim();
      }
    });

    return bookObject;
  });

  console.log(books);
  return { response, books };
}

router.post("/recommendBooks", async (req, res) => {
  try {
    const { story } = req.body;
    const books = await generateBooks(story);
    res.json({ books });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
