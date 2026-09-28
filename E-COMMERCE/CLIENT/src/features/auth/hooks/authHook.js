import { loginApi, registerApi, useLogoutApi } from "../api/authApi"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { setAuth, setUserLogout } from "../state/authSlice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { setProducts } from "../../products/state/productSlice"
import publicApi from "../../../config/publicApi"


const useAuth = () => {
    let { reset, register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: "onChange" })
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let logoutApi = useLogoutApi()

    const user = useSelector((state) => state.auth.user)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const [showInfo, setShowInfo] = useState(false)


    const handleLogout = async () => {
        try {
            let response = await logoutApi()
            dispatch(setUserLogout())
            toast.success(response.data.message)
            navigate("/login")
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    const fetchProducts = async () => {
        try {
            let response = await publicApi.get("/products")
            dispatch(setProducts(response.data.data.products))
            return response.data
        } catch (error) {
            console.log("failed to fetch products")
            dispatch(setProducts([]))
        }
    }

    // ---- REGISTER mutation ----
    let { mutate: handleRegister, isPending: isRegisterPending } = useMutation({
        mutationFn: (data) => registerApi(data),
        onSuccess: (response) => {
            toast.success(response.data.message)
            reset()
            navigate("/login")
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    })

    // ---- LOGIN mutation ----
    let { mutate: handleLogin, isPending: isLoginPending } = useMutation({
        mutationFn: (data) => loginApi(data),
        onSuccess: (response) => {
            toast.success(response.data.message)
            dispatch(setAuth({
                user: response.data.data,
                accessToken: response.data.accessToken
            }))
            reset()
            navigate("/")
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    })

    const registerSubmitHandler = (data) => {
        handleRegister(data)
    }

    const loginSubmitHandler = (data) => {
        handleLogin(data)
    }

    return {
        reset, register, handleSubmit, getValues, errors,
        registerSubmitHandler, loginSubmitHandler, isAuthenticated,

        user, showInfo, setShowInfo, handleLogout, navigate, dispatch, fetchProducts,

        isLoginPending, isRegisterPending
    }
}

export default useAuth