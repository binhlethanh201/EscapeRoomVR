const siteRouter = require("./site");
const room1Router = require("./room1");
const room3Router = require("./room3");
const userRouter = require("./user");

function route(app) {
  //request /room1 : chuyển về room1Router
  app.use("/room1", room1Router);

  //request /room3 : chuyển về room3Router
  app.use("/room3", room3Router);

  //request / : chuyển về userRouter
  app.use("/", userRouter);
}
module.exports = route;
