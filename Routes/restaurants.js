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
    console.log(result);

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

// GET data from Mongodb

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

router.get("/restaurants/:id", async (req,res)=>{
  try {
    const employee = await restaurantModal.findById(req.params.id)
    if(!employee){
      return res.status(404).json({ error: "Image is required" });
    }
    res.json(employee)
  } catch (error) {
    console.log("Error fetching Data", error);
    res.status(500).send("Server Error");
  }
})

// Export routes instead of running a server
module.exports = router;
