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
// Expres/APIS/GET.js
const express = require("express");
const restaurantModal = require("../Models/restaurantSchema");
const router = express.Router();

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await restaurantModal.find();
    res.json(restaurants);
  } catch (error) {
    console.log("Error fetching Data", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;