const express = require("express");
const mongoose = require("mongoose");

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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// require routes
app.use(require("./routes/api.js"));
require("./routes/html")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});