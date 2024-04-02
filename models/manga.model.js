const mongoose = require("mongoose");

const manga = new mongoose.Schema({
  title: { type: String, required: true },
  picture_url: String,
  myanimelist_url: String,
  myanimelist_id: String,
  rank: String,
  score: Number,
  type: String,
  aired_on: String,
  members: Number,
});

const datas = new mongoose.Schema({
  data: [manga],
  title: String,
});

const MangaData = mongoose.model("manga", datas);

module.exports = MangaData;
