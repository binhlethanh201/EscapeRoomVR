const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room1Schema = new Schema({
  _id: String,
  name: String,
  theme: String,
  description: String,
  unlockCode: String,
  order: Number,
  completedMessage: String,
  completedInfor: String,
  panoramaFile: String,
  backgroundMusic: String,
  hotspots: Schema.Types.Mixed,
});

module.exports = mongoose.model("Room1", Room1Schema);
