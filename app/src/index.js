const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

//connect database
const route = require('./routes');
const db = require('./config/db');
db.connect();
// app.use(morgan('combined'));

app.engine('hbs', handlebars.engine({
  extname: ".hbs",
  helpers:{
  }
}));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "resources", "views"));
app.use(express.static(path.join(__dirname, '../public')));
app.get("/", (req, res) => {
  res.render('home');
});

route(app);



app.listen(port, () => {
  console.log(`App listening on port: http://localhost:${port}`);
});
