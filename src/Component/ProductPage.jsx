"use client"
import React, { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import BookData from "@/data/BookData"
import { Star } from "lucide-react"
import Link from "next/link"
import { Context } from "@/Context/ProductContext"

export default function ProductPage() {
  const params = useParams()
  const [book, setBook] = useState(null)
  const [info,setInfo] = useState([]);
const {addToCart,cartItem}=useContext(Context)
  useEffect(() => {
    const data = BookData.find(
      (item) => item.id === Number(params.id)
    )
    setBook(data) 
  }, [params.id])

   useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem("FormInfo"))||[];
    setInfo(stored);
  },[]);

  if (!book) {
    return <p className="text-center mt-10 h-screen flex items-center justify-center  text-2xl">Loading...</p>
  }
  const idCheck = (book)=>{
   return cartItem.some((item)=>item.id === book.id );
  }
  
 

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT – BOOK IMAGE */}
        <div className="flex justify-center">
          <div className="relative w-65 aspect-3/4 bg-slate-50 rounded-xl p-4 shadow">
            <Image
              src={book.image}
              alt={book.title}
              fill
            loading="eager"
               sizes="(max-width: 768px) 100vw, 25vw"
              className="object-contain bg-gray-200"
            />
          </div>
        </div>

        {/* RIGHT – BOOK INFO */}
        <div className="flex flex-col gap-4">

          <span className="text-sm text-indigo-600 font-medium">
            {book.category}
          </span>

          <h1 className="text-3xl font-semibold text-gray-900">
            {book.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < Math.round(book.rating)
                    ? "fill-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">
              {book.rating}
            </span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-gray-900">
            ₹{book.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
         {book.description}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col-reverse md:flex-row px-4 md:px-0 gap-4 mt-4">


           

            {info.length>0?( 
               <Link
              href={book.pdf}
              target="_blank"
              className="px-6 py-3 bg-black text-white rounded-md text-center"
            >
              Read PDF
            </Link>)
            :( <Link
              href="/signup"
              className="px-6 py-3 bg-black text-white rounded-md text-center"
              onClick={()=>{
                {alert("You Need to SignUp For Read This Pdf")}
              }}
            >
              Read Pdf
            </Link>)}

           {info.length>0?( 
              <a
              href={book.pdf}
              target="_blank"
              download
              className="px-6 py-3 border border-black rounded-md text-center"
            >
              Download
            </a>)
            :( <Link
              href="/signup"
              className="px-6 py-3 border border-black rounded-md text-center"
               onClick={()=>{
                {alert("You Need to SignUp For Download This Pdf")}
              }}
            >
              Download
            </Link>)}

            
           {idCheck(book)?( 
            <button

              className="px-6 py-3 border border-black rounded-md font-medium
               hover:bg-black hover:text-white transition"
            >
              Add to Cart
            </button>):( 
            <button

              className="px-6 py-3 border border-black rounded-md font-medium
               hover:bg-black hover:text-white transition"
               onClick={()=>{
                addToCart(book)
               }}
            >
              Add to Cart
            </button>)}
          </div>
        </div>
      </div>

      {/* RELATED BOOKS */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">
          You May Also Like
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BookData.filter(item => item.id !== book.id).slice(0,4).map(item => (
            <Link
              key={item.id}
              href={`/productInfo/${item.id}`}
              className="group"
            >
              <div className="bg-slate-50 p-3 rounded-lg shadow-sm group-hover:shadow-md transition">
                <div className="relative aspect-3/4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                     sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain bg-gray-200"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </p>
                <p className="text-sm font-semibold">
                  ₹{item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
