"use client";
import { Context } from "@/Context/ProductContext";
import Image from "next/image";
import React, { useContext, useState } from "react";

function WishList() {
  const { whishlist, removeWhislistItem, addToCart, cartItem } =
    useContext(Context);
    const [remove,setRemove]=useState(false);
  const idCheck = (book) => {
    return cartItem.some((item) => item.id === book.id);
  }
  return (
    <>
      <div className="p-2 max-w-200 mx-auto">

        {whishlist.length > 0 && (
          <h2 className="text-center mb-6 text-xl font-medium">
            Wishlist
          </h2>
        )}

        {whishlist.length > 0 && (
          <h2 className="py-2 text-[#5E5C5C]">
            Product Detail
          </h2> 
        )}


        {whishlist.length > 0 && (
          <div className="text-[#5e5C5C] hidden md:block">
            <div className="border-b mb-2 mx-2 border-gray-300 flex justify-between pb-4">
              <div className="w-1/2"></div>
              <div className="flex w-1/2 justify-evenly">
                <div className="flex">
                  <p className="pr-10">Price</p>
                  <p>Quantity</p>
                </div>
                <p>Total</p>
              </div>
            </div>
          </div>
        )}

        {whishlist.length > 0 ? (
          <div className="p-2 md:p-4 text-[#5E5C5C]">

            {whishlist.map((item) => (
              <div key={item.id} className="mb-10">


                <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0">


                  <div className="w-full md:w-1/2 flex gap-4 items-center">
                    <Image
                      src={item.src||item.image}
                      alt={item.title}
                      height={80}
                      width={80}
                      className="object-cover shadow w-16 h-16 md:w-20 md:h-20"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm md:text-base">
                        {item.title}
                      </p>
                      <p className="text-xs md:text-sm">
                        Selling Type: retailer
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="w-full md:w-1/2 flex justify-between md:justify-evenly items-center">

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <p>₹{item.price}</p>

                      <div className="w-28 h-10 flex justify-between items-center px-4 border border-gray-800 rounded-md">
                        <button
                          onClick={() =>
                            removeWhislistItem(item.id)
                          }
                          className="text-2xl cursor-pointer"
                        >
                          -
                        </button>
                        <span>1</span>
                        <span className="text-2xl">+</span>
                      </div>
                    </div>

                    <div className="hidden md:flex">
                      ₹{item.price}
                    </div>
                  </div>
                </div>


                <div className="flex md:justify-center p-2 mt-6">
                 {idCheck(item) ? (
                  <button
                    className="flex justify-center rounded-md px-8 py-2 bg-blue-600 hover:cursor-pointer text-white"
                    onClick={()=>{
                      
                      const result = confirm("Item is already in bag You Want to remove item");
                      {result&&(removeWhislistItem(item.id))}
                    }}
                  >
                    Move To Bag
                  </button>) : (
                  <button
                    className="flex justify-center rounded-md px-8 py-2 bg-black hover:cursor-pointer text-white"
                    onClick={() => {
                      addToCart(item);
                      removeWhislistItem(item.id);
                    }}
                  >
                    Move To Bag
                  </button>)}

                </div>

               
              </div>
            ))}

            <div className="border-b border-black flex justify-center p-2 mt-6"></div>
          </div>
        ) : (
          <div className="flex gap-2 justify-center h-screen items-center text-2xl font-bold">
            <p>Oops!</p>
            Your Wishlist is empty
          </div>
        )}
      </div>
    </>
  );
}

export default WishList;
