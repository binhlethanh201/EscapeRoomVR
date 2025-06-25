const User = require("../models/user");
const Authentication = require("../models/authentication");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_jwt_secret_key";

class UserController {
  //[POST] /login
  async login(req, res, next) {
    //lấy username, password từ form gửi lên
    const { username, password } = req.body;
    try {
      //tìm user theo username trong DB
      const user = await User.findOne({ username });
      if (!user) {
        //nếu không tìm thấy user, render lại trang login và báo lỗi
        return res.render("user/login", {
          error: "Sai tên đăng nhập!",
          username: username, //giữ lại username ở form đăng nhập
        });
      }
      //nếu password không khớp, render lại trang login và báo lỗi
      if (password !== user.password) {
        return res.render("user/login", {
          error: "Sai mật khẩu!",
          username: username, //giữ lại username ở form đăng nhập
        });
      }
      //tạo session mới với sessionId dựa trên timestamp
      const now = new Date();
      const sessionId = `session_${Date.now()}`; // tạo sessionId mới
      //lưu thông tin session vào req.session để theo dõi người dùng đang đăng nhập
      req.session.userId = user._id;
      req.session.sessionId = sessionId;
      //cập nhật session hiện tại và thời gian đăng nhập lần cuối cho user trong DB
      user.currentSessionId = sessionId;
      user.lastLogin = now;
      await user.save();
      //tạo JWT token chứa _id của user có thời hạn 3 giờ
      const token = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: "3h",
      });
      //tạo một bản ghi Authentication lưu token và thời gian hết hạn trong DB
      const authToken = new Authentication({
        userId: user._id,
        token: token,
        expiresAt: new Date(now.getTime() + 3 * 60 * 60 * 1000),
      });
      //lưu Authentication token vào DB
      await authToken.save();
      //render /home khi đăng nhập thành công
      return res.render("home", {
        expiresInMs: 3 * 60 * 60 * 1000, // 3 tiếng
         username: user.username,  
      });
    } catch (error) {
      console.error(" Server error:", error);
      res.status(500).send("Server error");
    }
  }
  //[POST] /logout
  async logout(req, res, next) {
    try {
      //tìm user và xóa currentSessionId
      const user = await User.findById(req.session.userId);
      if (user) {
        user.currentSessionId = null; //xóa currentSessionId khi đăng xuất
        await user.save();
      }
      //hủy session
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send("Logout failed");
        }
        res.redirect("/"); //quay lại login
      });
    } catch (err) {
      console.error("Logout error:", err);
      res.status(500).send("Server error");
    }
  }
}

module.exports = new UserController();
