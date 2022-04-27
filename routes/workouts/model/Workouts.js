const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    workoutName: { type: String },
    workoutReps: { type: Number },
    workoutSets: { type: Number },
    weight: { type: Array },
    workoutOwner: { type: mongoose.Schema.ObjectId, ref: "user" }

}, { timestamps: true, });
module.exports = mongoose.model("workouts", workoutSchema);