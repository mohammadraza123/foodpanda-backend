const express = require("express");
const restaurantModal = require("./Models/restaurantSchema");
const connectdb = require("./db/dbConnection");

const app = express();

connectdb();
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server is running successfully on Vercel!");
});

app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await restaurantModal.find();
    res.json(restaurants);
  } catch (error) {
    console.log("Error fetching Data", error);
    res.status(500).send("Server Error");
  }
});

// ✅ Export app for Vercel (Do NOT use app.listen)
module.exports = app;
