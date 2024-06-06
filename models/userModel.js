// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userImage: {
    type: String, // You can store the image URL or use other methods to handle images
  },
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
