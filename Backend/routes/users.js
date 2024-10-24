const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) return res.status(400).json({message: 'User already exists'});

    const newUser = new User({username, email, password});

    try {
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router;