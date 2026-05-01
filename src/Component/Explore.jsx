"use client"
import React, { useContext, useState,useEffect } from 'react'
import BookData from '@/data/BookData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Context } from '@/Context/ProductContext'
import { Heart } from 'lucide-react'
import api from '@/app/api/axios'
function Explore() {
  const router = useRouter();
  const [books,setBooks]= useState([]);

  const { addToCart, cartItem, isInWhishlist, removeWhislistItem, addToWhislisht,isUserPresent } = useContext(Context);
  // const idCheck = (book) => {
  //   return cartItem.some((item) => item._id === book._id);
  // } 
  const getBooks = async ()=>{
    try {
      const res = await api.get('/api/getBooks');
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  useEffect(()=>{
    getBooks();
  },[])

  return (
    <>
      <h1 className='text-center font-bold text-2xl mt-2'>Explore Books</h1>
      <div className='grid grid-cols-1 md:grid-cols-4  gap-8 p-8'>
        {books.map((item,i) => (
          <div key={i} className='flex flex-col border rounded-md cursor-pointer gap-4' >
            <div className='relative  rounded-md' onClick={() => {
              router.push(`/productInfo/${item._id}`);
            }}>
              <Image
                src={item.bookCover}
                height={200}
                width={200}
                alt='Image'
                className='w-full  aspect-square'
              />
            <div className='absolute right-0 top-0 w-8 h-8 m-2  rounded-full  flex items-center bg-white justify-center'>
                <Heart size={20} className={` ${isInWhishlist(item._id) ? "fill-red-700 text-red-700 pointer" : ""} `} onClick={(e) => {
                e.stopPropagation();
                isInWhishlist(item._id) ? removeWhislistItem(item._id) : addToWhislisht(item);
              }} />
            </div>
            </div>
            <div className='px-4 flex flex-col gap-1'>
              <span>{item.title}</span>
              <div>
                <span className=''> ₹{item.price} </span>
                <span className='line-through  text-gray-400 '>₹{item.maxPrice}</span>
              </div>
            </div>
            <div className='w-full px-4 py-2'>
              {isUserPresent ?
               (<button onClick={() => {
                addToCart(item);
              }} className='px-2 cursor-pointer rounded-md py-4 w-full flex justify-center items-center bg-black text-white'>
                Add To Cart
              </button>) :
                (<button onClick={() => {
                alert("Please login to add items to cart");
               
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