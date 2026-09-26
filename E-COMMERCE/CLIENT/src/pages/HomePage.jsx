import React from 'react'
import homeImg from "../assets/home.png"
import { useNavigate } from 'react-router'
import publicApi from '../config/publicApi'


const HomePage = () => {
 let navigate =  useNavigate()

  return (
    <div className='h-full w-full'>
      <section className='relative h-full w-full'>
        <div className='h-full w-full'>
          <img className='h-full w-full object-cover' src={homeImg} alt="Stitchery collection" />
        </div>

     
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
        <div className='absolute inset-0 flex flex-col items-start justify-end px-8 pb-20 sm:px-14 sm:pb-24'>
          <span className='mb-3 text-xs tracking-wide text-white/70'>
            New arrivals
          </span>
          <h1 className='max-w-xl font-serif text-4xl leading-tight text-white sm:text-6xl'>
            Clothing made to be worn, not just owned.
          </h1>
          <p className='mt-4 max-w-md text-sm text-white/80 sm:text-base'>
            Everyday pieces cut from honest fabric, built to hold their shape wash after wash.
          </p>
          <button 
          onClick={()=>{
            navigate("/products")
          }}
          className='mt-8 bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90'>
            Shop the collection
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage