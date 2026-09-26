import axios from "axios";

const axiosConfig = {
    baseURL : "http://localhost:5173/api",
    withCredentials : true
}

export const createApi = () => {
    return axios.create(axiosConfig)
}