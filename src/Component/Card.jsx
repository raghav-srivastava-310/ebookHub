"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react';
import { Context } from '@/Context/ProductContext';
import { useRouter } from 'next/navigation';
function Card({ _id, src, title, price, max_price }) {
  const { addToWhislisht, isInWhishlist, removeWhislistItem } = useContext(Context);
  const router = useRouter();

  return (
      <div className='w-48 md:w-56 flex-shrink-0 group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative'>
        <div className='absolute z-10 top-2 right-2 w-8 h-8 rounded-full flex items-center bg-white/80 backdrop-blur-sm justify-center shadow-sm cursor-pointer hover:bg-white transition-colors duration-200'>

          <Heart size={16} className={`transition-colors duration-200 ${isInWhishlist(_id) ? "fill-red-500  text-red-500" : ""}`} onClick={(e) => {
            e.stopPropagation();
            isInWhishlist(_id) ? removeWhislistItem(_id) : addToWhislisht({_id, src, title, price });
          }} />
        </div>
        <div className='cursor-pointer overflow-hidden bg-gray-50' onClick={() => {
          router.push(`/productInfo/${_id}`)
        }}>
          <Image
            src={src} 
            height={400}
            width={400}

            className='aspect-4/5 object-cover w-full transition-transform duration-500 group-hover:scale-110'
            alt={title}
          />
        </div>

        <div className='p-4 text-sm flex flex-col gap-1.5 cursor-pointer flex-grow justify-between' onClick={() => {
          router.push(`/productInfo/${_id}`)
        }} >
          <p className='font-semibold text-gray-800 line-clamp-2 leading-snug'>{title}</p>
          <div className='flex items-center gap-2 mt-auto'>
            <span className='font-bold text-indigo-600 text-base'>₹{price}</span>
            {max_price && <span className='line-through text-xs text-gray-400 font-medium'>₹{max_price}</span>}
          </div>
        </div>
      </div>
  )
}

export default Card