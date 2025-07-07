const express = require("express");
const router = express.Router();
const Room3Controller = require("../app/controllers/Room3Controller");

//[GET] /hotspot/painting
router.get("/hotspot/painting", Room3Controller.painting);

//[GET] /hotspot/desk
router.get("/hotspot/desk", Room3Controller.desk);

//[GET] /hotspot/window
router.get("/hotspot/window", Room3Controller.window);

//[GET] /hotspot/door
router.get("/hotspot/door", Room3Controller.door);

//[POST] /complete
router.post("/complete", Room3Controller.complete);

//[GET] /
router.get("/", Room3Controller.index);

module.exports = router;
