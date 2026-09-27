import { useEffect } from 'react'
import { MoveLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import useProduct from '../features/products/hooks/productHook'
import { useSingleProductApi } from '../features/products/api/productApis'
import { useMutation } from '@tanstack/react-query'
import useAuth from '../features/auth/hooks/authHook'


export default function ProductDetailPage() {


    let { mainImage, setMainImage, selectedSize, setSelectedSize, product, id, dispatch, navigate, deleteProduct, isAuthenticated } = useProduct()
    let getProduct = useSingleProductApi()
    let { fetchProducts } = useAuth()
    useEffect(() => {

        getProduct(id)

    }, [id, dispatch])


    useEffect(() => {
        if (product?.images?.length > 0) {
            setMainImage(product.images[0].url)
        }
    }, [product])


    let { mutate: handleDelete, isPending } = useMutation({
        mutationFn: () =>   deleteProduct(id),
        onSuccess: async() => {
            await fetchProducts()
            navigate('/products')
        }
    })

    if (!product) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                Loading...
            </div>
        )
    }

    return (
        <div className='pt-3 px-4 sm:px-6 md:px-10 pb-5 w-full'>
            {/* Loading */}
            {isPending && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-white text-sm">Deleting product...</p>
                    </div>
                </div>
            )}

            <button
                onClick={() => navigate("/products")}
                className='border border-stone-500 p-2 md:p-3 cursor-pointer rounded-full mb-6'>
                <MoveLeft className='w-4 h-4 md:w-5 md:h-5' />
            </button>

            <div className='flex flex-col md:flex-row gap-6 md:gap-10'>


                <div className='md:w-1/4'>
                    <h1 className='text-xl md:text-2xl font-bold mb-4'>{product.title}</h1>
                    <p className='text-sm font-semibold border-b border-stone-300 pb-2'>Product Info</p>
                    <p className='text-stone-600 text-sm mt-3'>{product.description}</p>
                </div>


                <div className='md:w-[40%]'>
                    {mainImage && <img
                        src={mainImage}
                        alt={product.title}
                        className='w-full h-[320px] sm:h-[420px] md:h-[650px] object-contain rounded-lg'
                    />}
                </div>


                <div className='md:w-1/4'>
                    <div className='flex gap-3 mb-6'>
                        {product.images.map((img) => (
                            <img
                                key={img.fileId}
                                src={img.url}
                                alt={product.title}
                                onClick={() => setMainImage(img.url)}
                                className={`w-14 h-16 md:w-16 md:h-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === img.url ? "border-stone-800" : "border-transparent"
                                    }`}
                            />
                        ))}
                    </div>

                    <p className='font-semibold mb-2'>Choose Size</p>
                    <div className='flex flex-wrap gap-3'>
                        {product.sizes.map((s) => (
                            <button
                                key={s.size}
                                disabled={s.stock === 0}
                                onClick={() => setSelectedSize(s.size)}
                                className={`w-11 h-11 md:w-12 md:h-12 rounded-full border text-sm
                                    ${s.stock === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                                    ${selectedSize === s.size ? "bg-stone-900 text-white" : "border-stone-400"}
                                `}
                            >
                                {s.size}
                            </button>
                        ))}
                    </div>

                    <p className='text-2xl md:text-3xl font-bold mt-8'>
                        {product.price.currency} {product.price.amount}
                    </p>

                    <button
                        onClick={() => {
                            toast.error("Functionality not implemented yet")
                        }}
                        className='w-full mt-6 px-10 py-3 bg-stone-900 text-white rounded-full'>
                        Add to Cart
                    </button>

                    <div className='mt-10 flex gap-2.5 pt-2 '>
                        <button
                            onClick={() => onEdit?.(product)}
                            className='flex flex-1 items-center cursor-pointer  justify-center gap-1.5 border border-stone-900 py-2 text-xs font-medium text-stone-900 hover:bg-stone-900 hover:text-stone-300'
                        >
                            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-3.5 w-3.5'>
                                <path d='M12 20h9' />
                                <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
                            </svg>
                            Update
                        </button>
                        <button
                            onClick={() => {
                                if (isAuthenticated) {
                                    handleDelete()
                                } else {
                                    toast.error("Access limited to signed‑in users")
                                }

                            }}
                            className='flex flex-1 items-center cursor-pointer  justify-center gap-1.5 border border-stone-200 py-2 text-xs font-medium text-[#c83a3a] hover:bg-[#c83a3a] hover:text-stone-300'
                        >
                            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-3.5 w-3.5'>
                                <polyline points='3 6 5 6 21 6' />
                                <path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6' />
                                <path d='M10 11v6' />
                                <path d='M14 11v6' />
                                <path d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}