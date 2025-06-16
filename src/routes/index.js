const siteRouter = require("./site");
const room1Router = require("./room1");
const room3Router = require("./room3");

function route(app) {
  app.use("/room1", room1Router);
  app.use("/room3", room3Router);
  app.use("/", siteRouter);
}
module.exports = route;
