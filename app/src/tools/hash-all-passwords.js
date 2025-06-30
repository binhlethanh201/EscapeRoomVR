const mongoose = require("mongoose");
const User = require("../app/models/user");
const bcrypt = require("bcryptjs");
mongoose.connect("mongodb://localhost:27017/gameVR");

(async () => {
  const users = await User.find({});
  for (const user of users) {
    const isHashed = await bcrypt
      .compare("test", user.password)
      .catch(() => false);
    if (!isHashed) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      console.log(`Đã hash mật khẩu cho: ${user.username}`);
    }
  }
  mongoose.disconnect();
})();
