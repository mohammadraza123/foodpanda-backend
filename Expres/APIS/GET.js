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
const router = express.Router();
const restaurantModal = require("../Models/restaurantSchema");

// GET request to fetch restaurant data
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
