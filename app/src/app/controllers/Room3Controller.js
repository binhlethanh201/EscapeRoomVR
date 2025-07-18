const Room3 = require("../models/room3");
const saveSession = require("../../util/saveSession");
class Room3Controller {
  //[GET] /hotspot/painting
  async painting(req, res, next) {
    await saveSession(req, "room3", "hotspot", "painting");
    const room = await Room3.findById("room3");
    res.render("room3/hotspot/painting", { message: room?.hotspots?.painting?.message || "", });
  }

  // [GET] /hotspot/door
  async door(req, res, next) {
    try {
      await saveSession(req, "room3", "hotspot", "door");
      const room = await Room3.findById("room3");
      const unlockCode = room?.unlockCode;
      const completeInfo = room?.completedInfor || "";
      const completeMessage = room?.completedMessage || "";
      const hint = room?.hotspots?.door?.interactionData?.hint || "";
      const instructions = room?.hotspots?.door?.interactionData?.instructions || "";
      res.render("room3/hotspot/door", {
        unlockCodeArray: unlockCode,
        completeInfo,
        completeMessage,
        hint,
        instructions,
      });
    } catch (error) { next(error) }
  }

  // [GET] /hotspot/desk
  async desk(req, res) {
    try {
      await saveSession(req, "room3", "hotspot", "desk");
      const room = await Room3.findById("room3");
      const dataArray = room?.hotspots?.desk?.interactionData;
      if (!Array.isArray(dataArray)) { return res.status(500).send("Dữ liệu không tồn tại hoặc không đúng định dạng") }
      const fillInBlankQuestions = dataArray.filter((item) => item.id?.startsWith("fillInBlank"));
      if (fillInBlankQuestions.length === 0) { return res.status(404).send("Không tìm thấy câu hỏi") }
      const sentenceData = fillInBlankQuestions.map((item) => ({
        sentence: item.question.replace("___", "_____"),
        answer: item.answer[0],
        hint: item.hint,
      }));
      res.render("room3/hotspot/desk", { sentenceData, message: room?.hotspots?.desk?.message || "" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi lấy dữ liệu từ MongoDB");
    }
  }

  // [GET] /hotspot/window
  async window(req, res) {
    try {
      await saveSession(req, "room3", "hotspot", "window");
      const room = await Room3.findById("room3");
      const dataArray = room?.hotspots?.window?.interactionData;
      if (!Array.isArray(dataArray)) { return res.status(500).send("Không có dữ liệu") }
      const multipleQuestions = dataArray.filter((item) => item.id?.startsWith("multipleChoice"));
      if (multipleQuestions.length === 0) { return res.status(404).send("Không tìm thấy câu hỏi") }
      const questions = multipleQuestions.map((q) => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
      }));
      res.render("room3/hotspot/window", { questions, message: room?.hotspots?.window?.message || "" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi lấy dữ liệu từ MongoDB");
    }
  }

  //[POST] /complete
  async complete(req, res) {
    try {
      await saveSession(req, "room3", "hotspot", "door", { isCompleted: true });
      res.sendStatus(200);
    } catch (err) {
      console.error("Error completing room:", err);
      res.status(500).send("Internal server error");
    }
  }

  //index
  index(req, res, next) {
    res.render("room3");
  }
}

module.exports = new Room3Controller();
