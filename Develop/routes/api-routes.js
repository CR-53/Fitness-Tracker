const db = require("../models");

module.exports = app => {
    app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .sort({day: 1})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });

    app.put("/api/workouts/:id", (req, res) => {
        const id = req.params.id;
        const duration = req.body.duration;
         db.Workout.findByIdAndUpdate(id,
            {
            $push: { exercises: req.body },
            $inc: { totalDuration: duration }
        }, {
            new: true
        }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err)
        });
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
            .then(dbWorkout => {
                res.json(dbWorkout)
            }).catch(err => {
                res.status(400).json(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                res.status(400).json(err);
            });
    });
};

