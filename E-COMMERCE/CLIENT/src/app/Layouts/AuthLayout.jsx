import React from 'react'
import coverImg from "../../assets/cover.avif"
import { Outlet } from "react-router"


const AuthLayout = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-white'>

      <section className='hidden md:block md:w-[45%] h-64 md:h-screen'>
        <img className='h-full w-full object-cover' src={coverImg} alt="" />
      </section>

      <section className='flex-1 flex items-center justify-center px-6 py-10 md:h-screen'>
        <Outlet />
      </section>

    </div>
  )
}

export default AuthLayout