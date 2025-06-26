const express = require("express");
const router = express.Router();
const SiteController = require("../app/controllers/SiteController");

//[GET] /
router.get("/", SiteController.index);

module.exports = router;
