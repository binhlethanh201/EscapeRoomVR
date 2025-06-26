const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthenticationSchema = new Schema({
  userId: String,
  token: String,
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Authentication", AuthenticationSchema);
