import React from 'react'
import Link from 'next/link';

function Overlay({ title, link }) {
  return (
   <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3">
    <h3 className="text-xl font-semibold text-center">{title}</h3>
    <Link href={link} target="_blank" className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium">
      Read Now
    </Link>
  </div>
  )
}

export default Overlay