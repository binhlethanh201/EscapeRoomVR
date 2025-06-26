const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room2 = new Schema({
        
    
  id: { type: String, required: true },
  name: { type: String, required: true },
  theme: { type: String, required: true },
  description: { type: String, required: true },
  unlockCode: [{ type: String }],
  order: { type: Number },
  completedMessage: { type: String },
  completedInfor: { type: String },
  panoramaFile: { type: String },
  backgroundMusic: { type: String },
  hotspots: {
    painting: {
      id: String,
      name: String,
      type: String,
      clue: String,
      isRequired: Boolean,
      message: String,
      hint: String,
      minigame: {
        type: {
          type: String,
        },
        title: String,
        config: {
          gridSize: String,
          image: String,
          pieces: Number
        }
      }
    },
    poster: {
      id: String,
      name: String,
      type: String,
      clue: String,
      isRequired: Boolean,
      message: String,
      hint: String,
      minigame: {
        type: {
          type: String,
        },
        title: String,
        config: {
          rounds: Number
        }
      }
    },
    board: {
      id: String,
      name: String,
      type: String,
      clue: String,
      isRequired: Boolean,
      message: String,
      hint: String,
      minigame: {
        type: {
          type: String,
        },
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
      id: String,
      name: String,
      type: String,
      isRequired: Boolean,
      interactionData: {
        type: String,
        codeLength: Number,
        hint: String,
        instructions: String
      }
    }
  }

});
module.exports = mongoose.model('Room2', Room2);
