const Authentication = require("../app/models/authentication");
const User = require("../app/models/user");

module.exports = async function (req, res, next) {
  try {
    const { userId, sessionId, ip, userAgent } = req.session;
    if (!userId || !sessionId) {
      return res.redirect("/");
    }
    const user = await User.findById(userId);
    if (!user || user.currentSessionId !== sessionId) {
      req.session.destroy(() => res.redirect("/"));
      return;
    }
    if (ip !== req.ip || userAgent !== req.get('User-Agent')) {
      console.log("IP hoặc User-Agent mismatch");
      return req.session.destroy(() => res.redirect("/"));
    }
    const tokenRecord = await Authentication.findOne({ userId });
    if (!tokenRecord) {
      console.log('Token missing but session valid. Redirecting...');
      req.session.destroy(() => res.redirect("/"));
      return;
    }
    const now = new Date();
    if (now > tokenRecord.expiresAt) {
      await Authentication.deleteMany({ userId });
      req.session.destroy(() => res.redirect("/"));
      return;
    }
    next();
  } catch (err) {
    console.error("Middleware auth error:", err);
    res.redirect("/");
  }
};
