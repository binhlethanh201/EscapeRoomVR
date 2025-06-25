const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/userController");
const authUtil = require("../util/auth");
const Authentication = require('../app/models/authentication');

//[POST] /login
router.get("/", (req, res) => {res.render("login");});
router.post('/login',UserController.login);

//[POST] /logout
router.post('/logout', UserController.logout);

//[GET] /check-auth
router.get("/check-auth", async (req, res) => {
   //tìm token trong DB
  const tokenRecord = await Authentication.findOne({ userId: req.session.userId });
  //lỗi khi không thấy token
  if (!req.session.userId || !tokenRecord) {
    return res.status(401).json({ valid: false });
  }
  //check thời gian thực và thời gian hết hạn của token
  const now = new Date();
  if (now > tokenRecord.expiresAt) {
    //token hết hạn và trả về lỗi
    return res.status(401).json({ valid: false });
  }
    //token còn hạn : true
  return res.json({ valid: true });
});

//[GET] /home : Middleware authUtil sẽ kiểm tra xác thực trước khi render trang home
router.get('/home', authUtil, (req, res) => {
  res.render("home");
});

module.exports = router;
