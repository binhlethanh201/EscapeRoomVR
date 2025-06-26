const siteRouter = require("./site");
const room1Router = require("./room1");
const room2Router = require("./room2");
const room3Router = require("./room3");
const userRouter = require("./user");

function route(app) {
  //request /room1 : chuyển về room1Router
  app.use("/room1", room1Router);
<<<<<<< HEAD
  app.use("/room2", room2Router);
=======

  //request /room3 : chuyển về room3Router
>>>>>>> c9a4d73e9f73ce842eaa025052e2f2f67a877a3d
  app.use("/room3", room3Router);

  //request / : chuyển về userRouter
  app.use("/", userRouter);
}
module.exports = route;
