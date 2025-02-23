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
