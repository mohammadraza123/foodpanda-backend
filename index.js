// index.js
const express = require("express");
const app = express();
const connectdb = require("./Expres/db/dbConnection");
const restaurantRoutes = require("./Expres/APIS/GET");

connectdb();

app.use("/uploads", express.static("uploads"));
app.use("/api", restaurantRoutes);

module.exports = app;