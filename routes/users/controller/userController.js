const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/errorHandler');

const getCurrentUser = async (req, res) => {
    try {
        const { decodedToken } = res.locals;

        const foundUser = await User.findOne({ email: decodedToken.email }).populate("workoutHistory", "-workoutOwner-__v");
        console.log("FOUND USER:", foundUser);

        res.status(200).json({ message: "Current user and populating workout history" });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
        console.log(error);
    }
};

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);

        let newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashPassword
        });

        let savedUser = await newUser.save();
        res.status(200).json({ message: "New user has been created", payload: savedUser });
    } catch (error) {
        res.status(500).json({ error: errorHandler(error) });
        console.log("Error:",error);
    }
};

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const foundUser = await User.findOne({ username: username });
        if (foundUser === null) throw { message: "username not found" };

        const comparedPassword = await bcrypt.compare(password, foundUser.password);
        if (!comparedPassword) throw { message: "username and Password do not match" };

        // const jwtToken = jwt.sign({
        //     firstName: foundUser.firstName,
        //     lastName: foundUser.lastName,
        //     email: foundUser.email,
        //     username: foundUser.username,
        // }, process.env.SECRET_KEY, { expiresIn: "1yr" });
        res.status(200).json({ payload: foundUser });
    } catch (error) {
        res.status(500).json({ payload: error.message });
    }
};

const updateTheProfile = async (req, res) => {
    try {
        const decodedToken = res.locals.decodedToken;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const updatedUser = await User.findOneAndUpdate({ email: decodedToken.email }, req.body, { new: true });
        res.status(200).json({ message: "Updated User", payload: updatedUser });
    } catch (error) {
        res.status(500).json({ error: errorHandler(error) });
        console.log(error);
    }
};

module.exports = {
    createUser,
    userLogin,
    getCurrentUser,
    updateTheProfile
}