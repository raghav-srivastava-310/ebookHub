import Link from 'next/link';
import React from 'react'

function NotFound() {
  return (
    <>
   
    <div className='h-screen flex justify-center items-center gap-4 flex-col'>
    <p className='font-bold'>404 Page Not Found</p>
    <Link href="/" className='flex justify-center items-center py-2 px-4 bg-blue-600 rounded-md text-white'>Go to Home</Link>
    </div>
     </>
  )
}

export default NotFound