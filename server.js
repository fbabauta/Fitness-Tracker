  
require("dotenv");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var compression = require('compression');

const PORT = process.env.PORT || 3000;

const workout = require("./models");

const app = express();
app.use(compression({ filter: shouldCompress }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
 
  // fallback to standard filter function
  return compression.filter(req, res)
}

//code stars here
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });