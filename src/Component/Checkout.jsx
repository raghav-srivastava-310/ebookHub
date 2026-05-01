"use client"
import { Context } from '@/Context/ProductContext';
import Image from 'next/image';
import React, { useContext } from 'react'
import { useState } from 'react';
import Link from 'next/link';
import api from '@/app/api/axios';
import { useRouter } from 'next/navigation';
const initialValue = {
  name: "",
  email: "",
  address: "",
  bill_area: "",
  phone: "",
  bill_city: ""
}


function Checkout() {
  const [open, setIsOpen] = useState(false);
  const [open1, setIsOpen1] = useState(false);
  const { cartItem, TotalPrice, setCartItem } = useContext(Context);
  const [billData, setBillData] = useState(initialValue)
  const router = useRouter()
 
  const handleChange = (e) => {
    setBillData({ ...billData, [e.target.name]: e.target.value });
  }

  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  }

  const handlePayment = async () => {
    const res = await loadScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // Call backend to create order
      const res = await api.post("/api/payment/createOrder");
      const data = res.data;
      console.log("the order data is", data)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "EbookHub Store",
        description: "Book Purchase",
        order_id: data.order.id,
        handler: async function (response) {
          // Verify payment on the server
          const verifyRes = await api.post("/api/payment/verifyPayment", response);
          const verifyData = verifyRes.data;
          if (verifyData.success) {
            alert("Payment successful! Your order has been placed.");
            setCartItem([]);
            localStorage.setItem("ProductInfo", JSON.stringify([]));
            router.push("/");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        theme: {
          color: "#000",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
    catch (error) {
      console.log("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className='md:px-20 m-0 px-2 md:py-2'>
      <div className='flex flex-col md:flex-row gap-8'>

        {/* left section */}
        <div className='w-full md:w-1/2 '>
          <h2 className='py-2 text-2xl'>BILLING DETAILS</h2>
          <div className=' px-1 py-8 border-2 border-black'>
            <div className={`mt-2 overflow-hidden`}>
              <span>Returning customer ? </span>
              <span className='font-bold hover:cursor-pointer' onClick={() => setIsOpen(!open)}>Click here to login</span>
              <div className={`transition-all duration-500 ${open ? "max-h-96" : "max-h-0"}`}>
                <div className='mt-4 pb-6 flex flex-col gap-2'>
                  <p>If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.</p>
                  <input type="email" className='w-full border border-gray-400 py-2 px-1' />
                  <input type="email" className='w-full border border-gray-400 py-2 px-1' />
                  <div className='flex items-center gap-1'>
                    <input type="checkbox" id='remember' className='w-3 h-3 rounded border border-gray-400 ' />
                    <label htmlFor="remember font-sm">REMEMBER ME</label>
                  </div>
                  <div>
                    <button className='bg-black text-white flex justify-center items-center px-30 py-2'>Login</button>
                  </div>
                  <p className='py-2'>Lost your password?</p>
                </div>
              </div>
            </div>
            <div className=' overflow-hidden'>
              <span>Have a coupon? </span>
              <span className='font-bold hover:cursor-pointer' onClick={() => {
                setIsOpen1(!open1);
              }}>Click here to enter your code </span>
              <div className={`transition-all duration-500 ${open1 ? "max-h-96" : "max-h-0"}`}>
                <p className='py-2'>If you have coupon code,please apply it below</p>
                <div className='flex'>
                  <input type="text" placeholder='Coupon Code' className='w-2/5 border border-gray-400 py-2 px-2' />
                  <button className='flex justify-center items-center px-10 py-2 bg-black text-white'>Apply</button>
                </div>
              </div>
            </div>
            <form action="#" className='mt-4 flex flex-col gap-6'>
              <div className='flex gap-4'>
                <input type="text" name='name' value={billData.name} onChange={handleChange} required placeholder='Name' className='w-full border border-black py-2 px-2' />
                <input type="text" required placeholder='Last Name' className='w-full border border-black py-2 px-2' />
              </div>
              <div className='flex gap-4'>
                <input type="email" required placeholder='Email' name='email' value={billData.email} onChange={handleChange} className='w-full border border-black py-2 px-2' />
                <input type="tel" name='phone' value={billData.phone} onChange={handleChange} placeholder='Phone' className='w-full border border-black py-2 px-2' />
              </div>
              <div>
                <textarea className='w-full py-1 px-2 border border-black' name='address' value={billData.address} onChange={handleChange} required placeholder='Address'>

                </textarea>
              </div>
              <div>
                <select name="country" disabled className='w-full bg-gray-200 py-2 px-2'>
                  <option value="India">India</option>

                </select>
              </div>
              <div className='flex gap-4'>
                <select name="state" disabled className='w-full bg-gray-200 py-2 px-2'>
                  <option value="" disabled className='hidden'>Select State</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>

                </select>
                <input type="text" required placeholder='Billing City' name='bill_city' value={billData.bill_city} onChange={handleChange} className='w-full border border-black py-2 px-2' />
              </div>
              <div className='flex gap-4'>
                <input type="text" required name='bill_area' value={billData.bill_area} onChange={handleChange} placeholder='Billing Area' className='w-full border border-black py-2 px-2' />
                <input type="text" required placeholder='Billing City' className='w-full border border-black py-2 px-2' />
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center'>
                  <label htmlFor="account" className='font-bold mr-1'>CREATE AN ACCOUNT? </label>
                  <input type="checkbox" required id='account' className='w-4 h-4 rounded border border-gray-400 ' />
                </div>

                <div className='flex items-center'>
                  <label htmlFor="add" className='font-bold mr-1'>Ship to a different address? </label>
                  <input type="checkbox" required id='add' className='w-4 h-4 rounded border border-gray-400 ' />
                </div>

              </div>
            </form>
          </div>
        </div>
        {/* Right Section */}
        <div className='w-full text-sm md:text-xl md:w-1/2'>
          <h2 className='py-2 text-2xl'>YOUR ORDER</h2>
          <div className='flex flex-col gap-4'>
            {/* First Div */}
            <div className='w-full border-2 border-black'>
              <div className='w-full flex justify-between px-2 text-white bg-black py-6 '>
                <div className='flex gap-6 w-1/2'>
                  <p>PRODUCT</p>
                  <p>NAME</p>
                </div>
                <div className='flex justify-between w-1/2'>
                  <p>QTY</p>
                  <p>SUBTOTAL</p>
                  <p>TAX</p>
                  <p>TOTAL</p>
                </div>

              </div>
              {cartItem.map((item) => (
                <div className='w-full flex justify-between px-2 py-2 bg-gray-100' key={item._id}>
                  <div className='w-1/2 flex gap-6'>
                    <div>
                      <Image
                        src={item.productId.bookCover}
                        alt={item.title}
                        height={60}
                        width={60}
                        className='object-cover'
                      /></div>
                    <div>{item.title}</div>
                  </div>
                  <div className='w-1/2 flex justify-between'>
                    <p>1</p>
                    <p>₹{Math.floor(item.price)}</p>
                    <p>0%</p>
                    <p>₹{Math.floor(item.price)}</p>

                  </div>
                </div>
              ))}
            </div>

            <div className='p-2 flex flex-col gap-4 border-2 border-black'>
              <div className='flex justify-between'>
                <p>SUBTOTAL</p>
                <p>₹{Math.round(TotalPrice())}</p>
              </div>
              <div className='flex justify-between'>
                <p>DELIVERY CHARGES</p>
                <p>₹0</p>
              </div>
              <div className='flex justify-between'>
                <p>TOTAL</p>
                <p>₹{Math.round(TotalPrice())}</p>
              </div>
            </div>

            <div className='flex flex-col border-2 gap-4 border-black p-4'>
              <h2>SELECT PAYMENT MODE</h2>
              <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won't be shipped until the funds have cleared in our account.</p>
              <div className='flex items-center gap-2'>
                <div className='h-5 w-5 p-1  flex justify-center items-center border border-blue-600 rounded-full'>
                  <div className='h-3 w-3 bg-blue-600 rounded-full '>

                  </div>
                </div>
                <div>
                  <p>Online Payment (Debit/Credit Card/UPI/Net Banking )</p>
                </div>

              </div>
              <div
                onClick={() => {
                  if (
                    billData.name &&
                    billData.email &&
                    billData.address &&
                    billData.phone &&
                    billData.bill_area &&
                    billData.bill_city
                  ) {
                    handlePayment(); // 🔥 CALL PAYMENT
                  } else {
                    alert("You Need To fill the required detail");
                  }
                }}
                className="flex justify-center items-center py-2 bg-black text-white cursor-pointer"
              >
                PLACE ORDER
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout