import toast from "react-hot-toast"
import useProduct from "../hooks/productHook"
import publicApi from "../../../config/publicApi"
import { setSingleProduct } from "../state/productSlice"
import { usePrivateApi } from "../../../config/privateApi"

export const useSingleProductApi = (id) => {
    let { dispatch, navigate} = useProduct()

    let getProduct = async(id) => {
        try {

            let response = await publicApi.get(`/products/${id}`)
            dispatch(setSingleProduct(response.data.data.product))

        } catch (error) {
            navigate("/products")
            toast.error(error.response.data.message)
        }
    }

    return getProduct
}
