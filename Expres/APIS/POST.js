const express = require("express");
const multer = require("multer");
const connectdb = require("../db/dbConnection");
const restaurantModal = require("../Models/restaurantSchema");
const path = require("path"); // Import path module


const app = express();
connectdb();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const fileUplaod = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "uploads");
    },
    filename: function (req, file, callback) {
      const uniqueName = file.fieldname + "-" + Date.now() + ".jpg";
      callback(null, uniqueName);
    },
  }),
}).single("my_file");

app.post("/restaurants", fileUplaod, async (req, res) => {
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

app.listen(2000, () => {
  console.log("server is running on port 2000");
});
