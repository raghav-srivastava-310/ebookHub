import React from 'react'
import { Check } from 'lucide-react';
import Link from 'next/link';

function page() {
  return (
    <div className='flex flex-col gap-4 justify-center items-center h-screen'>
      <div className='rounded-full bg-green-600 h-20 w-20 font-bold text-white flex justify-center items-center'>
         <Check size={35} />
      </div>
      <div>You Order Has Confirmed </div>
      <Link href="/" className='bg-black rounded-md  text-white flex justify-center items-center py-2 px-4'>
      Go Back To Home
      </Link>
    </div>
  )
}

export default page