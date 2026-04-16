const mongoose = require("mongoose");

const schema = mongoose.Schema({
  year: { type: Number, required: true },
  code: { type: String, required: true },
  hasRoot: { type: Boolean, default: false },
  rootNumber: { type: Number, required: false },

});

module.exports = mongoose.model("Class", schema);