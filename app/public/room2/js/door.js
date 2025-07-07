const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // Thêm cors
const Room2 = require('../../../src/app/models/room2'); // Đảm bảo đường dẫn đúng đến file model

const app = express();

// Cấu hình CORS để cho phép yêu cầu từ http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Cho phép origin cụ thể
  methods: ['GET', 'POST', 'OPTIONS'], // Cho phép các phương thức HTTP
  allowedHeaders: ['Content-Type'], // Cho phép header Content-Type
}));

app.use(express.json());
app.use(express.static(__dirname));

// Kết nối với MongoDB
mongoose.connect('mongodb://localhost:27017/gameVR', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Route để phục vụ file HTML
app.get('/lock', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/resources/views/room2/hotspot/door.hbs'));
});

// Route để kiểm tra mã và cập nhật isRequired
app.post('/check-code', async (req, res) => {
  try {
    const userCode = req.body.code; // Mảng [1, 7, 6]
    const enteredCode = userCode.join(''); // Chuyển thành chuỗi "176"

    // Truy vấn phòng room2 từ MongoDB
    const room = await Room2.findOne({ _id: 'room2' });
    if (!room) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }

    // So sánh mã người dùng nhập với unlockCode
    const isCorrect = enteredCode === room.unlockCode;

    if (isCorrect) {
      // Cập nhật hotspots.door.isRequired thành false
      room.hotspots.door.isRequired = false;
      await room.save(); // Lưu thay đổi vào MongoDB
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(8080, () => {
  console.log('Server running at http://localhost:8080/lock');
});