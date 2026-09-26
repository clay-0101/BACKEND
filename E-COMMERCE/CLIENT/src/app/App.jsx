import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const App = () => {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <Navbar />
      <main className='h-full w-full overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  )
}

export default App