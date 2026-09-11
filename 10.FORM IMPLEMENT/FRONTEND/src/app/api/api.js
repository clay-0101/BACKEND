import axios from 'axios'
import { useAuth } from '../../context/AuthContext'



export const useApi = () => {


    const api = axios.create({
        baseURL: 'http://localhost:5173/api',
        withCredentials: true
    })
    const { accessToken } = useAuth()


    api.interceptors.request.use(
        (config) => {

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }

            return config
        },
        (error) => {
            return promise.reject(error)
        }
    )

    return api

}