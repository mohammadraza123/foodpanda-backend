const express = require("express");
const app = express();

app.use(express.json()); // Middleware for parsing JSON

app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

module.exports = app; // Export the app for serverless function
