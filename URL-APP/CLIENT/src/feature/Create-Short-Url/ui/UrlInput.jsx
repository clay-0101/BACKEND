import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const UrlInput = ({getUrlData,setCurrentUlr}) => {
    const [longUrl, setLongUrl] = useState('')
    async function sendLongUrl(){

        let response = await axios.post("http://localhost:5173/api/url",{
            url : longUrl
           
        })
        setCurrentUlr({
            shortCode : response.data.data.shortCode,
            originalUrl : response.data.data.originalUrl
        })

         getUrlData()
    }
    return (
        <div className='flex gap-3 p-2 w-full max-w-4xl  border border-neutral-200'>
            <input 
            value={longUrl}
            onChange={(e)=>{
                setLongUrl(e.target.value)
            }}
            className='w-full outline-none  p-3.5 rounded' 
            type="url" placeholder='Enter Long Url' />
            <button 
            onClick={()=>{
                sendLongUrl()
            }}
            className='bg-orange-500 active:scale-95 text-white p-1.5 rounded'>Shorten</button>
        </div>
    )
}

export default UrlInput