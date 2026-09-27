import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import CreateProductForm from '../features/products/ui/CreateProductForm'

const App = () => {
let showFrom =  useSelector((state)=>state.products.showForm)
  return (
    <div className='h-screen w-screen overflow-hidden flex flex-col'>
      <Navbar />
      <main className='flex-1 w-full overflow-y-auto scrollbar-thin'>
        <Outlet />
      </main>
      {showFrom && <CreateProductForm/> }
    </div>
  )
}

export default App