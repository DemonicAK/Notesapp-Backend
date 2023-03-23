const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoURI = process.env.MONGODB_URI
  

const connectToMongo = async () => {
  const result = await mongoose.connect(mongoURI);
  const fun = () => {
    console.log("Mongo DB connected");
  };
  fun();
};

module.exports = connectToMongo;
