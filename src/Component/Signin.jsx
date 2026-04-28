"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import api from '@/app/api/axios';

function Signin() {
  const router = useRouter();
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const [error,setError] = useState("");
  const [message,setMessage] = useState("");
   const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/signin",formData)
      const data = res.data;
      if(data.success){
        setError("");
       setMessage(data.message || "Login successful!");
       setFormData({
        email:"",
        password:""
       })
       localStorage.setItem("accessToken",JSON.stringify(data.accessToken))
         router.push("/");
      }else{

        setError(data.message || "Login failed. Please try again.");
      }

      console.log("Login response:", data);
    } catch (error) {
      console.log("Error during login:", error);
    }
  }
  return (
   <div className='flex justify-center  items-center py-10 scroll-mt-8'>
         <div className='p-8 border border-[#ccc] bg-white w-full max-w-125 rounded-md'>
          {message && <p className='text-green-500 text-center mb-4'>{message}</p>}
          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
           <div className=' mt-2'>
             <h2 className='font-medium text-center mb-5 text-2xl tracking-wider'><span>LOGIN</span></h2>
             <p className='text-[#423f3f] not-italic font-light m-0 text-center'>Welcome back! Sign in to your account</p>
           </div>
           <form onSubmit={handleSubmit} className=' flex flex-col gap-2 p-4'>
             <div>
               <label htmlFor="email" className="block mb-3 tracking-wider leading-5 ">Email</label>
               <input type="email" placeholder='Email' value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} className='max-w-108 min-h-8 w-full border border-[#d7d6d6] p-2' />
             </div>
             <div>
               <label htmlFor="password" className="block mb-3 tracking-wider leading-5 ">Password</label>
               <input type="password" placeholder='Password' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} className='max-w-108 min-h-8 w-full border border-[#d7d6d6] p-2' />
             </div>
             <div className='mt-4 font-bold'>
               <p>Forgot Password?</p>
             </div>
             <div className='flex justify-center mt-4 mb-4 mx-35'>
               <button
                 type='submit'
                 className='px-10.5 cursor-pointer py-2.5 text-white bg-black border-none mr-4 font-medium text-[16px] tracking-wide'>
                 LOGIN
               </button>
             </div>
             <div className='border-b border-[#ccc] mt-2 relative mx-2 mb-4'>
               <div className='absolute left-45 -top-3 bg-gray-50'>
                 <p>OR</p>
               </div>
             </div>
   
           </form>
           <div className='p-4'>
            <GoogleLogin
            theme='outline'
            onSuccess={async (credentialResponse)=>{
              console.log(credentialResponse); 
             try {
               const res = await api.post("/api/auth/google",{
                token:credentialResponse.credential
              })
              const data = res.data;
              console.log("Google login response:", data);
              localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
              router.push("/");
             } catch (error) {
              console.log("Error during Google login:", error);
             }
            }}
            onError={(err)=>{
              console.log("Google login error:", err);
            }}
            />
           </div>
           <div className='flex justify-center items-center mb-4'>
             <span>Don't have an account?</span>
             <Link href="/signup"  className='font-bold'>Sign Up</Link>
           </div>
         </div>
       </div>
  )
}

export default Signin