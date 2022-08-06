var express = require('express');
var router = express.Router();

const { createWorkout } = require('./controller/workoutController');

/* GET workouts. */
router.get('/', function (req, res, next) { res.status(200).json({ message: "Hello from Workout-Mania Workouts Router :D" }) });
router.post('/create', createWorkout);



module.exports = router;

