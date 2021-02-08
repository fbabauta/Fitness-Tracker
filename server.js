const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");

// set up port and express app
const PORT = process.env.PORT || 3000;
const app = express();

// set up logger 
app.use(logger("dev"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// set up mongodb connection
mongoose.connection(process.env.MONGODB_URI || "mongodb://localhost/fitnessDB", { useNewUrlParser: true });

// require routes
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/html-routes.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});