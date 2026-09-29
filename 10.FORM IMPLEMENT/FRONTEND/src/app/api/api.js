// import axios from 'axios'
// import { useAuth } from '../../context/AuthContext'



// export const useApi = () => {


//     const api = axios.create({
//         baseURL: 'http://localhost:5173/api',
//         withCredentials: true
//     })
//     const { accessToken } = useAuth()


//     api.interceptors.request.use(
//         (config) => {

//             if (accessToken) {
//                 config.headers.Authorization = `Bearer ${accessToken}`
//             }

//             return config
//         },
//         (error) => {
//             return promise.reject(error)
//         }
//     )

//     return api

// }



import { useDispatch, useSelector } from "react-redux"
import { createApi } from "./axios"
import { setAuth } from "../features/auth/state/authSlice"
import publicApi from "./publicApi"

const usePrivateApi = () => {

    // Redux se current access token nikal rahe hain
    let accessToken = useSelector((state) => state.auth.accessToken)

    // Private API ka Axios instance bana rahe hain
    let api = createApi()

    // Redux state ko update karne ke liye dispatch
    let dispatch = useDispatch()


    // REQUEST INTERCEPTOR
    // Request backend par jaane se PEHLE chalega
    api.interceptors.request.use(

        // config = jis request ko hum bhej rahe hain uski information
        (config) => {

            // Agar access token available hai
            if (accessToken) {

                // Request ke Authorization header me token laga do
                config.headers.Authorization = `Bearer ${accessToken}`
            }

            // Modified request ko backend ki taraf bhej do
            return config
        },

        // Agar request interceptor me hi koi error aa jaye
        (error) => {

            // Error ko aage reject kar do
            return Promise.reject(error)
        }
    )


    // RESPONSE INTERCEPTOR
    // Backend se response aane KE BAAD chalega
    api.interceptors.response.use(

        // Agar response successful hai
        (response) => {

            // Response ko normally return kar do
            return response
        },

        // Agar backend se error response aaye
        async (error) => {

            // Check karo kya 401 Unauthorized hai
            // Aur kya ye request pehle retry nahi hui
            if (error.response?.status === 401 && !error.config._retry) {

                // Is request ko retry hua mark kar do
                // Taaki dobara 401 aaye toh infinite loop na bane
                error.config._retry = true

                try {

                    // Refresh token cookie ke through
                    // new access token lene ke liye request bhejo
                    const response = await publicApi.post("/auth/refresh-token")

                    // Backend se new access token nikalo
                    let newAccessToken = response.data.accessToken

                    // Backend se updated user nikalo
                    let user = response.data.data.user


                    // New token aur user ko Redux me save karo
                    dispatch(setAuth({
                        user: user,
                        accessToken: newAccessToken
                    }))


                    // Jo request fail hui thi
                    // uske header me new access token lagao
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`


                    // Ab wahi FAILED request ko
                    // new access token ke saath dobara bhejo
                    return api(error.config)

                } catch (refreshError) {

                    // Agar refresh token bhi fail ho gaya
                    // toh error ko aage bhej do
                    return Promise.reject(refreshError)
                }
            }

            // Agar 401 nahi hai
            // ya request already retry ho chuki hai
            // toh original error return karo
            return Promise.reject(error)
        }
    )


    // Ye Axios instance return kar do
    return api
}

export default usePrivateApi