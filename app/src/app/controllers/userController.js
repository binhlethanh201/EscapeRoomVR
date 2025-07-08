const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { moongseToObject } = require("../../util/mongoose");

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
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.session.userId);
    if (!user || user._id.toString() !== req.params.id) {
      return res.status(403).send("Không có quyền đổi mật khẩu");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.render("user/changepassword", {
        user,
        error: "Mật khẩu cũ không đúng",
      });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.redirect(`/profile/${user._id}`);
  }
}

module.exports = new UserController();
