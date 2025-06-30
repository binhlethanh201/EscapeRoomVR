const Room1 = require("../models/room1");
class Room1Controller {
  //[GET] /hotspots
  //[GET] /hotspots/center
  center(req, res, next) {
    res.render("room1/hotspot/center");
  }
  //[GET] /hotspots/left
  left(req, res, next) {
    res.render("room1/hotspot/left");
  }
  //[GET] /hotspots/right
  right(req, res, next) {
    res.render("room1/hotspot/right");
  }
  //[GET] /hotspots/back
  back(req, res, next) {
    res.render("room1/hotspot/back");
  }
  //[GET] /hotspots/door
  door(req, res, next) {
    res.render("room1/hotspot/door");
  }

  //[GET] index
  index(req, res, next) {
    res.render("room1");
  }
}
module.exports = new Room1Controller();
