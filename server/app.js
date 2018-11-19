// ! BASIC CONFIG
const express = require("express"),
  app = express(),
  port = process.env.PORT || 4000,
  routes = require("./routes"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  helmet = require("helmet"),
  colors = require("colors"),
  morgan = require("morgan"),
  dbdir = `mongodb://allUsers:abcde1@ds211724.mlab.com:11724/large`;

app.use(cors());
app.use(helmet())
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use(routes);
app.use(morgan('combined'))

mongoose.connect(dbdir,{ useNewUrlParser: true }, (err, success) => {
  err ? console.log(`Server error`.bold.red) :
  console.log(`MongoDB running on ${dbdir}`.yellow)
});

app.listen(port, () => console.log(`Listening on ${port}`.yellow));