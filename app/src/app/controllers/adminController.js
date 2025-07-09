const User = require("../models/user");
const Authentication = require("../models/authentication");
const Session = require("../models/session");

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

    // [GET] /admin/account/:id
    async viewAccountDetail(req, res) {
        try {
            const user = await User.findById(req.params.id).lean();
            if (!user) {
                return res.status(404).render("errors/404", {
                    message: "Không tìm thấy tài khoản",
                });
            }

            res.render("admin/accountDetail", { user });
        } catch (error) {
            console.error("Lỗi khi lấy thông tin chi tiết tài khoản:", error);
            res.status(500).render("errors/500", {
                message: "Lỗi server khi lấy chi tiết tài khoản",
            });
        }
    }

    // [GET] /admin/sessions
    async getAllSessions(req, res) {
        try {
            const sessions = await Session.find({});
            const userIds = sessions.map(s => s.userId);

            // Lấy tất cả user theo danh sách userId
            const users = await User.find({ _id: { $in: userIds } });
            const userMap = new Map(users.map(u => [u._id, u]));

            res.render("admin/sessions", {
                sessions: sessions.map(s => ({
                    _id: s._id,
                    userId: s.userId,
                    username: userMap.get(s.userId)?.username || "Không rõ",
                    roomsUnlocked: s.gameData?.progress?.roomsUnlocked || [],
                    roomsCompleted: s.gameData?.progress?.roomsCompleted || [],
                    totalCluesFound: s.gameData?.totalCluesFound || 0,
                }))
            });
        } catch (error) {
            console.error("Lỗi khi lấy sessions:", error);
            res.status(500).send("Lỗi server");
        }
    }

    // [GET] /admin/session/:userId
    async getSessionByUser(req, res) {
        try {
            const session = await Session.findOne({ userId: req.params.userId });
            if (!session) {
                return res.status(404).send("Không tìm thấy session");
            }

            const user = await User.findById(session.userId);
            const username = user ? user.username : "Không rõ";

            res.render("admin/sessionDetail", {
                userId: session.userId,
                username,
                session: session.toObject()
            });

        } catch (error) {
            console.error("Lỗi khi lấy session chi tiết:", error);
            res.status(500).send("Lỗi server");
        }
    }

}

module.exports = new AdminController();