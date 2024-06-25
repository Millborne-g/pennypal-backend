// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/user/register', userController.registerUser);

//Get all users
router.get('/user/users', userController.getAllUsers);

// Login user
// router.get("/user/login/:email/:password", userController.loginUser);
router.post("/user/login", userController.loginUser);

// Find a user by email
router.get('/users/:email', userController.findUserByEmail);

module.exports = router;
