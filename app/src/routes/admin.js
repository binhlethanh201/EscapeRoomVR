const express = require("express");
const router = express.Router();
const AdminController = require("../app/controllers/adminController");
const authUtil = require("../util/auth");
const User = require("../app/models/user");

//[GET] /admin/accounts
router.get("/accounts", authUtil, checkAdmin, AdminController.getUsers);

//[GET] /admin/account/:id/view
router.get("/account/:id/view", authUtil, checkAdmin, AdminController.viewAccountReadOnly);


//[POST] /admin/account/:id/deactivate
router.post("/account/:id/deactivate", authUtil, checkAdmin, AdminController.inactivateAccount);

//[POST] /admin/account/:id/activate
router.post("/account/:id/activate", authUtil, checkAdmin, AdminController.activateAccount);

//[GET] /admin/account/:id
router.get("/account/:id", authUtil, checkAdmin, AdminController.viewAccountDetail);

//[GET] /admin/sessions
router.get("/sessions", authUtil, checkAdmin, AdminController.getAllSessions);

//[GET] /admin/session/:userId
router.get("/session/:userId", authUtil, checkAdmin, AdminController.getSessionByUser);

// [GET] /admin/authtokens
router.get("/authtokens", authUtil, checkAdmin, AdminController.getAllAuthTokens);

// [GET] /admin/authtoken/:userId
router.get("/authtoken/:userId", authUtil, checkAdmin, AdminController.getAuthTokensByUser);


//[GET] /admin/dashboard
router.get('/dashboard', checkAdmin, (req, res) => {
  res.render('admin/dashboard', {
    username: req.session.username || 'Admin'
  });
});

//middleware kiểm tra quyền admin
async function checkAdmin(req, res, next) {
  try {
    const user = await User.findById(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).send("Bạn không có quyền truy cập trang này!");
    }
    next();
  } catch (error) {
    console.error("Lỗi kiểm tra quyền admin:", error);
    res.status(500).send("Lỗi server");
  }
}

module.exports = router;