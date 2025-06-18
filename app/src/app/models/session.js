const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  sessionId: { type: String, required: true },
  userId: String,
  gameData: Schema.Types.Mixed,
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean
});

module.exports = mongoose.model('Session', SessionSchema);
