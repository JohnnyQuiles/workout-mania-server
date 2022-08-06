const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    workoutName: String,
    workoutSets: Number,
    workoutReps: Number,
    workoutWeight: Number,
}, { timestamps: true });

//error code 11000
module.exports = mongoose.model("workout", workoutSchema);
