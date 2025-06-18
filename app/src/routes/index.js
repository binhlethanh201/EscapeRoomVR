const siteRouter = require("./site");
const room1Router = require("./room1");
const room3Router = require("./room3");
const authRouter = require('./auth');
const { authRequired } = require('../util/auth');

function route(app) {
  app.use("/room1", room1Router);
  app.use("/room3", room3Router);

  // Mặc định: chuyển đến trang đăng nhập
  app.get("/", (req, res) => {
    res.redirect("/login");
  });

  // Các tuyến xác thực
  app.use("/", authRouter);

  // Tuyến home yêu cầu đã đăng nhập
  app.get("/home", authRequired, (req, res) => {
    res.render("home");
  });

  app.get('/dashbroad', authRequired, (req, res) => {
    res.render('dashbroad', { user: req.user });
  });
}


module.exports = route;
