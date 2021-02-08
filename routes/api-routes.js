const router = require("express").Router();
const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// get all workout data
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(error);
        });
});

// get last workout 
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .sort({ day: -1 })
        .limit(1)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

// add new workout
router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body } },
        { upsert: true, "new": true })
        .then(data => {
            let duration = data.calcDuration();
            db.Workout.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { totalDuration: duration } },
            )
                .then(updated => {
                    res.json(updated);
                })
        })
        .catch(err => {
            res.json(err);
        });
});


module.exports = router;
    