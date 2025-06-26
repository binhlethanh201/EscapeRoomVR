class SiteController {
  //[GET] index
  index(req, res, next) {
    res.render("home");
  }
}
module.exports = new SiteController();
