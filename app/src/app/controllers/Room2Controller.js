<<<<<<< HEAD
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
=======
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
>>>>>>> 886eb27abef7989fbac68e72558745647b08bf05
module.exports = new Room2Controller();