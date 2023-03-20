const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true, 
    // unique: true,
  },
  tag: {
    type: String,
    // required: true,
    Default: "General",

  },
  date: {
    type: Date,
    Default: Date.now,
  },
});

module.exports = mongoose.model("note", NotesSchema);
