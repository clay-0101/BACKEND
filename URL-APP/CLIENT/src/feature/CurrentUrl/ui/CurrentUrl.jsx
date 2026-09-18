import React from 'react'

const CurrentUrl = ({currentUlr}) => {
  return (
   currentUlr &&  <div className='flex justify-between items-center border border-neutral-200 py-2 px-5 w-full max-w-4xl '>
        <p className='text-orange-500 underline'>{`http://localhost:5173/api/open/${currentUlr.shortCode}`}</p>
        <button className='bg-orange-500 text-white p-3 rounded'>Copy</button>
    </div>
  )
}

export default CurrentUrl