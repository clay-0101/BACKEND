import React, { useEffect } from 'react'
import { MoveLeft } from 'lucide-react'

import ProductCard from '../features/products/ui/ProductCard'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts } from '../features/products/state/productSlice'
import publicApi from '../config/publicApi'


const dummyProducts = [
    {
        _id: "1",
        title: "Oversized Hoodie",
        description: "Heavyweight cotton fleece with a dropped shoulder and relaxed fit, brushed soft on the inside for everyday wear.",
        images: [{ url: "https://placehold.co/400x400/4A473F/FAF9F6?text=Hoodie", fileId: "img1" }],
        price: { amount: 2499, currency: "INR" },
        sizes: [
            { size: "S", stock: 5 },
            { size: "M", stock: 3 },
            { size: "L", stock: 2 },
            { size: "XL", stock: 0 },
        ],
    },
    {
        _id: "2",
        title: "Quilted Puffer Jacket",
        description: "Water-resistant shell with recycled fill, channel quilting, and a stand collar for cold-weather layering.",
        images: [{ url: "https://placehold.co/400x400/6E7355/FAF9F6?text=Jacket", fileId: "img2" }],
        price: { amount: 5999, currency: "INR" },
        sizes: [
            { size: "XS", stock: 4 },
            { size: "S", stock: 6 },
            { size: "M", stock: 2 },
            { size: "L", stock: 1 },
        ],
    },
    {
        _id: "3",
        title: "Wide-Leg Denim",
        description: "Mid-rise, wide-leg jeans in rigid cotton denim with a straight hem and subtle whiskering at the thigh.",
        images: [{ url: "https://placehold.co/400x400/8FA3B8/141311?text=Denim", fileId: "img3" }],
        price: { amount: 3299, currency: "INR" },
        sizes: [
            { size: "S", stock: 3 },
            { size: "M", stock: 5 },
            { size: "L", stock: 4 },
        ],
    },
    {
        _id: "4",
        title: "Crewneck Sweatshirt",
        description: "Midweight loopback cotton with a ribbed crew collar, cuffs, and hem. A clean everyday layer.",
        images: [{ url: "https://placehold.co/400x400/242220/FAF9F6?text=Sweatshirt", fileId: "img4" }],
        price: { amount: 1899, currency: "INR" },
        sizes: [
            { size: "S", stock: 2 },
            { size: "M", stock: 6 },
            { size: "L", stock: 0 },
            { size: "XL", stock: 3 },
        ],
    },
    {
        _id: "5",
        title: "Canvas Tote Bag",
        description: "Heavy-duty canvas tote with a reinforced base and interior pocket, sized for daily carry.",
        images: [{ url: "https://placehold.co/400x400/B9AF98/141311?text=Tote", fileId: "img5" }],
        price: { amount: 1299, currency: "INR" },
        sizes: [{ size: "M", stock: 10 }],
    },
    {
        _id: "6",
        title: "Leather Sneakers",
        description: "Minimal low-top sneaker in full-grain leather with a cupsole and subtle perforated detailing.",
        images: [{ url: "https://placehold.co/400x400/242220/FAF9F6?text=Sneakers", fileId: "img6" }],
        price: { amount: 4499, currency: "INR" },
        sizes: [
            { size: "7", stock: 2 },
            { size: "8", stock: 4 },
            { size: "9", stock: 1 },
            { size: "10", stock: 0 },
        ],
    },
]






const ProductsPage = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let products = useSelector((state) => state.products.products)

    useEffect(() => {
        const fetchProducts = async () => {
            let response = await publicApi.get("/products")
            dispatch(setProducts(response.data.data.products))
        }
        
        fetchProducts()
    },[dispatch])


    return (
        <div className='min-h-screen bg-stone-50'>
            <div className='px-6 pt-10 sm:px-10'>
                <button
                    onClick={() => {
                        navigate("/")
                    }}
                    className='border mt-10 border-stone-500 p-5 rounded-full'>
                    <MoveLeft />
                </button>
                <h1 className='font-serif text-3xl text-stone-900'>Products</h1>
            </div>

            <div className='grid grid-cols-1 gap-7 px-6 py-8 sm:grid-cols-2 sm:px-10 lg:grid-cols-3'>
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