const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://mohammadrazaarain10:1j65pGBvjKSNUK5Q@cluster0.mespu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log("Mongodb connected error", error);
  }
};

module.exports = connectDB;
