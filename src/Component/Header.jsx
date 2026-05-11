"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User, Heart, Menu, House,Dot } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/Context/ProductContext";
import {  usePathname, useRouter } from "next/navigation";
import api from "@/app/api/axios";



export default function Header() {
  const { whishlist, cartItem,user,isUserPresent } = useContext(Context);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating,setAnimating]= useState(false);
  const [openProfile,setOpenProfile] = useState(false)
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
  if (isMobile) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isMobile]);
const closeMenu = () => {
    setAnimating(true);
    setIsMobile(false);
    setTimeout(() => {
      setAnimating(false)
    }, 500);
  }

  const handleLogout = async ()=>{
   const res = await api.post("/api/auth/logout");
     if(res.data.success){
      router.push("/signin");
     } else{
      toast.error("Logout failed. Please try again.");
     }
  }
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* 🔹 Logo + Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/ebooklogo.png"
              alt="Ebook Logo"
              width={60}
              height={60}
              className="rounded"
            />
            <div className="leading-tight text-gray-900">
              <h1 className="text-xl font-bold tracking-tight">EBOOK HUB</h1>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-0.5">Read • Learn • Grow</p>
            </div>
          </Link>

          {/* 🔹 Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium">
            <Link href="/" className="hover:text-indigo-600 transition-colors duration-200">
              Home
            </Link>

            <a href={`${pathname === "/" ? "#toprecommended" : "/"}`} className="hover:text-indigo-600 transition-colors duration-200">
              Top Recommended
            </a>

            <a href={`${pathname === "/" ? "#ProgrammingAndTech" : "/"}`} className="hover:text-indigo-600 transition-colors duration-200">
              Programming And Tech
            </a>

            <a href={`${pathname === "/" ? "#FreeBooks" : "/"}`} className="hover:text-indigo-600 transition-colors duration-200">
              Free Reading Collection
            </a>

            <a href={`${pathname === "/" ? "#NewArrivals" : "/"}`} className="hover:text-indigo-600 transition-colors duration-200">
              New Arrivals
            </a>
          </nav>



          {/* 🔹 Actions */}
          <div className="flex items-center gap-5 text-gray-700">
            <Link href="/wishlist" className="hidden md:block md:relative group">
              <Heart className="w-5 h-5 cursor-pointer group-hover:text-indigo-600 transition-colors" />
              <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-full shadow-sm">
                {whishlist.length}
              </span>
            </Link >

            <Link href="/cart" className="hidden md:block relative group">
              <ShoppingCart className="w-5 h-5 cursor-pointer group-hover:text-indigo-600 transition-colors" />
              <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-full shadow-sm">
                {cartItem.length||0}
              </span>
            </Link>
            {isUserPresent ? (<button onClick={()=>{
              setOpenProfile(!openProfile)
            }} className="hidden md:flex items-center cursor-pointer gap-2 bg-indigo-600 text-white px-5 py-2 text-sm rounded-full font-medium hover:bg-indigo-700 shadow-sm transition-all duration-200">
              <User className="w-4 h-4" />
               Profile
            </button >) : (
              <Link href="/signin" className="hidden md:flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 text-sm rounded-full font-medium hover:bg-indigo-700 shadow-sm transition-all duration-200">
                <User className="w-4 h-4" />
                Sign In
              </Link >
            )}
            <button className="block md:hidden text-gray-700 hover:text-indigo-600 transition" onClick={()=>setIsMobile(true)}>
                  <Menu />
            </button>
          </div>
        </div>

       

      </header>
      <div className="flex justify-evenly py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 items-center md:hidden w-full bg-white/90 backdrop-blur-md text-gray-700 fixed bottom-0 border-t border-gray-100">

        <Link href="/" className="hover:text-indigo-600 transition-colors">
          <House className="w-6 h-6" />
        </Link>

        <Link href="/wishlist" className="relative group">
          <Heart className="w-6 h-6 cursor-pointer group-hover:text-indigo-600 transition-colors" />
          <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-full shadow-sm">
            {whishlist.length}
          </span>
        </Link >
        <Link href="/cart" className="relative group">
          <ShoppingCart className="w-6 h-6 cursor-pointer group-hover:text-indigo-600 transition-colors" />
          <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-full shadow-sm">
            {cartItem.length||0}
          </span>
        </Link>



      </div>
       {(isMobile||isAnimating)&&(
        <div className={`fixed w-full h-screen  ${isMobile ? "animate-in slide-in-from-right duration-500 ": "animate-out slide-out-to-right duration-500"} bg-black/20 backdrop-blur-sm top-0 z-50`} onClick={closeMenu}>
          <div className="w-64 bg-white h-screen flex flex-col gap-10 absolute right-0 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col mt-12 px-6 gap-6 text-gray-700 text-sm font-medium">
            <Link href="/" onClick={closeMenu} className="hover:text-indigo-600 flex items-center gap-2 transition">
             <Dot className="w-4 h-4 text-indigo-600" />
              Home
            </Link>

            <a href={`${pathname === "/" ? "#top-recommended" : "/"}`} onClick={closeMenu} className="hover:text-indigo-600 flex items-center gap-2 transition">
               <Dot className="w-4 h-4 text-indigo-600" />
              Top Recommended
            </a>

            <a href={`${pathname === "/" ? "#programming-and-tech" : "/"}`} onClick={closeMenu} className="hover:text-indigo-600 flex items-center gap-2 transition">
               <Dot className="w-4 h-4 text-indigo-600" />
              Programming And Tech
            </a>

            <a href={`${pathname === "/" ? "#free-books" : "/"}`} onClick={closeMenu} className="hover:text-indigo-600 flex items-center gap-2 transition">
               <Dot className="w-4 h-4 text-indigo-600" />
              Free Reading Collection
            </a>

            <a href={`${pathname === "/" ? "#new-arrivals" : "/"}`} onClick={closeMenu} className="hover:text-indigo-600 flex items-center gap-2 transition">
               <Dot className="w-4 h-4 text-indigo-600" />
              New Arrivals
            </a>
          </nav>
           <div className="px-6 mt-auto mb-10" onClick={closeMenu}>
            {isUserPresent > 0 ? (<button onClick={handleLogout} className="flex items-center justify-center w-full gap-2 bg-indigo-50 text-indigo-700 px-4 py-3 rounded-xl font-medium hover:bg-indigo-100 transition">
              <User className="w-4 h-4" />
              Sign Out
            </button >) : (
              <Link href="/signin" className="flex items-center justify-center w-full gap-2 bg-indigo-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-indigo-700 shadow-md transition">
                <User className="w-4 h-4" />
                Sign In
              </Link >
            )}
            </div>
       </div>
         </div>)}
           {openProfile&&<div onClick={(e)=>{
             
             setOpenProfile(!openProfile)
           }} className={`w-full h-screen flex ${!isMobile ? "animate-in slide-in-from-right duration-500 ": "animate-out slide-out-to-right duration-500"} bg-black/10 backdrop-blur-sm fixed top-0 z-50 `}>
             <div onClick={(e)=>e.stopPropagation()} className="w-80 h-screen absolute right-0 bg-white shadow-2xl flex flex-col">
             <div className="p-8 border-b border-gray-100 bg-gray-50/50">
               <p className="text-left font-semibold text-xl text-gray-900 flex items-center gap-2"><User className="w-5 h-5 text-indigo-600" /> My Profile</p>
             </div>
             <div className="flex-1 p-8 flex flex-col justify-between">
               <div className="flex flex-col gap-6">
             
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Email Address</p>
                 <p className="text-gray-900 font-medium break-all">{user.userEmail}</p>
               </div>
               
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Full Name</p>
                 <p className="text-gray-900 font-medium">{user.userName}</p>
               </div>
             </div>
 
               <div className="mt-8">
                 <button onClick={()=>{
                    setOpenProfile(false);
                    handleLogout();
                 }} className="w-full bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer rounded-xl font-medium px-6 py-3 transition-colors duration-200 flex items-center justify-center gap-2">
                   Log Out
                 </button>
               </div>
             </div>
             </div>
            
          
            
          </div>}
      </>
    );
  }
