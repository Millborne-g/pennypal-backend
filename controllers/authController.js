const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// https://github.com/gitdagray/mern_stack_course/blob/main/lesson_08-backend/controllers/authController.js
// Get auth
// access token
// exports.login = 