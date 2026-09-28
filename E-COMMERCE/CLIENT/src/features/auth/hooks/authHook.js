import { loginApi, registerApi, useLogoutApi } from "../api/authApi"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { setAuth, setUserLogout } from "../state/authSlice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { useState } from "react"
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
            toast.error(error.response.data.message)
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

    const registerSubmitHandler = async (data) => {

        try {
            let response = await registerApi(data)
            toast.success(response.data.message)

            reset()

            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const loginSubmitHandler = async (data) => {

        try {
            let response = await loginApi(data)

            toast.success(response.data.message)

            dispatch(setAuth({
                user: response.data.data,
                accessToken: response.data.accessToken
            }))

            reset()
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return {
        reset, register, handleSubmit, getValues, errors,
        registerSubmitHandler, loginSubmitHandler, isAuthenticated,

        user, showInfo, setShowInfo, handleLogout, navigate, dispatch, fetchProducts
    }
}

export default useAuth