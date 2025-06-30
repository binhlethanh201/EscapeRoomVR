const room1Router = require("./room1");
<<<<<<< HEAD
// const room2Router = require("./room2");
=======
const room2Router = require("./room2");
>>>>>>> 06f5e6859fa44f1abbec9749df972a34bbd0e548
const room3Router = require("./room3");
const userRouter = require("./user");
const adminRouter = require("./admin");

function route(app) {
  //request /room1 : chuyển về room1Router
  app.use("/room1", room1Router);
<<<<<<< HEAD
  // app.use("/room2", room2Router);
=======
  app.use("/room2", room2Router);
>>>>>>> 06f5e6859fa44f1abbec9749df972a34bbd0e548
  app.use("/room3", room3Router);

  //request /room2 : chuyển về room2Router
  app.use("/room2", room2Router);

  //request /admin : chuyển về adminRouter
  app.use("/admin", adminRouter);

  //request / : chuyển về userRouter
  app.use("/", userRouter);

}
module.exports = route;
