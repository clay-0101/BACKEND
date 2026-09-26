import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const App = () => {
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden'>
      <Navbar />
      <main className='min-h-0 flex-1'>
        <Outlet />
      </main>
    </div>
  )
}

export default App