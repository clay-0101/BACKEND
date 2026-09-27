
import { usePrivateApi } from "../../../config/privateApi"
import publicApi from "../../../config/publicApi"




export const registerApi = async (data) => {

    let response = await publicApi.post("/auth/register", data)

    return response
}

export const loginApi = async (data) => {

    let response = await publicApi.post("/auth/login", data)

    return response
}

export const useLogoutApi = () => {
    let privateApi = usePrivateApi()

    const logout = async () => {
        try {
            let response = await privateApi.post("/auth/logout")
            return response
        } catch (error) {
            console.log(error)
        }
    }

    return logout
}