import React from 'react'

const currencySymbols = { INR: "₹", USD: "$" }

const ProductCard = ({ product, onEdit, onDelete }) => {
  const symbol = currencySymbols[product.price.currency] ?? ""

  return (
    <div className='flex flex-col border border-stone-200 bg-stone-100'>
      <div className='aspect-square overflow-hidden bg-stone-200'>
        <img
          src={product.images[0]?.url}
          alt={product.title}
          className='h-full w-full object-cover'
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
              className={`border border-stone-200 px-2 py-0.5 text-xs ${
                s.stock === 0 ? 'text-stone-300 line-through' : 'text-stone-600'
              }`}
            >
              {s.size}
            </span>
          ))}
        </div>

        <div className='mt-auto flex gap-2.5 pt-2'>
          <button
            onClick={() => onEdit?.(product)}
            className='flex flex-1 items-center justify-center gap-1.5 border border-stone-900 py-2 text-xs font-medium text-stone-900'
          >
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-3.5 w-3.5'>
              <path d='M12 20h9' />
              <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
            </svg>
            Update
          </button>
          <button
            onClick={() => onDelete?.(product)}
            className='flex flex-1 items-center justify-center gap-1.5 border border-stone-200 py-2 text-xs font-medium text-[#A64B3C]'
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
  )
}

export default ProductCard