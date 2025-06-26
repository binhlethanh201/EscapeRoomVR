const User = require("../models/user");
const Authentication = require("../models/authentication");

class AdminController {
    //[GET] /admin/accounts
    async getUsers(req, res) {
        try {
            const users = await User.find({ role: "player" });
            res.render("admin/accounts", { users: users.map(u => u.toObject()) });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Lỗi khi lấy danh sách tài khoản",
            });
        }
    }

    //[POST] /admin/account/:id/deactivate
    async inactivateAccount(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    message: "Tài khoản không tồn tại",
                });
            }
            user.status = "inactive";
            await user.save();
            res.redirect("/admin/accounts");
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Lỗi khi vô hiệu hóa tài khoản",
            });
        }
    }

    //[POST] /admin/account/:id/activate
    async activateAccount(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "Tài khoản không tồn tại" });
            }
            user.status = "active";
            await user.save();
            res.redirect("/admin/accounts");
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Lỗi khi kích hoạt tài khoản" });
        }
    }

}

module.exports = new AdminController();