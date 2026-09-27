import React from 'react'
import useProduct from '../hooks/productHook'
import toast from 'react-hot-toast'

const currencySymbols = { INR: "₹", USD: "$" }

const ProductCard = ({ product, onEdit, onDelete }) => {
  const symbol = currencySymbols[product.price.currency] ?? ""
  let { navigate } = useProduct()
  return (
    <div
      onClick={() => {
        navigate(`/products/${product._id}`)
      }}
      className='flex flex-col border border-stone-200 bg-stone-100 group'>
      <div className='aspect-square overflow-hidden bg-stone-200'>
        <img
          src={product.images[0]?.url}
          alt={product.title}
          className='h-full w-full object-cover group-hover:scale-108 transition-transform duration-500'
        />
      </div>

      <div className='flex flex-1 flex-col gap-2.5 px-5 py-4'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='font-serif text-lg leading-tight text-stone-900'>{product.title}</h3>
          <span className='whitespace-nowrap text-sm font-semibold text-stone-900'>
            {symbol}{product.price.amount.toLocaleString()}
          </span>
        </div>

        <p className='line-clamp-2 text-sm leading-relaxed text-stone-600'>
          {product.description}
        </p>

        <div className='flex flex-wrap gap-1.5'>
          {product.sizes.map((s) => (
            <span
              key={s.size}
              className={`border border-stone-200 px-2 py-0.5 text-xs ${s.stock === 0 ? 'text-stone-300 line-through' : 'text-stone-600'
                }`}
            >
              {s.size}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCard