const Room1 = require("../models/room1");

class Room1Controller {
  index(req, res, next) {
    res.render("room1");
  }

  //hotspots
  center(req, res, next) {
    res.render("room1/hotspot/center");
  }
   left(req, res, next) {
    res.render("room1/hotspot/left");
  }
   right(req, res, next) {
    res.render("room1/hotspot/right");
  }
   back(req, res, next) {
    res.render("room1/hotspot/back");
  }
   door(req, res, next) {
    res.render("room1/hotspot/door");
  }

  
}
module.exports = new Room1Controller();