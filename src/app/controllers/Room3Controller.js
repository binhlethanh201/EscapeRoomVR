const Room3 = require("../models/room3");

class Room3Controller {
  index(req, res, next) {
    res.render("room3");
  }

  //hotspots
  window(req, res, next) {
    res.render("room3/hotspot/window");
  }
  painting(req, res, next) {
    res.render("room3/hotspot/painting");
  }
   desk(req, res, next) {
    res.render("room3/hotspot/desk");
  }
    door(req, res, next) {
    res.render("room3/hotspot/door");
  }
  
}
module.exports = new Room3Controller();
