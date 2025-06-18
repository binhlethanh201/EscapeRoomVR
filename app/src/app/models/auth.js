const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  tokenId: String,
  userId: { type: String, required: true },
  token: String,
  expiresAt: Date,
  createdAt: Date
});

module.exports = mongoose.model('Auth', AuthSchema);
