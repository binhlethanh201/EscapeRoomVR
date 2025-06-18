const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');


//connect database
const route = require('./routes');
const db = require('./config/db');
db.connect();
// app.use(morgan('combined'));

//cookie
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.engine('hbs', handlebars.engine({
  extname: ".hbs",
  helpers:{
  }
}));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
  console.log(`App listening on port: http://localhost:${port}`);
});
