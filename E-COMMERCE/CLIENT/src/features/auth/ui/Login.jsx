import React from 'react'

import { Link } from "react-router"
import useAuth from '../hooks/authHook'

const Login = () => {
 let { register, handleSubmit, errors ,loginSubmitHandler} = useAuth()
  return (
    <div className='w-full max-w-sm'>

      <h1 className='text-3xl font-serif tracking-wide text-black mb-1'>Stitchery</h1>
      <p className='text-sm text-gray-500 mb-8'>Login to your account</p>

      <form
      onSubmit={handleSubmit(loginSubmitHandler)}
       className='flex flex-col gap-5'>

        <div className='flex flex-col gap-1'>
          <label className='text-sm text-black'>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format"
              }
            })}
            type="email"
            placeholder="Enter your email"
            className='w-full border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black'
          />
          {errors.email && <p className="text-[12px] text-red-500">{errors.email.message}</p>}
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm text-black'>Password</label>
          <input
            {...register("password", {
              required: "Password is reqired",
              minLength: {
                value: 6,
                message: "Password must be at least 6 character"
              }
            })}
            type="password"
            placeholder="Enter your password"
            className='w-full border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black'
          />
          {errors.password && <p className="text-[12px] text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className='w-full bg-black text-white py-2 text-sm mt-2 hover:bg-gray-900'
        >
          Login
        </button>

      </form>

      <p className='text-sm text-gray-500 mt-6'>
        Don't have an account?{" "}
        <Link to="/register" className='text-black underline'>
          Register here
        </Link>
      </p>

    </div>
  )
}

export default Login