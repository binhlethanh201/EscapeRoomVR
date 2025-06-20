const express = require("express");
const router = express.Router();
const Room1Controller = require("../app/controllers/Room1Controller");

router.get("/hotspot/center", Room1Controller.center);
router.get("/hotspot/left", Room1Controller.left);
router.get("/hotspot/right", Room1Controller.right);
router.get("/hotspot/back", Room1Controller.back);
router.get("/hotspot/door", Room1Controller.door);
module.exports = router;
