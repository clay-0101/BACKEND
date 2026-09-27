import { useNavigate, useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { usePrivateApi } from '../../../config/privateApi'
import toast from 'react-hot-toast'



const useProduct = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let products = useSelector((state) => state.products.products)
    let privateApi = usePrivateApi()




    let product = useSelector((state) => state.products.singleProduct)
    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated)


    const [mainImage, setMainImage] = useState("")
    const [selectedSize, setSelectedSize] = useState(null)



    let { id } = useParams()



    let createProduct = async (formData) => {
        try {
            let response = await privateApi.post("/products", formData)
            toast.success(response.data.message)
            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
            throw error
        }
    }

    let deleteProduct = async (id) => {
        try {
            let response = await privateApi.delete(`/products/${id}`)
            toast.success(response.data.message)
            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
            throw error
        }
    }
    

    return {
        navigate, dispatch, products,
        mainImage, setMainImage, selectedSize, setSelectedSize, product, id,
        createProduct, deleteProduct, isAuthenticated
    }
}

export default useProduct