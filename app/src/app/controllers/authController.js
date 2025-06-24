const Auth = require("../models/auth");
class AuthController {
  //index
  index(req, res, next) {
    res.render("auth");
  }
}
module.exports = new AuthController();
