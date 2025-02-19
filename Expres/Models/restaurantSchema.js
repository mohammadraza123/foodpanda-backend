const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  imagePath: String,
});

module.exports = new mongoose.model("Restaurants", restaurantSchema);
