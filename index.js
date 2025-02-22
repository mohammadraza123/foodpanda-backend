// console.log('This is index.js file')
const express = require("express");
const cors = require("cors");
const connectdb = require("./db/dbConnection");
const restaurantRoutes = require("./Expres/APIS/GET");

const app = express();

// Connect to MongoDB
connectdb();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Use Routes
app.use("/api", restaurantRoutes);

// Export for Vercel (DO NOT use app.listen here)
module.exports = app;
