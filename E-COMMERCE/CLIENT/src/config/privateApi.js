import { useDispatch, useSelector } from "react-redux"
import { createApi } from "./axios"
import { setAuth } from "../features/auth/state/authSlice"
import publicApi from "./publicApi"

export const usePrivateApi = () => {
    let accessToken = useSelector((state) => state.auth.accessToken)
    let api = createApi()
    let dispatch = useDispatch()


    api.interceptors.request.use((config) => {

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`

        }
        return config
    },
        (error) => {
            return Promise.reject(error)
        }
    )



    api.interceptors.response.use(
        (response) => {
            return response
        },
        async (error) => {

            if (error.response?.status === 401 && !error.config._retry) {

                error.config._retry = true

                try {
                    const response = await publicApi.post("/auth/refresh-token")

                

                    dispatch(setAuth({
                        user: response.data.data.user,
                        accessToken: response.data.accessToken
                    }))
                    error.config.headers.Authorization = `Bearer ${response.data.accessToken}`

                    return api(error.config)

                } catch (refreshError) {

                    return Promise.reject(refreshError)
                }
            }
            return Promise.reject(error)
        }
    )

    return api
}