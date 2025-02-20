// const express = require("express");
// const restaurantModal = require("../Models/restaurantSchema");
// const connectdb = require("../db/dbConnection");

// const app = express();

// connectdb();
// app.use("/uploads", express.static("uploads"));

// app.get("/restaurants", async (req, res) => {
//   try {
//     const restaurants = await restaurantModal.find();
//     res.json(restaurants);
//   } catch (error) {
//     console.log("Error fetching Data", error);
//     res.status(500).send("Server Error");
//   }
// });
// app.listen(2000, () => {
//   console.log("server is running on porrt 2000");
// });
const express = require("express");
const restaurantModal = require("../Models/restaurantSchema");
const connectdb = require("../db/dbConnection");

const app = express();

connectdb();
app.use("/uploads", express.static("uploads"));

app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await restaurantModal.find();
    res.json(restaurants);
  } catch (error) {
    console.log("Error fetching Data", error);
    res.status(500).send("Server Error");
  }
});

// ❌ Remove app.listen() ❌
// app.listen(2000, () => {
//   console.log("server is running on port 2000");
// });

// ✅ Export app for Vercel
module.exports = app;
