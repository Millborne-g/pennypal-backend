// controllers/userController.js

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWTSECRET, { expiresIn: "2m" });
};

// Controller to register a new user
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error.code);
        res.status(500).json({
            message: "Internal Server Error",
            code: error.code,
        });
    }
};

// Controller to register a new user
exports.registerUser = async (req, res) => {
    const { email, password, fullName, firstName, lastName, userImage } =
        req.body;
    try {
        const newUser = new User({
            email,
            password,
            fullName,
            firstName,
            lastName,
            userImage,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error.code);
        res.status(500).json({
            message: "Internal Server Error",
            code: error.code,
        });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.params;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            res.status(404).json({ message: "user not found!" });
        }
        // create a token
        const token = createToken(user._id);
        res.json({ user, token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.findUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
