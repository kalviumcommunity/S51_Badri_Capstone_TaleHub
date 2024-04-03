const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Profile = require("../models/user.model");
require("dotenv").config();

// Local Strategy for email login
passport.use(
  "local-login",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await Profile.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);




// Route for email login
router.post(
  "/login",
  passport.authenticate("local-login", { session: false }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);
    console.log(req.user);
    res.json({ token });
  }
);

// Route for email sign-up
router.post("/signup", async (req, res) => {
    try {
      const existingUser = await Profile.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered." });
      }
  
      const newUser = new Profile({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mangaCart: [],
        booksCart: [],
      });
  
      await newUser.save();
      console.log(newUser);
      
      // Optionally, you can generate and send a JWT token here
      const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  



module.exports = router;