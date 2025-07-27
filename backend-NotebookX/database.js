const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connection to MongoDB success");
  } catch (error) {
    console.log(`Failed to connect \nError:${error.message}`);
  }
};

module.exports = connectToMongo;
