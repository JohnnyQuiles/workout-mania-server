const Workout = require('../model/Workout');

const createWorkout = async (req, res) => {
    try {
        const { workoutName, workoutSets, workoutReps, workoutWeight } = req.body;

        let newWorkout = new Workout({
            workoutName: workoutName,
            workoutSets: workoutSets,
            workoutReps: workoutReps,
            workoutWeight: workoutWeight
        });

        let savedWorkout = await newWorkout.save();
        console.log(savedWorkout);
        
        res.status(200).json({ message: "Created workout saved", payload: savedWorkout });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

module.exports = {
    createWorkout,
};