module.exports = function (app) {
    const Workout = require("../models/workout");
  
    app.get("/api/workouts", (req, res) => {
      Workout.find({})
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.json(err);
        });
    });
  
    app.put("/api/workouts/:id", ({body, params}, res) => {
      Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, {new: true, runValidators: true})
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.json(err);
        });
    });
  
    app.post("/api/workouts", (req, res) => {

      Workout.create({})
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.json(err);
        });
    });

    app.post("/api/workouts/range",function (req,res){    
      Workout.create({})
      .then(data => res.json(data))
      .catch(err => { 
          res.json(err)
      })
  });
  
    app.get("/api/workouts/range", (req, res) => {
      Workout.find({})
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.json(err);
        });
    });
  }