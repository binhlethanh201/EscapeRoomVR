const express = require("express");
const router = express.Router();
const Room1Controller = require("../app/controllers/Room1Controller");

//[GET] /hotspot/center
router.get("/hotspot/center", Room1Controller.center);

//[GET] /hotspot/left
router.get("/hotspot/left", Room1Controller.left);

//[GET] /hotspot/right
router.get("/hotspot/right", Room1Controller.right);

//[GET] /hotspot/back
router.get("/hotspot/back", Room1Controller.back);

//[GET] /hotspot/door
router.get("/hotspot/door", Room1Controller.door);
module.exports = router;
