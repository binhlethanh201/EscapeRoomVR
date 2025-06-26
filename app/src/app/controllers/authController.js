const User = require("../models/user");
const Authentication = require("../models/authentication");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "your_jwt_secret_key";

class AuthController {
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
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.render("user/login", {
          error: "Sai tên đăng nhập hoặc mật khẩu!",
          username: username,
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
        username: user.username, //lấy username cho trang home
        id: user._id, //lấy id cho trang home
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

  // [POST] /register
  async register(req, res) {
    const { username, email, password, displayName, school, grade } = req.body;
    // Regex kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.render("user/register", {
        username,
        email,
        password,
        displayName,
        school,
        grade,
        error: "Email không hợp lệ!",
      });
    }
    //kiểm tra username đã tồn tại chưa
    const [usernameExists, emailExists] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);
    if (usernameExists || emailExists) {
      let errorMessage = "";
      if (usernameExists && emailExists) {
        errorMessage = "Tên đăng nhập và Email đã được sử dụng!";
      } else if (usernameExists) {
        errorMessage = "Tên đăng nhập đã tồn tại!";
      } else {
        errorMessage = "Email đã được sử dụng!";
      }

      return res.render("user/register", {
        username,
        email,
        password,
        displayName,
        school,
        grade,
        error: errorMessage,
      });
    }
    //mã hóa mật khẩu trước khi lưu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //tạo đối tượng User mới với dữ liệu đã chuẩn bị
    const now = new Date();
    const newUser = new User({
      _id: username,
      username,
      email,
      password: hashedPassword,
      role: "player",
      permissions: ["read_game", "play_game", "view_leaderboard"],
      profile: {
        displayName,
        avatar: "default_avatar_url",
        school,
        grade,
        createdAt: now,
      },
      status: "active",
      lastLogin: null,
      currentSessionId: null,
    });
    //lưu user mới vào DB
    await newUser.save();
    // Tạo JWT
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
      expiresIn: "3h",
    });
    // Lưu vào Authentication
    const authToken = new Authentication({
      userId: newUser._id,
      token: token,
      expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000), //token mới trong 3 giờ
    });
    await authToken.save();
    // Tự động login (lưu session)
    req.session.userId = newUser._id;
    req.session.sessionId = `session_${Date.now()}`;
    res.redirect("/home"); //redirect về trang home sau khi đăng ký thành công
  }

  // [GET] /check-auth
  async checkAuth(req, res) {
    try {
      const tokenRecord = await Authentication.findOne({
        userId: req.session.userId,
      });
      //nếu không có session hoặc không tìm thấy token thì invalid
      if (!req.session.userId || !tokenRecord) {
        return res.status(401).json({ valid: false });
      }
      const now = new Date();
      //nếu token đã hết hạn thì invalid
      if (now > tokenRecord.expiresAt) {
        return res.status(401).json({ valid: false });
      }
      //token còn hạn thì valid
      return res.json({ valid: true });
    } catch (err) {
      console.error("Check auth error:", err);
      return res.status(500).json({ valid: false, error: "Lỗi server" });
    }
  }

  //forgot password
  //[POST] /forgotpassword
  async forgotPassword(req, res) {
    //tìm user theo username hoặc email
    const { username } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    //render lại với lỗi khi không tìm thấy user
    if (!user) {
      return res.render("user/forgotpassword", {
        error: "Không tìm thấy người dùng!",
      });
    }
    //tạo JWT chứa userId và hạn dùng 30 phút
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "30m",
    });
    //tạo link reset mật khẩu kèm token
    const resetLink = `http://localhost:3000/resetpassword/${token}`;
    res.render("user/forgotpassword", {
      message: `Link khôi phục: <a href="${resetLink}" target="_blank">${resetLink}</a> (hết hạn sau 30 phút)`,
    });
  }

  //resetpassword
  //[GET] /resetpassword
  async resetPasswordForm(req, res) {
    const { token } = req.params;
    try {
      //xác thực token JWT
      const decoded = jwt.verify(token, SECRET_KEY);
      //nếu hợp lệ, render trang reset password, truyền token để POST dùng lại
      res.render("user/resetpassword", { token });
    } catch (err) {
      return res.send("Token không hợp lệ hoặc đã hết hạn.");
    }
  }
  //[POST] /resetpassword
  async resetPassword(req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
      //từ token lấy userId
      const decoded = jwt.verify(token, SECRET_KEY);
      //tìm user theo id trong token
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.send("Không tìm thấy người dùng.");
      }
      //mã hóa mật khẩu mới và lưu lại
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
      // Gửi trang có popup alert rồi redirect
      res.send(`
      <script>
        alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
        window.location.href = "/";
      </script>
    `);
    } catch (err) {
      return res.send("Token không hợp lệ hoặc đã hết hạn.");
    }
  }
}
module.exports = new AuthController();
