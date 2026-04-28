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
 <div className="hidden md:block bg-[#f4f4f4] py-10">
  <h2 className='font-medium text-2xl tracking-widest text-center mb-8 scroll-mt-30' id='FreeBooks'>Free Reading Collection</h2>
  <div className="max-w-7xl mx-auto grid grid-rows-2 gap-6">

    {/* ROW 1 */}
   <div className="grid grid-cols-3 gap-6">
      <div className="relative h-75 col-span-2 rounded-xl overflow-hidden hover:scale-105 transition">
        <Image src="/image/The_Forty_Five_Guardsmen.jpg" fill className="" alt="" />
        <div className="absolute inset-0 bg-black/50" />
        <Overlay title="The Forty Five Guardsmen" link="/asset/The Forty-Five Guardsmen.pdf" />
      </div>

      <div className="relative h-75 rounded-xl overflow-hidden hover:scale-105 transition">
        <Image src="/image/Chicot the Jester.jpg" fill className="" alt="" />
        <div className="absolute inset-0 bg-black/50" />
        <Overlay title="Chicot the Jester" link="/asset/Chicot the Jester.pdf" />
      </div>
    </div>

    {/* ROW 2 */}
    <div className="grid grid-cols-3 gap-6">
      <div className="relative h-75 col-span-2 rounded-xl overflow-hidden hover:scale-105 transition">
        <Image src="/image/The_Count_Of_MonteCristo.jpg" fill className="" alt="" />
        <div className="absolute inset-0 bg-black/50" />
        <Overlay title="The Count Of Monte Cristo" link="/asset/The Count Of MonteCristo.pdf" />
      </div>

      <div className="relative h-75 rounded-xl overflow-hidden hover:scale-105 transition">
        <Image src="/image/The_Three_Musketeers.jpg" fill className="" alt="" />
        <div className="absolute inset-0 bg-black/50" />
        <Overlay title="The Three Musketeers" link="/asset/The Three Musketeers.pdf" />
      </div>
    </div>

  </div>
</div>

  <div className='block md:hidden'>
 <h2 className='font-medium text-2xl tracking-widest text-center mb-8 py-8 scroll-mt-30' id='FreeBooks'>Free Reading Collection</h2>
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
  <SwiperSlide key={item.id}>
   <div className='relative'>
    <Image
    src={item.image}
    width={200}
    height={200}
    alt='Image'
    className='aspect-8/9 w-full'
    />
    <div className="absolute inset-0 bg-black/50">
 <Overlay title={item.title} link={item.pdf}/>
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