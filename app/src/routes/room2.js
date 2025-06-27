<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const Room2Controller = require('../app/controllers/Room2Controller');
router.get("/test", (req, res) => {
  res.send("Route test hoạt động");
});
router.get('/hotspot/painting',Room2Controller.painting);
router.get('/hotspot/poster',Room2Controller.poster);
router.get('/hotspot/board',Room2Controller.board);
router.get('/hotspot/door',Room2Controller.board);
router.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room2.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
=======
const express = require('express');
const router = express.Router();
const Room2Controller = require('../app/controllers/Room2Controller');
router.get("/test", (req, res) => {
  res.send("Route test hoạt động");
});
router.get('/hotspot/painting',Room2Controller.painting);
router.get('/hotspot/poster',Room2Controller.poster);
router.get('/hotspot/board',Room2Controller.board);
router.get('/hotspot/door',Room2Controller.board);
router.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room2.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
>>>>>>> 886eb27abef7989fbac68e72558745647b08bf05
module.exports = router;