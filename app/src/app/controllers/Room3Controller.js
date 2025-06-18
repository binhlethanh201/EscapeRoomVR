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

  // Thêm route minigame fillInBlank
  async fillInBlank(req, res, next) {
  try {
    const room = await Room3.findOne({ id: 'room3' }).exec();
    if (!room) throw new Error('Room3 not found');

    console.log('hotspots:', room.hotspots);  // DEBUG xem có trường window không

    const windowHotspot = room.hotspots?.window;
    if (!windowHotspot) throw new Error('Window hotspot not found');

    const minigame = (windowHotspot.minigame || []).find(mg => mg.id === 'fillInBlank');
    if (!minigame) throw new Error('FillInBlank minigame not found');

    res.render('room3/minigame/fillInBlank', { minigame });
  } catch (err) {
    next(err);
  }
}

}
module.exports = new Room3Controller();
