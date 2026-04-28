"use client"
import React, { useContext, useState } from 'react'
import Link from 'next/link';
import Card from './Card';
import BookData from '@/data/BookData';

function ProgrammingAndTech() {
  const [open, setopen] = useState(false);
  return (
    <>
      <div className='bg-[#f4f4f4] '>
        <div className='px-5  py-12 md:px-16 scroll-mt-14' id='ProgrammingAndTech'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='font-medium text-2xl tracking-widest'>Programming And Tech</h2>
            <Link href="#" className='text-xl' onClick={() => setopen(!open)}>{open ? "view less" : "view all"}</Link>
          </div>
          <div className={` flex gap-2 w-full ${open ? "flex-wrap" : "overflow-x-auto"} scrollbar-hide justify-start scrollbar-custom`}>
            {BookData.slice(5, 10).map((item) => (
              <div key={item.id} >
                <Card id={item.id} src={item.image} title={item.title} price={item.price} review={item.rating} max_price={item.Max_Price} />
              </div>
            ))}
          </div>
        </div>
      </div>
  

    </>
  )
}

export default ProgrammingAndTech