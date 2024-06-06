// controllers/userController.js

const Message = require('../models/messageModel');

exports.createMessage = async (req, res) => {
    const { content, senderEmail, recipientEmail } = req.body;

    try {
        const newMessage = await Message.create({ content, senderEmail, recipientEmail });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getMessageByConvo = async (req, res) => {
    const { senderEmail, recipientEmail } = req.query;
    
    try {
        const messages = await Message.find({
            $or: [
                { senderEmail, recipientEmail },
                { senderEmail: recipientEmail, recipientEmail: senderEmail }
            ]
        });
        res.json(messages);
    } catch (error) {   
        console.error('Error fetching messages by conversation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};