"use client"
import React from 'react'
import Image from 'next/image'
import {Swiper,SwiperSlide} from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
 const data = [
  {
    id: 1,
    title: "The Forty Five Guardsmen",
    image: "/image/The_Forty_Five_Guardsmen.jpg",
    pdf: "/asset/The Forty-Five Guardsmen.pdf",
  },
  {
    id: 2,
    title: "Chicot the Jester",
    image: "/image/Chicot the Jester.jpg",
    pdf: "/asset/Chicot the Jester.pdf",
  },
  {
    id: 3,
    title: "The Count Of Monte Cristo",
    image: "/image/The_Count_Of_MonteCristo.jpg",
    pdf: "/asset/The Count Of MonteCristo.pdf",
  },
  {
    id: 4,
    title: "The Three Musketeers",
    image: "/image/The_Three_Musketeers.jpg",
    pdf: "/asset/The Three Musketeers.pdf",
  },
];
import Overlay from './Overlay';

function FreeBook() {
  return (
  <>
 <div className="hidden md:block bg-gray-50 py-16 border-y border-gray-100">
  <div className="max-w-7xl mx-auto px-5 mb-12 text-center">
    <h2 className='font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight scroll-mt-20' id='FreeBooks'>Free Reading Collection</h2>
    <p className="text-gray-500 mt-3 text-sm font-medium">Enjoy our curated list of free classics</p>
  </div>
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-5">
    {data.map((item) => (
      <div key={item.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100">
        <Image src={item.image} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold mb-4 drop-shadow-md leading-snug">{item.title}</h3>
          <Link href={item.pdf} target="_blank" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all mx-auto opacity-0 group-hover:opacity-100">
            Read Now
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

  <div className='block md:hidden bg-gray-50 py-12 border-y border-gray-100'>
 <div className="px-5 mb-8 text-center">
    <h2 className='font-extrabold text-3xl text-gray-900 tracking-tight scroll-mt-20' id='FreeBooks'>Free Reading</h2>
    <p className="text-gray-500 mt-2 text-sm font-medium">Enjoy our curated free classics</p>
  </div>
  <Swiper
  modules={[Pagination]}
  pagination={{clickable:true}}
  slidesPerView ={1}
    style={{
    '--swiper-pagination-color': '#fff',
    '--swiper-pagination-bullet-inactive-color': '#fff',
  }}
  >
  
  {data.map((item)=>(
  <SwiperSlide key={item.id} className="pb-10 px-5">
   <div className='relative rounded-2xl overflow-hidden shadow-lg group'>
    <Image
    src={item.image}
    width={400}
    height={500}
    alt={item.title}
    className='aspect-[4/5] object-cover w-full transition-transform duration-700 group-hover:scale-105'
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-4 drop-shadow-md leading-snug">{item.title}</h3>
        <Link href={item.pdf} target="_blank" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md mx-auto">
          Read Now
        </Link>
      </div>
    </div>
    
   </div>
  </SwiperSlide>
  ))}

  </Swiper>
   

  </div>
  </>
  )
}

export default FreeBook