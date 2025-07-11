const Room2 = require("../models/room2");
const saveSession = require("../../util/saveSession");

class Room2Controller {
  // [GET] /room2
  async index(req, res, next) {
    try {
      await saveSession(req, "room2", "index");
      res.render("room2");
    } catch (error) {
      next(error);
    }
  }

  // [GET] /hotspot/painting
  async painting(req, res, next) {
    try {
      await saveSession(req, "room2", "hotspot", "painting");
      const room = await Room2.findById("room2");
      console.log("Room data:", room); // Debug dữ liệu
      console.log("Message:", room?.hotspots?.painting?.message); // Debug message
      res.render("room2/hotspot/painting", {
        message: room?.hotspots?.painting?.message || "",
        hint: room?.hotspots?.painting?.hint || "",
        minigame: room?.hotspots?.painting?.minigame || {}
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /hotspot/poster
  async poster(req, res, next) {
    try {
      await saveSession(req, "room2", "hotspot", "poster");
      const room = await Room2.findById("room2");
      res.render("room2/hotspot/poster", {
        message: room?.hotspots?.poster?.message || "",
        hint: room?.hotspots?.poster?.hint || "",
        minigame: room?.hotspots?.poster?.minigame || {}
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /hotspot/board
  async board(req, res, next) {
    try {
      await saveSession(req, "room2", "hotspot", "board");
      const room = await Room2.findById("room2");
      res.render("room2/hotspot/board", {
        message: room?.hotspots?.board?.message || "",
        hint: room?.hotspots?.board?.hint || "",
        minigame: room?.hotspots?.board?.minigame || {}
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /hotspot/door
  async door(req, res, next) {
    try {
      await saveSession(req, "room2", "hotspot", "door");
      const room = await Room2.findById("room2");
      const unlockCode = room?.unlockCode || [];
      const completeInfo = room?.completedInfor || "";
      const completeMessage = room?.completedMessage || "";
      res.render("room2/hotspot/door", {
        unlockCodeArray: unlockCode,
        hint: room?.hotspots?.door?.interactionData?.hint || "",
        instructions: room?.hotspots?.door?.interactionData?.instructions || "",
        completeInfo,
        completeMessage,
      });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /complete
  async complete(req, res) {
    try {
        if (!req.session) {
            throw new Error('Session is undefined');
        }
        await saveSession(req, 'room2', 'hotspot', 'door', {
            isCompleted: true,
        });
        res.sendStatus(200);
    } catch (error) {
        console.error('Error completing room:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).send('Internal server error');
    }
}
}

module.exports = new Room2Controller();