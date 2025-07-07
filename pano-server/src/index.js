const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

//gán static path cho folder public (minigame, ảnh)
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

// Xử lý các node ảo: room1, room2, room3
const panoNodes = ["room1", "room2", "room3", "left" ,"daThanhNote" , "nhaTranNote", "hoGuomBook", "leLoiBook", "center", "desk", "window"];
panoNodes.forEach((node) => {
  //gán /room1 (/room2 || /room3) cho index
  app.get(`/${node}`, (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
});

// Mặc định chuyển về room1
app.get("/", (req, res) => {
  res.redirect("/room1");
});
//khởi động server express qua port 8080 và chạy trong localhost
app.listen(port, () => {
  console.log(`Pano2VR server running at http://localhost:${port}`);
});