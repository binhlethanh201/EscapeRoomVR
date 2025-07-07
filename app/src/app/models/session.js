const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  _id: String,
  userId: { type: String, required: true },
  gameData: {
    progress: {
      roomsUnlocked: [String],
      roomsCompleted: [String],
    },
    roomProgress: {
      room1: {
        status: { type: String, default: "available" },
        attempts: { type: Number, default: 0 },
        cluesFound: [String],
        hotspotProgress: {
          type: Schema.Types.Mixed,
          default: {}
        },
        lastVisited: Date,
        isCompleted: { type: Boolean, default: false }
      },
      room2: {
        status: { type: String, default: "available" },
        attempts: { type: Number, default: 0 },
        cluesFound: [String],
        hotspotProgress: {
          type: Schema.Types.Mixed,
          default: {}
        },
        lastVisited: Date,
        isCompleted: { type: Boolean, default: false }
      },
      room3: {
        status: { type: String, default: "available" },
        attempts: { type: Number, default: 0 },
        cluesFound: [String],
        hotspotProgress: {
          type: Schema.Types.Mixed,
          default: {}
        },
        lastVisited: Date,
        isCompleted: { type: Boolean, default: false }
      }
    },
    totalCluesFound: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});
sessionSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Session", sessionSchema);
