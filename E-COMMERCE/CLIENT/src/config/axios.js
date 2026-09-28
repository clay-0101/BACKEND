import axios from "axios";

const axiosConfig = {
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5173/api",
    withCredentials: true
}

export const createApi = () => {
    return axios.create(axiosConfig)
}