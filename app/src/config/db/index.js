const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/gameVR");
    console.log("Connect successfully!");
  } catch {
    console.log("Fail to connect to database!");
  }
}
module.exports = { connect };
