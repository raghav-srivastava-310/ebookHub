"use client";
import Link from "next/link";

function ErrorPage() {
  return (
    <div className='h-screen flex justify-center items-center font-bold text-2xl'>Error Occur
    <Link className="ml-2 text-blue-600 hover:underline" href="/">Go to Home</Link>
    </div>
  )
}

export default ErrorPage