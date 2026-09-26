import React, { use, useState } from 'react'
import { Plus, User, LogOut } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useLogoutApi } from '../features/auth/api/authApi'
import toast from 'react-hot-toast'
import useAuth from '../features/auth/hooks/authHook'

const Navbar = () => {

let { user,showInfo, setShowInfo,handleLogout , navigate} = useAuth()
  
  return (
    <nav className='fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#7572705e] px-6 py-4 backdrop-blur-md sm:px-10'>
      <span className='font-serif text-2xl text-white'>Stitchery</span>

      <div className='flex items-center gap-3'>
        <button
          onClick={() => {
            if (!user) {
              navigate("/login")
            }
          }}
          className='flex items-center gap-2 bg-white/90 px-4 py-2 text-sm font-medium text-[#161512] transition-colors hover:bg-white'>
          <Plus size={16} />
          <span className='hidden sm:inline'>Create product</span>
        </button>

        <div className='h-5 w-px bg-white/20' />

        <div className='relative'>
          <button
            onClick={() => setShowInfo((prev) => !prev)}
            title='Account'
            className='flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 hover:border-white/50 hover:text-white'
          >
            {user ? <span className='text-sm'>{user.name[0]}</span> : <User size={18} />}
          </button>

          {showInfo && (
            <div className='absolute right-0 top-full mt-2 whitespace-nowrap border border-white/15 bg-[#161512] px-4 py-2 text-sm text-white'>
              {user ? user.name : "Guest"}
            </div>
          )}
        </div>

        {user ? (
          <button
            onClick={handleLogout}
            title='Logout'
            className='flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 hover:border-white/50 hover:text-white'
          >
            <LogOut size={18} />
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login")
            }}
            title='Login'
            className='flex items-center justify-center border border-white/25 px-4 py-2 text-sm text-white/80 transition-transform hover:border-white/50 hover:text-white active:scale-95'
          >
            Login
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar