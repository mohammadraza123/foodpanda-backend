const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  imagePath: String,
  city: String
});

module.exports = new mongoose.model("Restaurants", restaurantSchema);
