const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { moongseToObject } = require("../../util/mongoose");

class UserController {
  //[GET] /profile/:id
  async profile(req, res, next) {
    try {
      //lấy userId của người đang đăng nhập từ session và profile đang xem
      const loggedInUserId = req.session.userId;
      const profileUserId = req.params.id;
      //tìm thông tin người đăng nhập trong DB và profile đang xem
      const loggedInUser = await User.findById(loggedInUserId);
      const profileUser = await User.findById(profileUserId);
      //không tìm thấy người đăng nhập hoặc người dùng cần xem profile
      if (!loggedInUser || !profileUser) {
        return res.status(404).send("Người dùng không tồn tại");
      }
      //kiểm tra quyền truy cập
      if (loggedInUser.role !== "admin" && loggedInUserId !== profileUserId) {
        return res.status(403).send("Bạn không có quyền xem profile này");
      }
      ////nếu hợp lệ, render trang profile truyền dữ liệu cần xem
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
    //lấy người dùng đang đăng nhập và người dùng cần chỉnh sửa theo id
    const currentUser = await User.findById(req.session.userId);
    const profileUser = await User.findById(req.params.id);
    //lỗi khi không tìm thấy user nào
    if (!currentUser || !profileUser) {
      return res.status(404).send("Không tìm thấy người dùng");
    }
    //kiểm tra quyền: chỉ admin hoặc chính chủ mới được chỉnh sửa
    if (
      currentUser.role !== "admin" &&
      currentUser._id.toString() !== profileUser._id.toString()
    ) {
      return res.status(403).send("Không có quyền chỉnh sửa");
    }
    //render form edit, truyền dữ liệu user cần chỉnh sửa
    res.render("user/edit", {
      user: profileUser.toObject(),
    });
  }
  // [POST] /profile/:id/edit
  async editProfile(req, res) {
    const currentUser = await User.findById(req.session.userId);
    const profileUser = await User.findById(req.params.id);
    //kiểm tra tồn tại user
    if (!currentUser || !profileUser) {
      return res.status(404).send("Không tìm thấy người dùng");
    }
    //kiểm tra quyền chỉnh sửa
    if (
      currentUser.role !== "admin" &&
      currentUser._id.toString() !== profileUser._id.toString()
    ) {
      return res.status(403).send("Không có quyền chỉnh sửa");
    }
    //lấy dữ liệu từ form
    const { displayName, avatar, school, grade, department } = req.body;
    //cập nhật các trường profile tương ứng
    profileUser.profile.displayName = displayName;
    profileUser.profile.avatar = avatar;
    if (school !== undefined) profileUser.profile.school = school;
    if (grade !== undefined) profileUser.profile.grade = grade;
    if (department !== undefined) profileUser.profile.department = department;
    //lưu thay đổi vào DB
    await profileUser.save();
    //redirect về trang profile sau khi cập nhật
    res.redirect(`/profile/${profileUser._id}`);
  }

  //change password
  // [GET] /profile/:id/changepassword
  async changePasswordForm(req, res) {
    const user = await User.findById(req.session.userId);
    //chỉ cho phép chính chủ đổi mật khẩu
    if (!user || user._id.toString() !== req.params.id) {
      return res.status(403).send("Không có quyền đổi mật khẩu");
    }
    //render form đổi mật khẩu
    res.render("user/changepassword", {
      user: user.toObject(),
    });
  }
  // [POST] /profile/:id/changepassword
  async changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.session.userId);
    //kiểm tra chính chủ
    if (!user || user._id.toString() !== req.params.id) {
      return res.status(403).send("Không có quyền đổi mật khẩu");
    }
    //so sánh mật khẩu cũ với mật khẩu đã hash lưu trong DB
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.render("user/changepassword", {
        user,
        error: "Mật khẩu cũ không đúng",
      });
    }
    //mã hóa mật khẩu mới và lưu vào DB
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    //redirect về trang profile sau khi đổi mật khẩu thành công
    res.redirect(`/profile/${user._id}`);
  }
}

module.exports = new UserController();
