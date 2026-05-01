"use client";
import { Context } from "@/Context/ProductContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

function Cart() {
  const { cartItem, removeCart, addToCart, TotalPrice, isUserPresent,updateCartQuantity } =
    useContext(Context);

  const [info, setInfo] = useState([]);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("FormInfo")) || [];
    console.log("the data is", cartItem);
    setInfo(data);
  }, []);
 
  return (
    <>
      <div className="max-w-200 mx-auto px-4 md:px-0">

        {cartItem.length > 0 && (
          <h2 className="text-center mb-6 text-xl font-medium">
            Shopping Cart
          </h2>
        )}

        {cartItem.length > 0 && (
          <h2 className="py-2 text-[#5E5C5C]">
            Product Detail
          </h2>
        )}

        {/* Header Row (Desktop Only) */}
        {cartItem.length > 0 && (
          <div className="text-[#5e5C5C] hidden md:block">
            <div className="border-b mb-2 mx-2 border-gray-300 flex justify-between">
              <div className="w-1/2"></div>
              <div className="flex w-1/2 justify-evenly py-4">
                <div className="flex">
                  <p className="pr-10">Price</p>
                  <p>Quantity</p>
                </div>
                <p>Total</p>
              </div>
            </div>
          </div>
        )}

        {cartItem.length > 0 ? (
          <div className="p-2 md:p-4 text-[#5E5C5C]">

            {cartItem.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-between mb-10 gap-6 md:gap-0"
              >
                {/* Left Section */}
                <div className="w-full md:w-1/2 flex gap-4 items-center">
                  <Image
                    src={item.productId.bookCover}
                    alt={item.title}
                    height={80}
                    width={80}
                    className="object-cover shadow w-16 h-16 md:w-20 md:h-20"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">{item.title}</p>
                    <p className="text-xs md:text-sm">
                      Selling Type : retailer
                    </p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 flex justify-between md:justify-evenly items-center">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <p>₹{item.price}</p>

                    <div className="flex flex-col justify-center">
                      <div className="w-28 h-10 border flex justify-around items-center border-gray-800 rounded-md">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateCartQuantity(item.productId._id, item.quantity - 1);
                            }
                          }}
                          className="text-2xl hover:cursor-pointer"
                        >
                          -
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.productId._id, item.quantity + 1)}
                          className="text-2xl hover:cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div
                        className="text-red-600 text-center hover:cursor-pointer text-sm mt-1"
                        onClick={() => removeCart(item.productId._id)}
                      >
                        Remove Item
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex justify-center items-center">
                    ₹{item.price}
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="border-b border-black text-center p-2 mt-6">
              <Link href="/">Continue shopping</Link>
            </div>

            {/* Offers Section */}
            <div className="mt-6 flex flex-col md:flex-row justify-between gap-6">
              <div className="w-full md:w-1/2"></div>

              <div className="w-full md:w-1/2 py-2 flex flex-col">
                <h2 className="text-center">Offers</h2>
                <p className="text-center py-2 text-sm">
                  Additional 15% Off on Order above ₹300.  
                  Coupon code *T&C Apply
                </p>

                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter Code"
                    className="border border-gray-300 py-3 w-full px-2"
                  />
                  <button
                    className="px-6 md:px-10 py-3 bg-black text-white"
                    onClick={() => alert("Oops! Coupon Not Available")}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="mt-4 flex justify-between px-2 pb-2 border-b border-black">
              <p>Order Total</p>
              <p>₹{TotalPrice()}</p>
            </div>

            {/* Checkout */}
            <div className="flex flex-col items-center mt-6 pb-6 text-center">
              <p className="text-sm">
                Tax included and shipping calculated at checkout
              </p>

              <div className="mt-4">
                {isUserPresent ? (
                  <Link
                    href="/checkout"
                    className="flex justify-center items-center px-10 py-4 rounded-md bg-black text-white"
                  >
                    Check Out
                  </Link>
                ) : (
                  <Link
                    href="/signin"
                    onClick={() =>
                      alert("You Need to Signin For CheckOut")
                    }
                    className="flex justify-center items-center px-10 py-4 rounded-md bg-black text-white"
                  >
                    Check Out
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 h-screen justify-center font-bold text-3xl">
            <p>Oops!</p>
            Your Cart is Empty
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
