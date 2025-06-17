const Auth = require("../models/auth");

class AuthController {
  index(req, res, next) {
    res.render("auth");
  }
  
}
module.exports = new AuthController();
