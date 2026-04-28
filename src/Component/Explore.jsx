"use client"
import React, { useContext } from 'react'
import BookData from '@/data/BookData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Context } from '@/Context/ProductContext'
import { Heart } from 'lucide-react'
function Explore() {
  const router = useRouter();
  const { addToCart, cartItem, isInWhishlist, removeWhislistItem, addToWhislisht } = useContext(Context);
  const idCheck = (book) => {
    return cartItem.some((item) => item.id === book.id);
  } 
  return (
    <>
      <h1 className='text-center font-bold text-2xl mt-2'>Explore Books</h1>
      <div className='grid grid-cols-1 md:grid-cols-4  gap-8 p-8'>
        {BookData.map((item) => (
          <div key={item.id} className='flex flex-col border rounded-md cursor-pointer gap-4' >
            <div className='relative  rounded-md' onClick={() => {
              router.push(`/productInfo/${item.id}`);
            }}>
              <Image
                src={item.image}
                height={200}
                width={200}
                alt='Image'
                className='w-full  aspect-square'
              />
            <div className='absolute right-0 top-0 w-8 h-8 m-2  rounded-full  flex items-center bg-white justify-center'>
                <Heart size={20} className={` ${isInWhishlist(item.id) ? "fill-red-700 text-red-700 pointer" : ""} `} onClick={(e) => {
                e.stopPropagation();
                isInWhishlist(item.id) ? removeWhislistItem(item.id) : addToWhislisht(item);
              }} />
            </div>
            </div>
            <div className='px-4 flex flex-col gap-1'>
              <span>{item.title}</span>
              <div>
                <span className=''> ₹{item.price} </span>
                <span className='line-through  text-gray-400 '>₹{item.Max_Price}</span>
              </div>
            </div>
            <div className='w-full px-4 py-2'>
              {idCheck(item) ? (<button onClick={() => {
                alert("Item Already in the Cart")
              }} className='px-2 cursor-pointer rounded-md py-4 w-full flex justify-center items-center bg-black text-white'>
                Add To Cart
              </button>) : (<button onClick={() => {
                addToCart(item);
              }} className='px-2 cursor-pointer rounded-md py-4 w-full flex justify-center items-center bg-black text-white'>
                Add To Cart
              </button>)}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Explore