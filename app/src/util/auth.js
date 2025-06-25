const Authentication = require("../app/models/authentication");

//kiểm tra xác thực phiên đăng nhập (session + token JWT)
module.exports = async function (req, res, next) {
  try {
    //check xem session có userId hay không (login chưa?)
    if (!req.session.userId) {
      return res.redirect("/"); //chuyển hướng về trang đăng nhập
    }
    //tìm token JWT trong DB
    const tokenRecord = await Authentication.findOne({
      userId: req.session.userId,
    });
    //hủy session và redirect về login khi không thấy
    if (!tokenRecord) {
      await req.session.destroy(() => {});
      return res.redirect("/");
    }
    //kiểm tra token còn hạn không
    const now = new Date();
    if (now > tokenRecord.expiresAt) {
      //nếu token đã hết hạn thì xóa token trong DB
      await Authentication.deleteOne({ userId: req.session.userId });
      //hủy session hiện tại
      await req.session.destroy(() => {});
      return res.redirect("/");
    }
    next(); // token còn hạn
  } catch (err) {
    console.error("Middleware error", err);
    return res.redirect("/");
  }
};
