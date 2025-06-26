const Authentication = require("../app/models/authentication");

// Middleware kiểm tra người dùng đã đăng nhập và token còn hạn
module.exports = async function (req, res, next) {
  try {
    // Kiểm tra session có userId hay chưa
    if (!req.session.userId) {
      return res.redirect("/");
    }
    // Tìm bản ghi token theo userId
    const tokenRecord = await Authentication.findOne({ userId: req.session.userId });
    // Nếu không tìm thấy token => xóa session và chuyển hướng về login
    if (!tokenRecord) {
      req.session.destroy(() => {
        return res.redirect("/");
      });
      return;
    }
    // Kiểm tra thời gian hết hạn
    const now = new Date();
    if (now > tokenRecord.expiresAt) {
      await Authentication.deleteOne({ userId: req.session.userId });
      req.session.destroy(() => {
        return res.redirect("/");
      });
      return;
    }
    // Nếu hợp lệ => cho phép đi tiếp
    next();
  } catch (err) {
    console.error("Middleware auth error:", err);
    res.redirect("/");
  }
};
