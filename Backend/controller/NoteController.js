const noteModel = require('../model/NoteModel');

const saveNote = async (req, res) => {
    const {userId, title, content, color} = req.body;

    const newNote = new noteModel({
        userId, title, content, color
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const searchNote = async (req, res) => {
    try {
        const notes = await noteModel.find({userId: req.params.userId});
        res.json(notes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const updateNote = async (req, res) => {
    try {
        const updatedNote = await noteModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const deleteNote = async (req, res) => {
    try {
        await noteModel.findByIdAndDelete(req.params.id);
        res.json({message: 'Note deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({userId: req.params.userId});
        res.json(notes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {saveNote, searchNote, updateNote, deleteNote, getAllNotes};