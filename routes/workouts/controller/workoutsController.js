const Workouts = require('../model/Workouts');
const User = require('../../users/model/User');
const { errorHandler } = require('../../users/utils/errorHandler');


const createWorkout = async (req, res) => {
    try {
        const { workoutName, workoutReps, workoutSets, weight } = req.body;

        let errObj = {};

        if (Object.keys(errObj).length > 0) {
            return res.status(500).json({ message: "Error", error: errObj });
        }

        const decodedData = res.locals.decodedToken;
        const foundUser = await User.findOne({ email: decodedData.email });
        if (!foundUser) throw { message: "User not found " };

        const newWorkout = new Workouts({
            workoutName: workoutName,
            workoutReps: workoutReps,
            workoutSets: workoutSets,
            weight: weight,
            workoutOwner: foundUser._id,
        });

        const savedWorkout = await newWorkout.save();

        foundUser.workoutHistory.push(savedWorkout.id);
        await foundUser.save();

        res.status(200).json({ message: "Workout saved successfully", payload: savedWorkout });
    } catch (error) {
        res.status(500).json(errorHandler(error));
        alert("Workout unsuccessfully saved")
        console.log(error);

    }
};
const getAllWorkouts = async (req, res) => {
    // console.log("Starting.....");
    try {
        const decodedData = res.locals.decodedToken;

        const foundUser = await User.findOne({ email: decodedData.email });
        if (!foundUser) throw { message: "User not found" };

        const foundWorkouts = await Workouts.find({ workoutOwner: foundUser.id });
        console.log("USER:", foundWorkouts);
        res.status(200).json({ payload: foundWorkouts });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
        console.log(error);
    }
};
const updateWorkouts = async (req, res) => {
    try {
        const { workoutName, workoutReps, workoutSets, weight, workoutOwner } = req.body;

        let errObj = {};

    
        if(Object.keys(errObj).length > 0) {
            return res.status(500).json({ message: "Error", error: errObj})
        }
        const updatedWorkout = await Workouts.findByIdAndUpdate(workoutOwner, req.body, {
            new: true
        });
        console.log(updatedWorkout);
        res.status(200).json({ message:"Workout has been updated", payload: updatedWorkout})
    } catch (error) {
        res.status(500).json({ message: "Error", error: errorHandler(error)});
        console.log(error);
    }
}
module.exports = {
    createWorkout,
    getAllWorkouts,
    updateWorkouts
}