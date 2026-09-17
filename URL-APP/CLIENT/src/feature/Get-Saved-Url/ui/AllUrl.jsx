import  {useState, useEffect } from 'react'
import axios from 'axios'

const AllUrl = ({urlData}) => {


    return (
        <div className='w-full max-w-4xl p-2 flex-col gap-2'>
            {urlData.map(url => {
                return <div key={url._id} className='border border-neutral-200 p-2 flex gap-8 justify-evenly items-center'  >
                    <a href={`${url.originalUrl}`} target='_blank'>{url.shortCode}</a>
                    <p className='truncate'>{url.originalUrl}</p>
                    <p >{url.clicks}</p>

                    <div className='flex gap-3'>
                        <button className='bg-orange-500 text-white p-1.5 rounded'>Copy</button>
                        <button className='bg-orange-500 text-white p-1.5 rounded'>Delete</button>
                    </div>
                </div>
            })}
        </div>
    )
}

export default AllUrl