const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room3Schema = new Schema({
  _id: String,
  name: String,
  theme: String,
  description: String,
  unlockCode: [String],
  order: Number,
  completedMessage: String,
  completedInfor: String,
  panoramaFile: String,
  backgroundMusic: String,
  hotspot: Schema.Types.Mixed,
});

module.exports = mongoose.model("Room3", Room3Schema);
