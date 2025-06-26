const room1Router = require("./room1");
const room2Router = require("./room2");
const room3Router = require("./room3");
const userRouter = require("./user");
const adminRouter = require("./admin");

function route(app) {
  //request /room1 : chuyển về room1Router
  app.use("/room1", room1Router);

  //request /room3 : chuyển về room3Router
  app.use("/room3", room3Router);

  //request /room2 : chuyển về room2Router
  app.use("/room2", room2Router);

  //request /admin : chuyển về adminRouter
  app.use("/admin", adminRouter);

  //request / : chuyển về userRouter
  app.use("/", userRouter);

}
module.exports = route;
