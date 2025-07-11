const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { moongseToObject } = require("../../util/mongoose");
const Session = require("../models/session");

class UserController {

  //[GET] /profile/:id
  async profile(req, res, next) {
    try {
      const loggedInUserId = req.session.userId;
      const profileUserId = req.params.id;
      const loggedInUser = await User.findById(loggedInUserId);
      const profileUser = await User.findById(profileUserId);
      if (!loggedInUser || !profileUser) {
        return res.status(404).send("Người dùng không tồn tại");
      }
      if (loggedInUser.role !== "admin" && loggedInUserId !== profileUserId) {
        return res.status(403).send("Bạn không có quyền xem profile này");
      }
      res.render("user/profile", {
        user: moongseToObject(profileUser),
      });
    } catch (err) {
      console.error("Lỗi xem profile:", err);
      res.status(500).send("Lỗi server");
    }
  }

  //edit profile
  // [GET] /profile/:id/edit
  async editProfileForm(req, res) {
    const currentUser = await User.findById(req.session.userId);
    const profileUser = await User.findById(req.params.id);
    if (!currentUser || !profileUser) {
      return res.status(404).send("Không tìm thấy người dùng");
    }
    if (
      currentUser.role !== "admin" &&
      currentUser._id.toString() !== profileUser._id.toString()
    ) {
      return res.status(403).send("Không có quyền chỉnh sửa");
    }
    res.render("user/edit", {
      user: profileUser.toObject(),
    });
  }
  // [POST] /profile/:id/edit
  async editProfile(req, res) {
    const currentUser = await User.findById(req.session.userId);
    const profileUser = await User.findById(req.params.id);
    if (!currentUser || !profileUser) {
      return res.status(404).send("Không tìm thấy người dùng");
    }
    if (
      currentUser.role !== "admin" &&
      currentUser._id.toString() !== profileUser._id.toString()
    ) {
      return res.status(403).send("Không có quyền chỉnh sửa");
    }
    const { displayName, avatar, school, grade, department } = req.body;
    profileUser.profile.displayName = displayName;
    profileUser.profile.avatar = avatar;
    if (school !== undefined) profileUser.profile.school = school;
    if (grade !== undefined) profileUser.profile.grade = grade;
    if (department !== undefined) profileUser.profile.department = department;
    await profileUser.save();
    res.redirect(`/profile/${profileUser._id}`);
  }

  //change password
  // [GET] /profile/:id/changepassword
  async changePasswordForm(req, res) {
    const user = await User.findById(req.session.userId);
    if (!user || user._id.toString() !== req.params.id) {
      return res.status(403).send("Không có quyền đổi mật khẩu");
    }
    res.render("user/changepassword", {
      user: user.toObject(),
    });
  }
  // [POST] /profile/:id/changepassword
  async changePassword(req, res) {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const user = await User.findById(req.session.userId);

    if (!user || user._id.toString() !== req.params.id) {
      return res.status(403).send("Không có quyền đổi mật khẩu");
    }

    if (newPassword !== confirmNewPassword) {
      return res.render("user/changepassword", {
        user: user.toObject(),
        error: "Mật khẩu mới và mật khẩu xác nhận không khớp",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.render("user/changepassword", {
        user: user.toObject(),
        error: "Mật khẩu cũ không đúng",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.redirect(`/profile/${user._id}`);
  }

  // [GET] /setting
  async setting(req, res) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).send("Không tìm thấy người dùng");
      }
      res.render("user/setting", {
        user: user.toObject(),
      });
    } catch (err) {
      console.error("Lỗi trang cài đặt:", err);
      res.status(500).send("Lỗi server");
    }
  }

  // [GET] /continue
  async continueGame(req, res) {
    try {
      const userId = req.session.userId;
      const session = await Session.findOne({ userId });
      if (!session || !session.gameData || !session.gameData.roomProgress) {
        return res.redirect("http://localhost:8080");
      }
      const roomTimes = Object.entries(session.gameData.roomProgress)
        .filter(([_, data]) => data.lastVisited)
        .map(([room, data]) => ({ room, time: new Date(data.lastVisited) }));
      if (roomTimes.length === 0) {
        return res.redirect("http://localhost:8080");
      }
      roomTimes.sort((a, b) => b.time - a.time);
      const mostRecentRoom = roomTimes[0].room;
      res.redirect(`http://localhost:8080/${mostRecentRoom}`);
    } catch (err) {
      console.error("Lỗi tiếp tục game:", err);
      res.redirect("http://localhost:8080");
    }
  }

  //[GET] /check-session
  async checkSession(req, res) {
    try {
      const userId = req.session.userId;
      const session = await Session.findOne({ userId });
      if (session) {
        return res.json({ hasSession: true });
      } else {
        return res.json({ hasSession: false });
      }
    } catch (err) {
      console.error("Lỗi kiểm tra session:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
  }

  //[POST] /clear-session
  async clearSession(req, res) {
    const userId = req.session.userId;
    await Session.deleteOne({ userId });
    res.sendStatus(200);
  }

}

module.exports = new UserController();
