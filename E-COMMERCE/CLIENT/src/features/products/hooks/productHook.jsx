import { useNavigate, useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { usePrivateApi } from '../../../config/privateApi'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import useAuth from '../../auth/hooks/authHook'
import { setEditProduct, setShowForm, setSingleProduct } from '../state/productSlice'



const useProduct = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let privateApi = usePrivateApi()
    let { fetchProducts } = useAuth()
    let products = useSelector((state) => state.products.products)
    let product = useSelector((state) => state.products.singleProduct)
    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    let isEditProdcut = useSelector((state) => state.products.editProduct)



    let { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: isEditProdcut || undefined
    })


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
    
    let updateProduct = async (updatedFormData) => {
        try {
            let response = await privateApi.put(`/products/${id}`, updatedFormData)
            dispatch(setSingleProduct(response.data.data.updatedProduct))
            toast.success(response.data.message)
            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }


    // create product mutation
    let { mutate: handleCreateProduct, isPending } = useMutation({
        mutationFn: (dataToSubmit) => createProduct(dataToSubmit),
        onSuccess: async () => {
            await fetchProducts()
            dispatch(setShowForm(false))
            dispatch(setSingleProduct(null)) //if user on detialpage so i reset the singleProductData coz if i navigate again to the detailpage then it loads direct new product not chagne the old to new data
            navigate('/products')

        }
    })

    //update mutation
    let { mutate: handleUpdateProduct, isPending: isUpdating } = useMutation({
        mutationFn: (dataToSubmit) => updateProduct(dataToSubmit),
        onSuccess: async () => {
            dispatch(setShowForm(false))
        }
    })

    const dataSubmitHandler = (data) => {
        const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]
        let selectedSizes = data.sizes
            .map((s, idx) => ({ size: sizeOptions[idx], stock: s.stock, checked: !!s.size }))
            .filter((s) => s.checked && s.stock > 0)
            .map(({ size, stock }) => ({ size, stock }))

        if (selectedSizes.length === 0) {
            toast.error("Please select at least one size with stock")
            return
        }

        let formData = new FormData()

        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("price", JSON.stringify(data.price))
        formData.append("sizes", JSON.stringify(selectedSizes))

        Array.from(data.images).forEach((file) => {
            formData.append("images", file)
        })

        if (isEditProdcut) {
            handleUpdateProduct(formData)

        } else {
            handleCreateProduct(formData)
        }
        reset()
    }

    const updateDataHandler = () => {
        dispatch(setEditProduct({
            title: product?.title || "",
            description: product?.description || "",
            images: product?.images ? product.images.map((img) => (typeof img === 'object' ? img.url : img)) : [],
            price: {
                amount: product?.price?.amount || undefined,
                currency: product?.price?.currency || "INR"
            },
            sizes: product?.sizes || []
        }))
        dispatch(setShowForm(true))
    }


    return {
        navigate, dispatch, products,
        mainImage, setMainImage, selectedSize, setSelectedSize, product, id,
        createProduct, deleteProduct, isAuthenticated,

        dataSubmitHandler, isPending, register, handleSubmit, errors, updateDataHandler, isEditProdcut
        , isUpdating
    }
}

export default useProduct