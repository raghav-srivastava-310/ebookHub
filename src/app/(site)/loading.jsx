import Image from 'next/image'
import React from 'react'

function loading() {
  return (
    <>
    <div className='h-screen flex flex-col items-center justify-center font-bold text-2xl'>
      <div>
        <Image
        src="/ebooklogo.png"
        alt="Ebook Logo"
        width={100}
        height={100}
        className="rounded"
        />
      </div>
  <div>
        wait.....
  </div>
      </div>
      </>
  )
}

export default loading