# GameVR - Virtual Reality Educational Game Platform

A comprehensive virtual reality educational platform featuring interactive 360° panoramas, mini-games, and user management system.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or [Yarn](https://yarnpkg.com/)
- **MongoDB** (local or cloud): [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
- **MongoDB Compass** (optional, for GUI): [Download MongoDB Compass](https://www.mongodb.com/products/compass)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gameVR
   ```

2. **Install dependencies for both servers**
   ```bash
   # Install app dependencies
   cd app
   npm install

   # Install pano-server dependencies
   cd ../pano-server
   npm install
   ```

3. **Set up MongoDB**
   - Start your MongoDB server locally (default: `mongodb://localhost:27017`)
   - Or use MongoDB Atlas for a cloud database.
   - Use **MongoDB Compass** to visually manage your database (connect to `mongodb://localhost:27017`).

4. **Configure the app to use MongoDB**
   - Edit `app/src/config/db/index.js` if you need to change the connection string.
   - Default is usually:
     ```js
     const mongoose = require('mongoose');
     mongoose.connect('mongodb://localhost:27017/gamevr', { useNewUrlParser: true, useUnifiedTopology: true });
     ```

### Running the Project

Open two terminals:

**Terminal 1: Start the main app (backend/frontend)**
```bash
cd app
npm start
# App runs at http://localhost:3000
```

**Terminal 2: Start the panorama server**
```bash
cd pano-server
npm start
# Panorama viewer runs at http://localhost:8080
```

---

## 🗂️ Project Structure

```
gameVR/
├── app/                # Main web app (Node.js/Express, Handlebars, MongoDB)
│   ├── src/
│   │   ├── app/        # Controllers and models
│   │   ├── config/     # Database config
│   │   ├── routes/     # Express routes
│   │   ├── resources/  # Views (Handlebars) and CSS
│   │   └── util/       # Utility functions
│   ├── public/         # Static files (images, games)
│   └── Database/       # JSON data (legacy or seed)
└── pano-server/        # Panorama viewer server (Node.js/Express)
    ├── public/         # Panorama assets, tiles, index.html
    └── src/            # Server code
```

---

## 📚 Learn More: Node.js & Express

- [Node.js Official Docs](https://nodejs.org/en/docs)
- [Express.js Official Docs](https://expressjs.com/)
- [The Net Ninja Node.js Tutorial (YouTube)](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ)
- [MongoDB University Free Courses](https://university.mongodb.com/)
- [Handlebars.js Guide](https://handlebarsjs.com/guide/)

