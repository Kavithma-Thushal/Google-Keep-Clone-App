const express = require('express');
const router = express.Router();
const noteController = require('../controller/NoteController');

router.post('/save', noteController.saveNote);
router.get('/search/:userId', noteController.searchNote);
router.put('/update/:id', noteController.updateNote);
router.delete('/delete/:id', noteController.deleteNote);
router.get('/getAll', noteController.getAllNotes);

module.exports = router;