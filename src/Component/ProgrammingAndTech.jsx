"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Card from './Card';
import BookData from '@/data/BookData';
import api from '@/app/api/axios';

function ProgrammingAndTech() {
  const [open, setopen] = useState(false);
  const [books, setBooks] = useState([]);
    const getBooks = async ()=>{
      try {
        const res = await api.get("/api/getBooks?category=ProgrammingAndTech")
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
      <div className='bg-white'>
        <div className='max-w-7xl mx-auto px-5 py-16 md:px-8 scroll-mt-20' id='ProgrammingAndTech'>
          <div className='flex justify-between items-end mb-8 border-b border-gray-100 pb-4'>
            <div>
              <h2 className='font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight'>Programming & Tech</h2>
              <p className='text-gray-500 mt-2 text-sm font-medium'>Master new skills with our tech collection</p>
            </div>
            <Link href="#" className='text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-full' onClick={(e)=>{e.preventDefault(); setopen(!open);}}>{open?"View Less":"View All"}</Link>
          </div>
          <div className={`flex gap-6 w-full ${open ? "flex-wrap" : "overflow-x-auto"} scrollbar-hide justify-start py-4 px-2 -mx-2`}>
            {books.map((item) => (
              <div key={item._id} >
                <Card id={item._id} src={item.bookCover} title={item.title} price={item.price} review={item.rating} max_price={item.maxPrice} />
              </div>
            ))}
          </div>
        </div>
      </div>
  

    </>
  )
}

export default ProgrammingAndTech