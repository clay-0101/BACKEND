import React from 'react'

const Note = ({note, deleteNote, noteForUpdate}) => {
    
  return (
    <div className='mt-10 flex flex-col gap-5 border border-white p-5 w-90 rounded'>
        <h1>{note.title}</h1>
        <p>{note.description.length <= 20 ? note.description : note.description.substring(0,19)}</p>
        <div className='flex gap-3 justify-between'>
            <button
            onClick={()=>noteForUpdate(note)}
             className='bg-green-600 px-3 py-2 active:scale-95'>Update</button>
            <button
            onClick={()=> deleteNote(note._id)}
             className='bg-red-600 px-3 py-2 active:scale-95'>Delete</button>
        </div>
    </div>
  )
}

export default Note