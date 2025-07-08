const Room1 = require("../models/room1");
const saveSession = require("../../util/saveSession");
class Room1Controller {

  //[GET] /hotspots/center
  async center(req, res, next) {
    await saveSession(req, "room1", "hotspot", "center");
    res.render("room1/hotspot/center");
  }
  //[GET] /hotspots/left
  async left(req, res, next) {
    await saveSession(req, "room1", "hotspot", "left");
    res.render("room1/hotspot/left");
  }
  //[GET] /hotspots/right
  async right(req, res, next) {
    await saveSession(req, "room1", "hotspot", "right");
    res.render("room1/hotspot/right");
  }
  //[GET] /hotspots/back
  async back(req, res, next) {
    await saveSession(req, "room1", "hotspot", "back");
    res.render("room1/hotspot/back");
  }
  //[GET] /hotspots/door
  async door(req, res, next) {
    try {
      await saveSession(req, "room1", "hotspot", "door");
      const room = await Room1.findById("room1");
      const unlockCode = room?.unlockCode;
      const completeInfo = room?.completedInfor || "";
      const completeMessage = room?.completedMessage || "";
      res.render("room1/hotspot/door", {
        unlockCodeArray: unlockCode.split("").map(Number),
        completeInfo,
        completeMessage,
      });
    } catch (error) {
      next(error);
    }
  }

  //[POST] /complete
  async complete(req, res) {
    try {
      await saveSession(req, "room1", "hotspot", "door", {
        isCompleted: true,
      });
      res.sendStatus(200);
    } catch (err) {
      console.error("Error completing room:", err);
      res.status(500).send("Internal server error");
    }
  }

  //[GET] index
  index(req, res, next) {
    res.render("room1");
  }
}
module.exports = new Room1Controller();
