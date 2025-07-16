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
            res.status(500).json({ message: "Lỗi khi lấy danh sách tài khoản" });
        }
    }

    // [GET] /admin/account/:id/view
    async viewAccountReadOnly(req, res) {
        try {
            const user = await User.findById(req.params.id).lean();
            if (!user) { return res.status(404).render("errors/404", { message: "Không tìm thấy tài khoản" }) }
            res.render("admin/accountDetailReadOnly", { user });
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết tài khoản (read only):", error);
            res.status(500).render("errors/500", { message: "Lỗi server khi lấy chi tiết tài khoản" });
        }
    }

    //[POST] /admin/account/:id/deactivate
    async inactivateAccount(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) { return res.status(404).json({ message: "Tài khoản không tồn tại" }) }
            user.status = "inactive";
            await user.save();
            res.redirect(`/admin/accounts`);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Lỗi khi vô hiệu hóa tài khoản" });
        }
    }

    //[POST] /admin/account/:id/activate
    async activateAccount(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) { return res.status(404).json({ message: "Tài khoản không tồn tại" }) }
            user.status = "active";
            await user.save();
            res.redirect(`/admin/accounts`);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Lỗi khi kích hoạt tài khoản" });
        }
    }

    // [GET] /admin/account/:id
    async viewAccountDetail(req, res) {
        try {
            const user = await User.findById(req.params.id).lean();
            if (!user) { return res.status(404).render("errors/404", { message: "Không tìm thấy tài khoản" }) }
            res.render("admin/accountDetail", { user });
        } catch (error) {
            console.error("Lỗi khi lấy thông tin chi tiết tài khoản:", error);
            res.status(500).render("errors/500", { message: "Lỗi server khi lấy chi tiết tài khoản" });
        }
    }

    // [GET] /admin/sessions
    async getAllSessions(req, res) {
        try {
            const sessions = await Session.find({});
            const userIds = sessions.map(s => s.userId);
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
            if (!session) { return res.status(404).send("Không tìm thấy session") }
            const user = await User.findById(session.userId);
            const username = user ? user.username : "Không rõ";
            res.render("admin/sessionDetail", { userId: session.userId, username, session: session.toObject() });
        } catch (error) {
            console.error("Lỗi khi lấy session chi tiết:", error);
            res.status(500).send("Lỗi server");
        }
    }

    // [GET] /admin/authtokens
    async getAllAuthTokens(req, res) {
        try {
            const authTokens = await Authentication.find({});
            const userIds = authTokens.map(t => t.userId);
            const users = await User.find({ _id: { $in: userIds } });
            const userMap = new Map(users.map(u => [u._id.toString(), u.username]));
            res.render("admin/authtokens", {
                tokens: authTokens.map(token => ({
                    _id: token._id,
                    userId: token.userId,
                    username: userMap.get(token.userId) || "Không rõ",
                    expiresAt: token.expiresAt,
                    createdAt: token.createdAt,
                }))
            });
        } catch (error) {
            console.error("Lỗi khi lấy token:", error);
            res.status(500).send("Lỗi server");
        }
    }

    // [GET] /admin/authtoken/:userId
    async getAuthTokensByUser(req, res) {
        try {
            const tokens = await Authentication.find({ userId: req.params.userId });
            const user = await User.findById(req.params.userId);
            if (!user) return res.status(404).send("Không tìm thấy người dùng");
            res.render("admin/authTokenDetail", { username: user.username, userId: user._id, tokens: tokens.map(t => t.toObject()) });
        } catch (err) {
            console.error("Lỗi khi lấy tokens theo user:", err);
            res.status(500).send("Lỗi server");
        }
    }

}

module.exports = new AdminController();