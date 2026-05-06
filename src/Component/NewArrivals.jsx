"use client"
import React, { useState,useEffect } from 'react'
import BookData from '@/data/BookData'
import Link from 'next/link';
import Card from './Card';
import api from '@/app/api/axios';
function NewArrivals() {
  const [open,setopen]=useState(false);
  const [books, setBooks] = useState([]);

   const getBooks = async ()=>{
    try {
      const res = await api.get("/api/getBooks?category=NewArivals")
      console.log("The data in new arrivals is ",res.data);
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
  <div className='bg-gray-50 border-y border-gray-100'>
        <div className='max-w-7xl mx-auto px-5 py-16 md:px-8 scroll-mt-20' id='NewArrivals'>
          <div className='flex justify-between items-end mb-8 border-b border-gray-200 pb-4'>
            <div>
              <h2 className='font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight'>New Arrivals</h2>
              <p className='text-gray-500 mt-2 text-sm font-medium'>Fresh off the press to your library</p>
            </div>
            <Link href="#" className='text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-100/50 px-4 py-2 rounded-full' onClick={(e)=>{e.preventDefault(); setopen(!open);}}>{open?"View Less":"View All"}</Link>
          </div>
          <div className={`flex gap-6 w-full ${open ? "flex-wrap" : "overflow-x-auto"} scrollbar-hide justify-start py-4 px-2 -mx-2`}>
            {books.map((item) => (
              <div key={item._id} >
                <Card id={item._id} src={item.bookCover} title={item.title} price={item.price} review={item.review} max_price={item.max_price} />
              </div>
            ))}
          </div>
        </div>
      </div>
  </>
  )
}

export default NewArrivals