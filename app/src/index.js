const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require("cors");
const moment = require("moment");
const route = require("./routes");
const app = express();
const port = 3000;

//test morgan
// const morgan = require("morgan");
// app.use(morgan('combined'));

//connect database
const db = require("./config/db");
db.connect();

//tự động logout bằng cors ở localhost:8080 (pano-server)
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true
}));

//Utility cho auth (Middleware) bằng bodyParser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "your_session_secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3 * 60 * 60 * 1000, // 3 giờ
  }
}));

//view engine bằng handlebars (hbs)
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      json: function (context) {
        return JSON.stringify(context, null, 2);
      },
        formatDate: (date) => {
      return moment(date).format("HH:mm:ss - DD/MM/YYYY");
    },
    },
  })
);
app.set("view engine", "hbs");
//view engine các path resources và views (các folder lưu giao diện)
app.set("views", path.join(__dirname, "resources", "views"));
<<<<<<< HEAD

app.use(express.static(path.join(__dirname, "../public")));

=======
//view engine path public (minigame, ảnh)
app.use(express.static(path.join(__dirname, "../public")));

//bắt đầu app bằng login
>>>>>>> c9a4d73e9f73ce842eaa025052e2f2f67a877a3d
app.get("/", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/home");
  }
  res.render("user/login");
});

//truyền app vào route để khai báo các routes ở path routes
route(app);

<<<<<<< HEAD


=======
//khởi động server express qua port 3000 và chạy trong localhost
>>>>>>> c9a4d73e9f73ce842eaa025052e2f2f67a877a3d
app.listen(port, () => {
  console.log(`App listening on port: http://localhost:${port}`);
});
