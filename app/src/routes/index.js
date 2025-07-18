const room1Router = require("./room1");
const room2Router = require("./room2");
const room3Router = require("./room3");
const userRouter = require("./user");
const adminRouter = require("./admin");

function route(app) {
  app.use("/room1", room1Router);
  app.use("/room2", room2Router);
  app.use("/room3", room3Router);
  app.use("/admin", adminRouter);
  app.use("/", userRouter);
}
module.exports = route;
