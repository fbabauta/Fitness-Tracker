const router = require("express").Router();
const db = require("../models");
const moment = require("moment");


router.post("/api/workouts", async (req, res) => {
  try {
    const date = moment().subtract(1, "days").toISOString();
    const data = await db.Workout.create({ day: date, dateTime: moment(date).unix() });
    // console.log(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
    

router.put("/api/workouts/:id", async (req, res) => {
  // console.log(req.body)
  try {
    const workout = await db.Workout.findById(req.params.id);
    // console.log(req.body)
    workout.totalDuration += parseInt(req.body.duration);
    workout.exercises.unshift(req.body);
    const data = await workout.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error);
  }

});


//Get Range
router.get('/api/workouts/range', (req, res) => {
  const sunday = moment().day(-1).toISOString().split("T");
  const monday = moment().day(0).toISOString().split("T");
  const tuesday = moment().day(1).toISOString().split("T");
  const wednesday = moment().day(2).toISOString().split("T");
  const thursday = moment().day(3).toISOString().split("T");
  const friday = moment().day(4).toISOString().split("T");
  const saturday = moment().day(5).toISOString().split("T");
  const weekArr = [sunday[0], monday[0], tuesday[0], wednesday[0], thursday[0], friday[0], saturday[0]];
  // console.log(moment("2020-10-12T02:20:51.852+00:00").unix());
  db.Workout.find({ dateTime: { $gte: moment().day(-1).unix(), $lte: moment().day(5).unix() } }).then(data => {
    const dataWeek = weekArr.map(wA => {

    });
    // console.log(dataWeek);
    res.status(201).json(data);
  })
    .catch(err => {
      console.log(err)
      res.status(400).json(err);
    });
});

    
//Get Last Workout
router.get('/api/workouts/', (req, res) => {
  db.Workout.find().then(data => {
    res.status(201).json(data);
  })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.get('/api/workouts/:id', (req, res) => {
  db.Workout.find({ _id: req.params.id }).then(data => {
    res.status(201).json(data);
  })
    .catch(err => {
      res.status(400).json(err);
    });
});



module.exports = router;