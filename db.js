const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Arijitkar:arijitkar12345@data-initial.ahydtao.mongodb.net/test";

const connectToMongo = async () => {
  const result = await mongoose.connect(mongoURI);
  const fun = () => {
    console.log("Mongo DB connected");
  };
  fun();
};

module.exports = connectToMongo;
