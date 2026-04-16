const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  weeklyHours: { type: String, required: true },
});

module.exports = mongoose.model("Teacher", schema);