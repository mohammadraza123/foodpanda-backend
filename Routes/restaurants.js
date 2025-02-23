// POST data with image to Mongodb

const express = require("express");
const multer = require("multer");
const router = express.Router();
const connectdb = require("../Expres/db/dbConnection");
const restaurantModal = require("../Expres/Models/restaurantSchema");
const path = require("path"); // Import path module

const app = express();
connectdb();

app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../../public/uploads"))
);

const fileUplaod = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      const uploadPath = path.join(__dirname, "../../public/uploads"); // Go up two levels to reach the main directory
      callback(null, uploadPath);
    },
    filename: function (req, file, callback) {
      const uniqueName = file.fieldname + "-" + Date.now() + ".jpg";
      callback(null, uniqueName);
    },
  }),
}).single("my_file");

router.post("/restaurants", fileUplaod, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No files Uploaded");
    }

    const { title, rating } = req.body;

    if (!title || !rating) {
      return res.status(400).send("Title and rating are required");
    }
    const newRestaurant = new restaurantModal({
      title,
      rating,
      imagePath: `/uploads/${req.file.filename}`,
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
    res.json(restaurants);
  } catch (error) {
    console.log("Error fetching Data", error);
    res.status(500).send("Server Error");
  }
});

// Export routes instead of running a server
module.exports = router;
