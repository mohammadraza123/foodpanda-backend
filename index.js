const express = require("express");
const connectdb = require("./Expres/db/dbConnection");
const restaurantRoutes = require("./Routes/restaurants");

const app = express();
connectdb();

app.use("/uploads", express.static("public/uploads"));

// Routes
app.use(restaurantRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Foodpanda backend");
});

app.listen(2000, () => {
  console.log(`running on 2000`);
});
