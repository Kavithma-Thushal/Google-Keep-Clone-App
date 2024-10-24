const userModel = require('../model/UserModel');

const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({email});
    if (existingUser) return res.status(400).json({message: 'User already exists'});

    const newUser = new userModel({username, email, password});

    try {
        await newUser.save();
        res.status(201).json({message: 'User registered successfully!'});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

module.exports = {registerUser};