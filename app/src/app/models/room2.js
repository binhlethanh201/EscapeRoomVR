const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room2Schema = new Schema({
  _id: { type: String, required: true }, // Đổi từ 'id' thành '_id' để đồng bộ với MongoDB
  name: { type: String, required: true },
  theme: { type: String, required: true },
  description: { type: String, required: true },
  unlockCode: { type: String, required: true }, 
  order: { type: Number },
  completedMessage: { type: String },
  completedInfor: { type: String },
  panoramaFile: { type: String },
  backgroundMusic: { type: String },
  hotspots: {
    painting: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
      clue: String,
      isRequired: Boolean,
      message: String,
      hint: String,
      minigame: {
        type: { type: String, required: true },
        title: String,
        config: {
          gridSize: String,
          image: String,
          pieces: Number
        }
      }
    },
    poster: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
      clue: String,
      isRequired: Boolean,
      message: String,
      hint: String,
      minigame: {
        type: { type: String, required: true },
        title: String,
        config: {
          rounds: Number
        }
      }
    },
    board: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
      clue: String,
      isRequired: Boolean,
      message: String,
      hint: String,
      minigame: {
        type: { type: String, required: true },
        title: String,
        config: {
          size: String,
          startPoint: [Number],
          endPoint: [Number],
          wallDensity: Number
        }
      }
    },
    door: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
      isRequired: Boolean,
      interactionData: {
        type: { type: String, required: true },
        codeLength: Number,
        hint: String,
        instructions: String
      }
    }
  }
});

module.exports = mongoose.model('Room2', Room2Schema);