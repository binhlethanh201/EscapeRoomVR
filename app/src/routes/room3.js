const express = require('express');
const router = express.Router();
const Room3Controller = require('../app/controllers/Room3Controller');

router.get('/hotspot/window', Room3Controller.window);
router.get('/minigame/fillInBlank', Room3Controller.fillInBlank);
router.get('/hotspot/painting', Room3Controller.painting);
router.get('/hotspot/desk', Room3Controller.desk);
router.get('/hotspot/door', Room3Controller.door);
module.exports = router;