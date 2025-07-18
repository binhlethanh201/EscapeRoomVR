const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/userController");
const AuthController = require("../app/controllers/authController");
const authUtil = require("../util/auth");
const User = require("../app/models/user");

//[POST] /login
router.get("/", (req, res) => { res.render("login"); });
router.post("/login", AuthController.login);

//[POST] /logout
router.post("/logout", AuthController.logout);

//[GET] /profile/:id
router.get("/profile/:id", UserController.profile);

//profile/edit
//[GET] /profile/:id/edit
router.get("/profile/:id/edit", authUtil, UserController.editProfileForm);
// [POST] /profile/:id/edit
router.post("/profile/:id/edit", authUtil, UserController.editProfile);

//profile/changepassword
//[GET] /profile/:id/changepassword
router.get("/profile/:id/changepassword", authUtil, UserController.changePasswordForm);
//[POST] /profile/:id/changepassword
router.post("/profile/:id/changepassword", authUtil, UserController.changePassword);

//[GET] /check-auth
router.get("/check-auth", AuthController.checkAuth);

//register
//[GET] /register
router.get("/register", (req, res) => { res.render("user/register"); });
//[POST] /register
router.post("/register", AuthController.register);

//forgot password
router.get("/forgotpassword", (req, res) => { res.render("user/forgotpassword"); });
router.post("/forgotpassword", AuthController.forgotPassword);
router.get("/resetpassword/:token", AuthController.resetPasswordForm);
router.post("/resetpassword/:token", AuthController.resetPassword);

//[GET] /setting
router.get("/setting", authUtil, UserController.setting);

// [GET] /continue
router.get("/continue", authUtil, UserController.continueGame);

//[GET] /check-session
router.get("/check-session", authUtil, UserController.checkSession);

//[POST] /clear-session
router.post("/clear-session", authUtil, UserController.clearSession);

// [GET] /home 
router.get("/home", authUtil, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user) { return res.redirect("/") }
  if (user.role === "admin") { return res.redirect("/admin/dashboard") }
  res.render("home", { username: user.username, id: user._id });
});

module.exports = router;
