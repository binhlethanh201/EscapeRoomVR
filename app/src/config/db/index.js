const mongoose = require("mongoose");

//connect database thông qua mongodb
async function connect() {
  try {
    //connect thành công
    await mongoose.connect("mongodb://localhost:27017/gameVR");
    console.log("Connect successfully!");
  } catch {
    //connect thất bại
    console.log("Fail to connect to database!");
  }
}
module.exports = { connect };
