import { Link } from "react-router"

import useAuth from "../hooks/authHook"


const Register = () => {

let {register, handleSubmit, getValues, errors, registerSubmitHandler  } =  useAuth()

  return (
    <div className='w-full max-w-sm'>

      <h1 className='text-3xl font-serif tracking-wide text-black mb-1'>Stitchery</h1>
      <p className='text-sm text-gray-500 mb-8'>Create your account</p>

      <form
        onSubmit={handleSubmit(registerSubmitHandler)}
        className='flex flex-col gap-5'>

        {/* NAME  */}

        <div className='flex flex-col gap-1'>
          <label className='text-sm text-black'>Name</label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Minimum 3 letters are required"
              },
              maxLength: {
                value: 100,
                message: "Name must be at most 100 letters"
              }
            })}
            type="text"
            placeholder="Enter your name"
            className='w-full border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black'
          />
          {errors.name && <p className="text-[12px] text-red-500">{errors.name.message}</p>}
        </div>

        {/* EMAIL */}

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

        {/* PASSWORD */}

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

        {/* CONFIRM PASSWORD */}

        <div className='flex flex-col gap-1'>
          <label className='text-sm text-black'>Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Confirm you password",
              validate: (value) => value === getValues("password") || "Password do not match"

            })}
            type="password"
            placeholder="Re-enter your password"
            className='w-full border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black'
          />
          {errors.confirmPassword && <p className="text-[12px] text-red-500">{errors.confirmPassword.message}</p>}
        </div>


        <button
          type="submit"
          className='w-full bg-black text-white py-2 text-sm mt-2 hover:bg-gray-900'>
          Register
        </button>

      </form>

      <p className='text-sm text-gray-500 mt-6'>
        Already have an account?{" "}
        <Link to="/login" className='text-black underline'>
          Login here
        </Link>
      </p>

    </div>
  )
}

export default Register