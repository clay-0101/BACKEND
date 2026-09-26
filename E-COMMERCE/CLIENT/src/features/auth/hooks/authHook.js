import { loginApi, registerApi, useLogoutApi } from "../api/authApi"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { setAuth } from "../state/authSlice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { useState } from "react"


const useAuth = () => {
    let { reset, register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: "onChange" })
    let dispatch = useDispatch()
   let navigate = useNavigate()

 let logoutApi = useLogoutApi()

  const user = useSelector((state) => state.auth.user)
  const [showInfo, setShowInfo] = useState(false)

 
  const handleLogout = async () => {
    try {
      let response = await logoutApi()
      toast.success(response.data.message)
      navigate("/login")
    } catch (error) {
      toast.error(error.response.data.message)
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
        registerSubmitHandler, loginSubmitHandler,

        user,showInfo, setShowInfo,handleLogout , navigate
    }
}

export default useAuth