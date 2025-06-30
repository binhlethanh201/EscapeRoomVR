const Authentication = require("../app/models/authentication");

module.exports = async function (req, res, next) {
  try {
    if (!req.session.userId) {
      return res.redirect("/");
    }
    const tokenRecord = await Authentication.findOne({ userId: req.session.userId });
    if (!tokenRecord) {
      req.session.destroy(() => {
        return res.redirect("/");
      });
      return;
    }
    const now = new Date();
    if (now > tokenRecord.expiresAt) {
      await Authentication.deleteOne({ userId: req.session.userId });
      req.session.destroy(() => {
        return res.redirect("/");
      });
      return;
    }
    next();
  } catch (err) {
    console.error("Middleware auth error:", err);
    res.redirect("/");
  }
};
