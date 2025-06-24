const express = require("express");
const router = express.Router();
const Room3Controller = require("../app/controllers/Room3Controller");

router.get("/hotspot/painting", Room3Controller.painting);
router.get("/hotspot/window", Room3Controller.showWindow);
router.get("/minigame/fillinblank", Room3Controller.fillInBlankGame);
router.get("/minigame/multiplequestion", Room3Controller.multipleQuestionGame);
router.get("/", Room3Controller.index);

module.exports = router;
