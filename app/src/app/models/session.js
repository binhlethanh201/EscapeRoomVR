const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  _id: String,
  userId: { type: String, required: true },

  gameData: {
    meta: {
      sessionId: String,
      playerId: String,
      version: { type: String, default: "1.0.0" },
      lastLogin: Date,
      currentLocation: { type: String, default: "lobby" }
    },

    progress: {
      overallProgress: { type: Number, default: 0 },
      roomsUnlocked: [String],
      roomsCompleted: [String],
      lastCompletedRoom: String
    },

    roomProgress: {
      room1: {
        status: { type: String, default: "available" },
        attempts: { type: Number, default: 0 },
        cluesFound: [String],
        hotspotProgress: { type: Map, of: Schema.Types.Mixed, default: {} },
        lastVisited: Date,
        isCompleted: { type: Boolean, default: false }
      },
      room2: {
        status: { type: String, default: "available" },
        attempts: { type: Number, default: 0 },
        cluesFound: [String],
        hotspotProgress: { type: Map, of: Schema.Types.Mixed, default: {} },
        lastVisited: Date,
        isCompleted: { type: Boolean, default: false }
      },
      room3: {
        status: { type: String, default: "available" },
        attempts: { type: Number, default: 0 },
        cluesFound: [String],
        hotspotProgress: { type: Map, of: Schema.Types.Mixed, default: {} },
        lastVisited: Date,
        isCompleted: { type: Boolean, default: false }
      }
    },

    stats: {
      totalCluesFound: { type: Number, default: 0 },
      totalMinigamesCompleted: { type: Number, default: 0 },
      totalHintsUsed: { type: Number, default: 0 },
      averageRoomTime: { type: Number, default: 0 },
      loginCount: { type: Number, default: 0 }
    },

    preferences: {
      type: Schema.Types.Mixed,
      default: {}
    }
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
