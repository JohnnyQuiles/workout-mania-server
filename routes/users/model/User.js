const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
    workoutHistory: [{ type: mongoose.Schema.ObjectId, ref: "workouts" }],
}, { timestamps: true });

//error code 11000
module.exports = mongoose.model("user", userSchema);
