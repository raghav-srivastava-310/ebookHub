"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react';
import { Context } from '@/Context/ProductContext';
import { useRouter } from 'next/navigation';
function Card({ id, src, title, price, max_price }) {
  const { addToWhislisht, isInWhishlist, removeWhislistItem } = useContext(Context);
  const router = useRouter();

  return (
    <>
      <div className='w-75 md:w-100 relative'>
        <div className='absolute right-0 w-8 h-8 m-2  rounded-full  flex items-center bg-white justify-center '>

          <Heart size={20} className={` ${isInWhishlist(id) ? "fill-red-700 text-red-700 pointer" : ""} `} onClick={(e) => {
            e.stopPropagation();
            isInWhishlist(id) ? removeWhislistItem(id) : addToWhislisht({ id, src, title, price });
          }} />
        </div>
        <div className='cursor-pointer' onClick={() => {
          router.push(`/productInfo/${id}`)
        }}>
          <Image
            src={src}
            height={400}
            width={400}

            className='aspect-4/5  transition-transform duration-300 group-hover:scale-105'
            alt='Image'
          />
        </div>

      </div>
      <div className='py-2 text-sm  text-[#423f3f] flex flex-col gap-1' onClick={() => {
        router.push(`/productInfo/${id}`)
      }} >
        <p className='text-center md:text-left'>{title}</p>
        <div className='flex relative gap-2 justify-center md:justify-start items-center'>
          <span className=''> ₹{price} </span>
          <span className='line-through  text-gray-400 '>₹{max_price}</span>
        </div>

      </div>
    </>
  )
}

export default Card