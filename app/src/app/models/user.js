const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: String,
  email: String,
  username: String,
  password: String,
  role: String,
  permissions: [String],
  profile: {
    displayName: String,
    avatar: String,
    school: String,
    grade: String,
    createdAt: Date,
  },
  status: String,
  lastLogin: Date,
  currentSessionId: String,
});

module.exports = mongoose.model("User", UserSchema);
