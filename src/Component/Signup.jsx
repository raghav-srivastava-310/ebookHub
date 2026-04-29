"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/app/api/axios';
const initialValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

function Signup() {
  const [formData, setFormData] = useState(initialValue);
  const [checkPassword, setCheckPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [ValidationError, setValidationError] = useState("");
  // const [captchaInput, setCaptchaInput] = useState("");
  // const [captchaImage, setCaptchaImage] = useState("");
  const router = useRouter();
  // useEffect(()=>{
  //   fetchCaptcha();
  // },[]);
  // const fetchCaptcha = async ()=>{
  //   const res = await api.get("/api/auth/captcha");
  // console.log("the response is",res)
  //   const svg = await res.data;
    
  //   setCaptchaImage(svg);
  // }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

   try {
     const response = await api.post("/api/auth/signup",{
      ...formData,
    });
    const data = response.data;
    if(data.success){
      router.push("/signin")
    } else{
      setError(data.message);
    }
    if(data.error){
      setValidationError(data.error);
    }
   } catch (error) {
    console.log("Signup error",error.response.data);
    setError(error.response.data.message || error.response.data.error || "An error occurred during signup");
   }
  }
  useEffect(() => {
    if (formData.confirmPassword.length > 0) {
      setCheckPassword(formData.password === formData.confirmPassword);
    }
  }, [formData.confirmPassword, formData.password])
  return (
    <div className='flex justify-center  items-center px-4 md:px-0 py-10'>
      <div className='p-8 border border-[#ccc] bg-white w-full max-w-125 rounded-md'>
          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
          {ValidationError && <p className='text-red-500 text-center mb-4'>{ValidationError}</p>}
        <div className=' mt-2'>
          <h2 className='font-medium text-center mb-5 text-2xl tracking-wider'><span>SIGN UP</span></h2>
          <p className='text-[#423f3f] not-italic font-light m-0 text-center'>Create an account</p>
        </div>
        <form onSubmit={handleSubmit} className=' flex flex-col gap-2 p-4'>
          <div>
            <label htmlFor="Name" className="block mb-3 tracking-wider leading-5 ">Full Name</label>
            <input
              id='Name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              type="text"
              required
              placeholder='Enter Name' className='max-w-108 min-h-8 w-full border border-[#d7d6d6] p-2' />
          </div>
          <div>
            <label htmlFor="email" className="block mb-3 tracking-wider leading-5 ">E-Mail Address</label>
            <input type="email"
              id='email'
              name='email'
              required
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter E-mail' className='max-w-108 min-h-8 w-full border border-[#d7d6d6] p-2' />
          </div>

          <div>
            <label htmlFor="password" className="block mb-3 tracking-wider leading-5 ">Password</label>
            <div className='relative'>
              <input type={showPassword ? "text" : "password"}
                id='password'
                name='password'
                required
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter Password' className='max-w-108 min-h-8 w-full border border-[#d7d6d6] p-2' />

              <div className='absolute right-2 top-2' onClick={() => {
                setShowPassword(!showPassword)

              }}>
                {showPassword ? <span> <Eye /></span> : <span> <EyeOff /></span>}
              </div>
            </div>


          </div>

          <div>
            <label htmlFor="confirmpassword" className="block mb-3 tracking-wider leading-5 ">Confirm Password</label>
            <input type={showPassword ? "text" : "password"}
              id='confirmpassword'
              name='confirmPassword'
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm Password' className={`max-w-108 min-h-8 outline-none border border-[#d7d6d6] w-full ${formData.confirmPassword.length > 0 && (checkPassword ? "border border-[#d7d6d6]" : "border border-red-500 ")}    p-2`} />
          </div>

           {/* <div>
              <div className='flex items-center gap-4'>
                <input type="text" id='captcha' name='captchaInput' value={captchaInput} onChange={(e)=>setCaptchaInput(e.target.value)} placeholder='Enter Captcha' className='max-w-108 min-h-8 w-full border border-[#d7d6d6] p-2' />
              <div dangerouslySetInnerHTML={{__html:captchaImage}} />
                <button type='button' onClick={fetchCaptcha} className='px-3 cursor-pointer py-1 text-white bg-gray-500 border-none font-medium text-[14px] tracking-wide'>Refresh</button>
              </div>
            </div>*/}

          <div className='mt-4 font-bold relative'>
            <input type="checkbox" required id='checkbox' className='' />
            <label htmlFor="checkbox" className='pl-2 absolute -top-0.5'>I agree to <span>Terms and Condition</span></label>
          </div>
          <div className='flex justify-center mt-4 mb-4 mx-35'>
            <button
              type='submit'
              className='px-10.5 py-2.5 cursor-pointer text-white bg-black border-none mr-4 font-medium text-[16px] tracking-wide' >
              Register
            </button>
          </div>
          <div className='border-b border-[#ccc] mt-2 relative mx-2 mb-4'>
            <div className='absolute left-30 md:left-45 -top-3 bg-gray-50'>
              <p>OR</p>
            </div>
          </div>

        </form>
        <div className='flex justify-center items-center mb-4'>
          <span>Already have an account?</span>
          <Link href="/signin" className='font-bold'>Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup