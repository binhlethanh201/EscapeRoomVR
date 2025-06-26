const mongoose = require("mongoose");
const User = require("../app/models/user");
const bcrypt = require("bcryptjs");
//connect DB
mongoose.connect("mongodb://localhost:27017/gameVR");

(async () => {
    //lấy toàn bộ user trong database
  const users = await User.find({});
  for (const user of users) {
    //kiểm tra xem mật khẩu đã được hash chưa bằng cách so sánh với chuỗi "test"
    const isHashed = await bcrypt
      .compare("test", user.password)
      .catch(() => false);
    //nếu password chưa được hash
    if (!isHashed) {
      //tạo salt để mã hoá password
      const salt = await bcrypt.genSalt(10);
      //hash lại mật khẩu cũ
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      console.log(`Đã hash mật khẩu cho: ${user.username}`);
    }
  }
  //disconnect DB
  mongoose.disconnect();
})();
