const Room3 = require("../models/room3");
class Room3Controller {
  //[GET] /hotspot
  //[GET] /hotspot/painting
  painting(req, res, next) {
    res.render("room3/hotspot/painting");
  }
  // [GET] /hotspot/desk
  desk(req, res, next) {
    res.render("room3/hotspot/desk");
  }
  // [GET] /hotspot/window
  async showWindow(req, res) {
    try {
      //tìm room3 từ database
      const room = await Room3.findById("room3");
      //nếu không tìm thấy dữ liệu ở DB
      if (!room || !room.hotspot || !room.hotspot.window) {
        return res.status(404).send("Không tìm thấy dữ liệu hotspot window");
      }
      //gọi window từ hotspot ở DB
      const windowHotspot = room.hotspot.window;
      res.render("room3/hotspot/window", { hotspot: windowHotspot });
    } catch (err) {
      console.error("Lỗi truy xuất hotspot:", err);
      res.status(500).send("Lỗi máy chủ");
    }
  }

  //[GET] /minigame
  //[GET] /minigame/fillinblank
  async fillInBlankGame(req, res) {
    try {
      //tìm room3 từ database
      const room = await Room3.findById("room3");
      const dataArray = room?.hotspot?.window?.interactionData;
      //nếu không tìm thấy dữ liệu ở DB
      if (!Array.isArray(dataArray)) {
        return res
          .status(500)
          .send("Dữ liệu fillInBlank không tồn tại hoặc không đúng định dạng");
      }
      //tìm fillInBlank từ hotspot/minigame
      const fillInBlank = dataArray.find((item) => item.id === "fillInBlank");
      if (!fillInBlank) {
        return res.status(404).send("Không tìm thấy câu hỏi fillInBlank");
      }
      // Convert "___" in câu hỏi thành "_____" để khớp input
      const sentence = fillInBlank.question.replace("___", "_____");
      const sentenceData = {
        sentence,
        answer: fillInBlank.answer[0], // lấy 1 đáp án đúng đầu tiên
      };
      res.render("room3/minigame/fillInBlank", { sentenceData });
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi lấy dữ liệu fillInBlank từ MongoDB");
    }
  }
  //[GET] /minigame/multiplequestion
  async multipleQuestionGame(req, res) {
    try {
      //tìm room3 từ database
      const room = await Room3.findById("room3");
      const dataArray = room?.hotspot?.window?.interactionData;
      //nếu không tìm thấy dữ liệu ở DB
      if (!Array.isArray(dataArray)) {
        return res.status(500).send("Không có interactionData dạng array");
      }
      //lọc ra các câu hỏi có id là 'multipleChoice'
      const multipleQuestions = dataArray.filter(
        (item) => item.id === "multipleChoice"
      );
      if (multipleQuestions.length === 0) {
        return res.status(404).send("Không tìm thấy multiple choice question");
      }
      //format lại để client để xử lý
      const questions = multipleQuestions.map((q) => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
      }));
      res.render("room3/minigame/multipleQuestion", { questions });
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi lấy multiple choice từ database");
    }
  }

  //index
  index(req, res, next) {
    res.render("room3");
  }
}
module.exports = new Room3Controller();
