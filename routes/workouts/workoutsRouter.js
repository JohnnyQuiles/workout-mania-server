const express = require('express');
const router = express.Router();
const { jwtMiddleware } = require('../users/lib/authMiddleware/index');
const { createWorkout, getAllWorkouts } = require('../workouts/controller/workoutsController');

router.get('/', (req, res, next) => { res.send("Hello From Workouts Router")});
router.post('/create-workout', jwtMiddleware, createWorkout);
router.get('/get-all-workouts', jwtMiddleware, getAllWorkouts); 

module.exports = router;