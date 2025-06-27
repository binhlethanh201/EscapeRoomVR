const express = require("express");
const router = express.Router();
const AdminController = require("../app/controllers/adminController");
const authUtil = require("../util/auth");
const User = require("../app/models/user");

//[GET] /admin/accounts
router.get("/accounts", authUtil, checkAdmin, AdminController.getUsers);

//[POST] /admin/account/:id/deactivate
router.post("/account/:id/deactivate", authUtil, checkAdmin, AdminController.inactivateAccount);

//[POST] /admin/account/:id/activate
router.post("/account/:id/activate", authUtil, checkAdmin, AdminController.activateAccount);

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
      return res.status(403).render("errors/403", {
        message: "Bạn không có quyền truy cập trang này!",
      });
    }
    next();
  } catch (error) {
    console.error("Lỗi kiểm tra quyền admin:", error);
    res.status(500).send("Lỗi server");
  }
}

module.exports = router;