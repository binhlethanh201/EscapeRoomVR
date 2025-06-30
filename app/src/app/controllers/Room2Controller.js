const Room2 = require("../models/room2");

class Room2Controller {
  index(req, res, next) {
    res.render("room2");
  }

  //hotspots
  painting(req, res, next) {
    res.render("room2/hotspot/painting");
  }
  poster(req, res, next) {
    res.render("room2/hotspot/poster");
  }
  board(req, res, next) {
    res.render("room2/hotspot/board");
  }
  door(req, res, next) {
    res.render("room2/hotspot/door");
  }
}
module.exports = new Room2Controller();