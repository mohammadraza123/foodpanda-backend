const express = require("express");
const restaurantModal = require("../Models/restaurantSchema");
const connectdb = require("../db/dbConnection");
const multer = require("multer");
const app = express();

connectdb();
const fileUplaod = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "uploads");
    },
    filename: function (req, file, callback) {
      const uniqueName = file.fieldname + "-" + Date.now() + ".jpg";
      callback(null, uniqueName);
    },
  }),
}).single("my_file");

app.post("/file-upload", fileUplaod, (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files Uploaded");
  }
  const newFile = new restaurantModal({
    imagePath: req.file.path,
  });

  newFile
    .save()
    .then(() => res.send("File Uploaded Successfully"))
    .catch((err) => res.send("Error Uploading File", err));
});

app.listen(2000);
