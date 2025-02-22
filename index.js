const express = require("express");
const cors = require("cors");
const connectdb = require("./Expres/db/dbConnection"); // Keeping your correct path
const restaurantRoutes = require("./Expres/APIS/GET"); // Keeping your correct path

const app = express();

// Connect to MongoDB
connectdb();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Use Routes
app.use("/api", restaurantRoutes);

// Default Route (Fixes "Cannot GET /" error)
app.get("/", (req, res) => {
  res.send("Welcome to the FoodPanda Backend API!");
});

// Export app for Vercel (No app.listen)
module.exports = app;
