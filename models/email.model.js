const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  authors: [String],
  description: String,
  thumbnail: String
});

const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  picture_url: String,
  myanimelist_url: String,
  aired_on: String,
  rank: String,
  type: String
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bookCart: [bookSchema],
  mangaCart: [mangaSchema]
});

const EmailModel = mongoose.model('emails', userSchema);

module.exports = EmailModel;
