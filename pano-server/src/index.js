const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

const staticPath = path.join(__dirname, '../public');
console.log("Serving static files from:", staticPath);

app.use(express.static(staticPath));

// Các route cụ thể
const panoNodes = ['room1', 'room2', 'room3'];
panoNodes.forEach(node => {
  app.get(`/${node}`, (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
});

// Route gốc
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Fallback route cho SPA
app.use((req, res) => {
  res.status(404).sendFile(path.join(staticPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Pano2VR server running at http://localhost:${port}`);
});
