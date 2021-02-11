const path = require("path");

module.exports = function (app) {
  // called when "Continue Workout" or "new Workout" is clicked in index.html
  app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
  app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });
};