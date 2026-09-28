import { MoveLeft } from 'lucide-react'
import ProductCard from '../features/products/ui/ProductCard'
import { setProducts } from '../features/products/state/productSlice'
import publicApi from '../config/publicApi'
import useProduct from '../features/products/hooks/productHook'
import { useEffect } from 'react'
import useAuth from '../features/auth/hooks/authHook'



const ProductsPage = () => {

    let { navigate, dispatch, products } = useProduct()
    let {fetchProducts} = useAuth()

    useEffect(() => {
        fetchProducts()
    }, [dispatch])


    return (
        <div className='min-h-0 '>
            <div className='px-6 sm:px-10'>
                <button
                    onClick={() => {
                        navigate("/")
                    }}
                    className='border cursor-pointer border-stone-500 mt-3 p-2 md:p-3 rounded-full mb-3'>
                    <MoveLeft />
                </button>
                <h1 className='font-serif text-3xl text-stone-900'>Products</h1>
            </div>

            {products?.length === 0 ? (
                <div className='flex flex-col items-center justify-center px-6 py-24 text-center sm:px-10'>
                    <h2 className='font-serif text-2xl text-stone-900'>No products yet</h2>
                    <p className='mt-2 max-w-md text-stone-500'>
                        It's empty here. There are no products right now. Click the
                        "Create Product" button in the navbar to add your first product.
                    </p>
                </div>
            ) : (
                <div className='grid grid-cols-1 gap-7 px-6 py-8 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 '>
                    {products?.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductsPage