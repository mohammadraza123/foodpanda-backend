// POST data with image to Mongodb

const express = require("express");
const router = express.Router();
const connectdb = require("../Expres/db/dbConnection");
const restaurantModal = require("../Expres/Models/restaurantSchema");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drnt08bj6",
  api_key: "521449492941734",
  api_secret: "HpJK4Ay5fzxYV6ZTZ3i1tWAv4yM",
});

const app = express();
connectdb();

app.use(express.json());

router.post("/restaurants", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: "Image is required" });
    }
    const file = req.files.photo;
    const result = await cloudinary.uploader.upload(file.tempFilePath);

    const { title, rating, city } = req.body;

    if (!title || !rating || !city) {
      return res.status(400).send("Please fill all the fields");
    }

    const newRestaurant = new restaurantModal({
      title,
      rating,
      city,
      imagePath: result.secure_url,
    });

    const restaurant = await newRestaurant.save();
    res.json({ message: "File and Data Uploaded Successfully", restaurant });
  } catch (error) {
    console.log("Error Saving Data");
    res.status(500).send("Server Error");
  }
});

// GET all data from Mongodb

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await restaurantModal.find();

    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(restaurants);
  } catch (error) {
    console.log("Error fetching Data", error);
    res.status(500).send("Server Error");
  }
});

// GET specific data from Mongodb (city endpoint)

router.get("/restaurants/:city", async (req, res) => {
  try {
    const cityName = req.params.city.toLowerCase();
    const restaurant = await restaurantModal.find({ city: cityName });
    if (!restaurant) {
      return res.status(404).json({ error: "No data found about city" });
    }
    res.json(restaurant);
  } catch (error) {
    console.log("Error fetching Data", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
