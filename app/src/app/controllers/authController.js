const User = require("../models/user");
const Authentication = require("../models/authentication");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "your_jwt_secret_key";

class AuthController {

  //[POST] /login
  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.render("user/login", {
          error: "Sai tên đăng nhập!",
          username,
        });
      }
      if (user.status !== "active") {
        return res.render("user/login", {
          error: "Tài khoản của bạn đã bị vô hiệu hóa!",
          username,
        });
      }
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.render("user/login", {
          error: "Sai tên đăng nhập hoặc mật khẩu!",
          username,
        });
      }
      const now = new Date();
      const sessionId = `session_${Date.now()}`;
      req.session.userId = user._id;
      req.session.sessionId = sessionId;
      user.currentSessionId = sessionId;
      user.lastLogin = now;
      await user.save();
      await req.session.save();

      //await Authentication.deleteMany({ userId: user._id });

      const token = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: "3h",
      });
      const authToken = new Authentication({
        userId: user._id,
        token: token,
        expiresAt: new Date(now.getTime() + 3 * 60 * 60 * 1000),
      });
      await authToken.save();

      if (user.role === "admin") {
        return res.redirect("/admin/dashboard");
      } else {
        return res.redirect("/home");
      }
    } catch (error) {
      console.error("Login server error:", error);
      return res.status(500).send("Internal server error during login");
    }
  }

  //[POST] /logout
  async logout(req, res, next) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        user.currentSessionId = null;
        await user.save();
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send("Logout failed");
        }
        res.redirect("/");
      });
    } catch (err) {
      console.error("Logout error:", err);
      res.status(500).send("Server error");
    }
  }

  // [POST] /register
  async register(req, res) {
    const { username, email, password, displayName, school, grade } = req.body;
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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
    await newUser.save();

    await Authentication.deleteMany({ userId: newUser._id });

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
      expiresIn: "3h",
    });
    const authToken = new Authentication({
      userId: newUser._id,
      token: token,
      expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    });
    await authToken.save();

    req.session.userId = newUser._id;
    req.session.sessionId = `session_${Date.now()}`;
    res.redirect("/home");
  }

  // [GET] /check-auth
  async checkAuth(req, res) {
    try {
      const tokenRecord = await Authentication.findOne({
        userId: req.session.userId,
      });
      if (!req.session.userId || !tokenRecord) {
        return res.status(401).json({ valid: false });
      }
      const now = new Date();
      if (now > tokenRecord.expiresAt) {
        return res.status(401).json({ valid: false });
      }
      return res.json({ valid: true });
    } catch (err) {
      console.error("Check auth error:", err);
      return res.status(500).json({ valid: false, error: "Lỗi server" });
    }
  }

  //[POST] /forgotpassword
  async forgotPassword(req, res) {
    const { username } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    if (!user) {
      return res.render("user/forgotpassword", {
        error: "Không tìm thấy người dùng!",
      });
    }
    if (user.status !== "active") {
      return res.render("user/forgotpassword", {
        error: "Tài khoản đang bị vô hiệu hóa, không thể khôi phục mật khẩu!",
      });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "30m",
    });
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
      const decoded = jwt.verify(token, SECRET_KEY);
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
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.send("Không tìm thấy người dùng.");
      }
      if (!user || user.status !== "active") {
        return res.send("Tài khoản không hợp lệ hoặc đã bị vô hiệu hóa.");
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
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
