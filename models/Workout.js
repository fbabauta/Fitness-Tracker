const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    required: true,
    // default: moment().format("YYYY-MM-DD HH:mm")
  },
  dateTime: {
    type: Number,
    required: true,
  },
  totalDuration: {
    type: Number,
    default: 0,
  },
  exercises: []
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;