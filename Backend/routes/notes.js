const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// Get all notes for a user
router.get('/notes/:userId', async (req, res) => {
    try {
        const notes = await Note.find({userId: req.params.userId});
        res.json(notes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Create a new note
router.post('/notes', async (req, res) => {
    const {userId, title, content, color} = req.body;

    const newNote = new Note({
        userId,
        title,
        content,
        color
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Update a note
router.put('/notes/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Delete a note
router.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({message: 'Note deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;