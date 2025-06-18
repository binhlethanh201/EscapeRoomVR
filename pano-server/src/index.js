const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

const staticPath = path.join(__dirname, '../public');
console.log("Serving static files from:", staticPath);

app.use(express.static(staticPath));

// Xử lý các node ảo: room1, room2, room3
const panoNodes = ['room1', 'room2', 'room3'];
panoNodes.forEach(node => {
  app.get(`/${node}`, (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
});

// Mặc định chuyển về room1
app.get('/', (req, res) => {
  res.redirect('/room1');
});

app.listen(port, () => {
  console.log(`Pano2VR server running at http://localhost:${port}`);
});