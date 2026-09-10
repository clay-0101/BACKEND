import React from "react";
import { useForm } from 'react-hook-form'
import { useApi } from "../api/api";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
    let { handleSubmit, register, reset, formState: { errors } } = useForm({
        mode: "onChange"
    })
    let api = useApi()
    let auth = useAuth()

    let submitHandleFnx = async (data) => {

        try {
            let res = await api.post('/register', data)

            console.log(data)

        } catch (error) {
            console.log(error?.message || "registration failed")
        }
        reset()
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(submitHandleFnx)}
                className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <input
                    {...register('name', {
                        required: "Name is required..",
                        minLength: {
                            value: 3,
                            message: "Minimum 3 letter are required.."
                        }
                    })}
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-black"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

                <input
                    {...register('email', {
                        required: "Email is required..",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                            message: "Invalid email format"
                        }
                    })}
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-black"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

                <input
                    {...register('password', {
                        required: "Password is required..",
                        minLength: {
                            value: 6,
                            message: "Minimum 6 letter password required.."
                        }
                    })}
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 outline-none focus:border-black"
                />

                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

                <button
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
