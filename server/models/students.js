const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  grade: { type: Number, required: true },
});

module.exports = mongoose.model("Student", schema);