const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room1Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  theme: { type: String, required: true },
  description: { type: String, required: true },
  unlockCode: { type: String, required: true }, // Room1 dùng chuỗi thay vì mảng
  order: { type: Number },
  completedMessage: { type: String },
  completedInfor: { type: String },
  panoramaFile: { type: String },
  backgroundMusic: { type: String },
  hotspots: {
    center: {
      id: String,
      name: String,
      type: String,
      clue: String,
      isRequired: Boolean,
      message: String,
      hint: String,
      hotspots: {
        title: String,
        items: [
          {
            id: String,
            image: String,
            content: String,
            highlight: String,
            tabs: [
              {
                name: String,
                content: String,
                highlight: String,
                url: String
              }
            ]
          }
        ]
      }
    },
    left: {
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
            highlight: String
          }
        ]
      }
    },
    right: {
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
            highlight: String,
            url: String
          }
        ]
      }
    },
    back: {
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
            url: String,
            highlight: String
          }
        ]
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
}, {
  timestamps: true
});

module.exports = mongoose.model('Room1', Room1Schema);
