import React from "react";
import {useForm} from 'react-hook-form'

const Register = () => {
    let {handleSubmit, register , reset , formState : {errors} } = useForm()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-black"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-black"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 outline-none focus:border-black"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-5 pt-4 border-t border-gray-200">
          Already registered?{" "}
          <a href="/login" className="text-black font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
