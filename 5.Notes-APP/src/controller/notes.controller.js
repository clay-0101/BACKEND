const noteModel = require("../model/note.model")

// CREATE
let createNoteController = async (req, res) => {
    try {
        let { title, description } = req.body
        let newNote = await noteModel.create({
            title,
            description
        })

        return res.status(201).json({
            message: "Note created Successfully...",
            data: newNote
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Interal Server Error'
        })
    }
}
// READ 

// 1.) All
let fetchAllNoteController = async (req, res) => {
    try {
        let allNotes = await noteModel.find()
        return res.status(200).json({
            message: "All Notes Fetched..",
            data: allNotes
        })
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error : ${error}`
        })
    }
}
// 2.) Single
let fetchSingleNoteController =  async(req , res)=>{
    try {
      let id = req.params.id
      let singleNote = await noteModel.findById(id)  
      return res.status(200).json({
        message : "Note fetched",
        data : singleNote
      })
    } catch (error) {
        return res.status(500).json({
            message : `Internal Server Error : ${error}`
        })
    }
}
// UPDATE

let updateNoteController = async (req, res) => {
    try {
        let id = req.params.id
        let body = req.body

        let updatedNote = await noteModel.findByIdAndUpdate(id, body, {
            new: true
        })
        return res.status(200).json({
            message: "Updated Note..",
            data: updatedNote
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Interal Server Error'
        })
    }
}

// DELETE

let deleteNoteController = async(req , res)=>{
    try {
      let id = req.params.id
      let deletedNote = await noteModel.findByIdAndDelete(id)  
      return res.status(200).json({
        message : "Note Deleted Successfully..",
        data : deletedNote
      })
    } catch (error) {
        return res.status(500).json({
            message : `Internal Server Error : ${error}`
        })
    }
}



module.exports = {
    createNoteController,
    fetchAllNoteController,
    fetchSingleNoteController,
    updateNoteController,
    deleteNoteController
}