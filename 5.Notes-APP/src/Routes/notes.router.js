const express = require('express')
const { createNoteController,
    fetchAllNoteController,
    updateNoteController,
    deleteNoteController,
    fetchSingleNoteController } = require('../controller/notes.controller')

let router = express.Router()

router.post('/create', createNoteController)
router.get('/notes', fetchAllNoteController)
router.get('/note/:id', fetchSingleNoteController)
router.put('/update/:id', updateNoteController)
router.delete('/delete/:id', deleteNoteController)


module.exports = router