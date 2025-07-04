const express = require("express");
const router = express.Router();
const Room3Controller = require("../app/controllers/Room3Controller");

//[GET] /hotspot/painting
router.get("/hotspot/painting", Room3Controller.painting);

//[GET] /hotspot/desk
router.get("/hotspot/desk", Room3Controller.desk);

//[GET] /hotspot/window
router.get("/hotspot/window", Room3Controller.showWindow);

//[GET] /hotspot/door
router.get("/hotspot/door", Room3Controller.door);  

//[GET] /minigame
//[GET] /minigame/fillinblank
router.get("/minigame/fillinblank", Room3Controller.fillInBlankGame);
//[GET] /minigame/multiplequestion
router.get("/minigame/multiplequestion", Room3Controller.multipleQuestionGame);

//[GET] /
router.get("/", Room3Controller.index);

module.exports = router;
