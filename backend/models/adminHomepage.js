const mongoose = require("mongoose");

const homepageDataSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  imgurl: {
    type: String,
  },
});

const HomeData = mongoose.model("HomeData", homepageDataSchema);

module.exports = HomeData;
