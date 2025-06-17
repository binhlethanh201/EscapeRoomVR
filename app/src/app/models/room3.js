const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room3 = new Schema({
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
          items: [
            {
              id: String,
              name: String,
              category: String,
            }
          ],
          categories: [String],
          description: String
        }
      }
    },
    desk: {
      id: String,
      name: String,
      type: String,
      clue: String,
      isRequired: Boolean,
      message: String,
      hint: String,
      interactionData: {
        title: String,
        items: [
          {
            id: String,
            name: String,
            content: String,
            hint: String
          }
        ]
      }
    },
    window: {
      id: String,
      name: String,
      type: String,
      clue: String,
      isRequired: Boolean,
      message: String,
      hint: String,
      minigame: [
        {
          id: String,
          name: String,
          question: String,
          options: [String],
          answer: Schema.Types.Mixed,
          hint: String
        }
      ]
    },
    door: {
      id: String,
      name: String,
      type: String,
      isRequired: Boolean,
      interactionData: {
        type: String,
        requiredKeys: [String],
        hint: String,
        instructions: String
      }
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Room3', Room3);
