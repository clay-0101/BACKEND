import { MoveLeft } from 'lucide-react'
import React from 'react'
import { usePrivateApi } from '../../../config/privateApi'
import useProduct from '../hooks/productHook'
import { setProducts, setShowForm } from '../state/productSlice'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import publicApi from '../../../config/publicApi'
import useAuth from '../../auth/hooks/authHook'

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]

const CreateProductForm = () => {
    let { register, handleSubmit, reset, formState: { errors } } = useForm()
    let { dispatch, createProduct } = useProduct()
    let {fetchProducts} = useAuth()


    let { mutate: handleCreateProduct, isPending } = useMutation({
        mutationFn: (dataToSubmit) => createProduct(dataToSubmit),
        onSuccess: async () => {
            await fetchProducts()
            dispatch(setShowForm(false))
        }
    })
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-10 sm:px-8'>
            {isPending && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-white text-sm">Creating product...</p>
                    </div>
                </div>
            )}

            <div className='w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-lg bg-white p-6 sm:p-10'>


                <button
                    onClick={() => {
                        dispatch(setShowForm(false))
                    }}
                    className='mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-700 hover:border-stone-500'>
                    <MoveLeft size={18} />
                </button>

                <h2 className='font-serif text-2xl text-[#161512]'>Create Product</h2>
                <p className='mt-1 mb-8 text-sm text-stone-500'>Add a new product to your store</p>

                <form
                    onSubmit={handleSubmit((data) => {
                        let formData = new FormData()
                        formData.append("title", data.title)
                        formData.append("description", data.description)

                        formData.append("price", JSON.stringify(data.price))
                        formData.append("sizes", JSON.stringify(data.sizes.filter((s) => s.size)))

                        Array.from(data.images).forEach((file) => {
                            formData.append("images", file)
                        })

                        handleCreateProduct(formData)

                    })}
                    className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5'>


                    <div className='space-y-5'>
                        <div>
                            <label className='mb-1 block text-sm font-medium text-stone-700'>Title</label>
                            <input
                                {...register("title", {
                                    required: "Title is required",
                                    minLength: {
                                        value: 2,
                                        message: "Minimum 2 letters are required"
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Name must be at most 100 letters"
                                    }
                                })}
                                type='text'
                                name='title'
                                placeholder='e.g. Oversized Hoodie'
                                className='w-full border border-stone-300 px-4 py-2 text-sm outline-none focus:border-stone-500'
                            />
                            {errors.title && <p className="text-[12px] text-red-500">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className='mb-1 block text-sm font-medium text-stone-700'>Description</label>
                            <textarea
                                {...register("description", {
                                    required: "Description is required",
                                    minLength: {
                                        value: 20,
                                        message: "Minimum 20 letters are required"
                                    },
                                    maxLength: {
                                        value: 500,
                                        message: "Description must be at most 500 letters"
                                    }
                                })}
                                name='description'
                                rows={5}
                                placeholder='Describe the product (min 20 characters)'
                                className='w-full resize-none border border-stone-300 px-4 py-2 text-sm outline-none focus:border-stone-500'
                            />
                            {errors.description && <p className="text-[12px] text-red-500">{errors.description.message}</p>}
                        </div>

                        <div>
                            <label className='mb-1 block text-sm font-medium text-stone-700'>Images</label>
                            <input
                                {...register("images", {
                                    required: "Images is required",
                                    validate: {
                                        minFiles: (files) => files.length >= 1 || "At least 1 images required",
                                        maxFiles: (files) => files.length <= 5 || "Maximum 5 images allowed"
                                    }
                                })}
                                type='file'
                                name='images'
                                multiple
                                accept='image/*'
                                className='w-full border border-stone-300 px-4 py-2 text-sm file:mr-3 file:border-0 file:bg-stone-100 file:px-3 file:py-1 file:text-sm'
                            />
                            {errors.images && <p className="text-[12px] text-red-500">{errors.images.message}</p>}
                        </div>

                    </div>


                    <div className='space-y-5'>
                        <div className='flex gap-3'>
                            <div className='flex-1'>
                                <label className='mb-1 block text-sm font-medium text-stone-700'>Price</label>
                                <input
                                    {...register("price.amount", {
                                        required: "Amount is required",
                                        valueAsNumber: true
                                    })}
                                    type='number'
                                    placeholder='0'
                                    className='w-full border border-stone-300 px-4 py-2 text-sm outline-none focus:border-stone-500'
                                />
                                {errors.price?.amount && <p className="text-[12px] text-red-500">{errors.price?.amount.message}</p>}
                            </div>
                            <div className='w-28'>
                                <label className='mb-1 block text-sm font-medium text-stone-700'>Currency</label>
                                <select
                                    {...register("price.currency", { required: "Currency is required" })}
                                    defaultValue="INR"
                                    className='w-full border border-stone-300 px-2 py-2 text-sm outline-none focus:border-stone-500'
                                >
                                    <option value='INR'>INR</option>
                                    <option value='USD'>USD</option>
                                </select>
                                {errors.price?.currency && <p className="text-[12px] text-red-500">{errors.price?.currency.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className='mb-2 block text-sm font-medium text-stone-700'>Sizes & Stock</label>
                            <div className='grid grid-cols-2 gap-3'>
                                {sizeOptions.map((size, idx) => (
                                    <div key={size} className='flex items-center gap-2 border border-stone-300 px-3 py-2'>
                                        <input
                                            {...register(`sizes.${idx}.size`, {
                                                required: "Size is required"
                                            })}
                                            type='checkbox' value={size} />

                                        <span className='w-8 text-sm'>{size}</span>
                                        <input
                                            {...register(`sizes.${idx}.stock`, {
                                                required: "Stock is required",
                                                valueAsNumber: true
                                            })}
                                            type='number'
                                            defaultValue={0}
                                            placeholder='Stock'
                                            min={0}
                                            className='w-full border-l border-stone-300 pl-2 text-sm outline-none'
                                        />
                                    </div>
                                ))}
                                {errors.sizes && (<p className="text-[12px] text-red-500">
                                    Please select the sizes you want. If you don’t enter stock, it will stay 0 by default and won’t be shown.
                                </p>)}
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='w-full bg-[#161512] py-3 text-sm font-medium text-white hover:bg-black'
                        >
                            Create Product
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateProductForm