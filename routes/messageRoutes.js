// routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Add a new balance
router.post('/messages/save', messageController.createMessage);

router.get('/messages/getConvo', messageController.getMessageByConvo);

module.exports = router;

