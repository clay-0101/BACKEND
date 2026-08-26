import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [allNotes, setAllNotes] = useState([])
  const [updateNoteId, setUpdateNoteId] = useState(null)

  let handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    if (updateNoteId) {
      updateNote(updateNoteId, formData)
    }
    else {
      let res = await axios.post('http://localhost:3000/diary/create', formData)
      setAllNotes([res.data.data])
    }
    getAllNotesAPI()
    setFormData({ title: '', description: '' })
  }

  let getAllNotesAPI = async () => {
    try {
      let getAllNotes = await axios.get('http://localhost:3000/diary/notes')
      setAllNotes(getAllNotes.data.data)
    } catch (error) {
      console.log('error occurs while getting all notes', error)
    }
  }
  let deleteNote = async (id) => {
    try {
      let deletedNote = await axios.delete(`http://localhost:3000/diary/delete/${id}`)
      console.log(deletedNote)
      getAllNotesAPI()
    } catch (error) {
      console.log('error occurs while delte note', error)
    }
  }
  useEffect(() => {
    getAllNotesAPI()
  }, [])

  let updateNote = async (id, credentials) => {
    try {
      let updatedNote = await axios.put(`http://localhost:3000/diary/update/${id}`, credentials)
      console.log(updatedNote.data.data)
      setUpdateNoteId(null)
    } catch (error) {
      console.log('error occurs while update the note', error)
    }
  }

  let noteForUpdate = (note) => {
    setFormData({
      title: note.title,
      description: note.description
    })
    setUpdateNoteId(note._id)
  }
  return (
    <div className='p-10 h-screen  bg-black text-white'>
      <h1 className='text-3xl mb-10'>NOTES-APP</h1>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col gap-5 border border-white p-5 w-90 rounded'>

        <input
          name='title'
          value={formData.title}
          onChange={(e) => handleChange(e)}
          className='border border-white text-white p-2.5 rounded'
          type="text" placeholder='Title' />

        <input
          name='description'
          value={formData.description}
          onChange={(e) => handleChange(e)}
          className='border text-white border-white p-2.5 rounded'
          type="text" placeholder='Description' />

        <button className='bg-blue-600 p-2 active:scale-95'>Add Note</button>
      </form>

      <div className='grid grid-cols-2 '>
        {
          allNotes.map((val) => {
            return <Note key={val._id} note={val} deleteNote={deleteNote} noteForUpdate={noteForUpdate} />
          })
        }
      </div>
    </div>
  )
}

export default App