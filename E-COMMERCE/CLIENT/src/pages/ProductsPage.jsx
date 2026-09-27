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
        <div className='min-h-0 bg-stone-50'>
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

            <div className='grid grid-cols-1 gap-7 px-6 py-8 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 '>
                {products?.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onEdit={(p) => console.log("edit", p)}
                        onDelete={(p) => console.log("delete", p)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductsPage