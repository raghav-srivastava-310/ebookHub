"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User, Heart, Menu, House,Dot } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/Context/ProductContext";
import {  useRouter } from "next/navigation";



export default function Header() {
  const { whishlist, cartItem,user,isUserPresent } = useContext(Context);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating,setAnimating]= useState(false);
  const [openProfile,setOpenProfile] = useState(false)

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

  const handleLogout =()=>{
    localStorage.removeItem("accessToken");
    setIsUserPresent(false);
    setOpenProfile(false);
    router.push("/signin")
  }
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black shadow-md">
        <div className=" mx-auto px-6 py-4 flex items-center justify-between">

          {/* 🔹 Logo + Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/ebooklogo.png"
              alt="Ebook Logo"
              width={60}
              height={60}
              className="rounded"
            />
            <div className="leading-tight text-white">
              <h1 className="text-xl font-bold">EBOOK HUB</h1>
              <p className="text-xs opacity-80">Read • Learn • Grow</p>
            </div>
          </Link>

          {/* 🔹 Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-white font-medium">
            <Link href="/" className="hover:text-yellow-300 transition">
              Home
            </Link>

            <a href="#toprecommended" className="hover:text-yellow-300 transition">
              Top Recommended
            </a>

            <a href="#ProgrammingAndTech" className="hover:text-yellow-300 transition">
              Programming And Tech
            </a>

            <a href="#FreeBooks" className="hover:text-yellow-300 transition">
              Free Reading Collection
            </a>

            <a href="#NewArrivals" className="hover:text-yellow-300 transition">
              New Arrivals
            </a>
          </nav>



          {/* 🔹 Actions */}
          <div className="flex items-center gap-5 text-white">
            <Link href="/wishlist" className="hidden md:block md:relative">
              <Heart className="w-5 h-5 cursor-pointer hover:text-yellow-300 transition" />
              <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black px-1 rounded-full">
                {whishlist.length}
              </span>
            </Link >

            <Link href="/cart" className="hidden md:block relative">
              <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-yellow-300 transition" />
              <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black px-1 rounded-full">
                {cartItem.length||0}
              </span>
            </Link>
            {isUserPresent ? (<button onClick={()=>{
              setOpenProfile(!openProfile)
            }} className="hidden md:flex items-center cursor-pointer gap-2 bg-white text-indigo-700 px-4 py-1.5 rounded-full font-medium hover:bg-yellow-300 transition">
              <User className="w-4 h-4" />
               Profile
            </button >) : (
              <Link href="/signin" className="hidden md:flex items-center gap-2 bg-white text-indigo-700 px-4 py-1.5 rounded-full font-medium hover:bg-yellow-300 transition">
                <User className="w-4 h-4" />
                Sign In
              </Link >
            )}
            <button className="block md:hidden" onClick={()=>setIsMobile(true)}>
                  <Menu />
            </button>
          </div>
        </div>

       

      </header>
      <div className="flex justify-evenly py-8 z-10 items-center md:hidden w-full bg-black text-white fixed bottom-0 ">

        <Link href="/">
          <House />
        </Link>

        <Link href="/wishlist" className="relative">
          <Heart className="w-5 h-5 cursor-pointer hover:text-yellow-300 transition" />
          <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black px-1 rounded-full">
            {whishlist.length}
          </span>
        </Link >
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-yellow-300 transition" />
          <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black px-1 rounded-full">
            {cartItem.length||0}
          </span>
        </Link>



      </div>
       {(isMobile||isAnimating)&&(
        <div className={`fixed w-full h-screen  ${isMobile ? "animate-in slide-in-from-right duration-500 ": "animate-out slide-out-to-right duration-500"}  top-0 z-50`} onClick={closeMenu}>
          <div className="w-4/6 bg-black h-screen flex flex-col gap-10   absolute right-0" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col mt-8  gap-8 text-white font-medium">
            <Link href="/" onClick={closeMenu} className="hover:text-yellow-300 flex gap-1 transition">
             <Dot />
              Home
            </Link>

            <a href="#toprecommended" onClick={closeMenu} className="hover:text-yellow-300 flex gap-1  transition">
               <Dot />
              Top Recommended
            </a>

            <a href="#ProgrammingAndTech" onClick={closeMenu} className="hover:text-yellow-300 flex gap-1 transition">
               <Dot />
              Programming And Tech
            </a>

            <a href="#FreeBooks" onClick={closeMenu} className="hover:text-yellow-300 flex gap-1 transition">
               <Dot />
              Free Reading Collection
            </a>

            <a href="#NewArrivals" onClick={closeMenu} className="hover:text-yellow-300 flex gap-1 transition">
               <Dot />
              New Arrivals
            </a>
          </nav>
           <div className="  pl-2 pr-24" onClick={closeMenu}>
            {isUserPresent > 0 ? (<button  className="flex items-center gap-2 bg-white text-indigo-700 px-4 py-1.5 rounded-full font-medium hover:bg-yellow-300 transition">
              <User className="w-4 h-4" />
              Sign Out
            </button >) : (
              <Link href="/signin" className="flex items-center gap-2 bg-white text-indigo-700 px-4 py-1.5 rounded-full font-medium hover:bg-yellow-300 transition">
                <User className="w-4 h-4" />
                Sign In
              </Link >
            )}
           </div>
      </div>
        </div>)}
          {openProfile&&<div onClick={(e)=>{
            
            setOpenProfile(!openProfile)
          }} className={`w-full h-screen flex ${!isMobile ? "animate-in slide-in-from-right duration-500 ": "animate-out slide-out-to-right duration-500"} fixed z-50 `}>
            <div onClick={(e)=>e.stopPropagation()} className="w-1/5 h-screen   absolute right-0 bg-white">
            <div className="m-10">
              <p className="text-center font-bold text-2xl ">Profile Detail</p>
            </div>
            <div className="flex gap-80 flex-col justify-between">
              <div className="flex flex-col items-center">
            
              <p className="text-black flex gap-2"><span className="font-bold">Email:</span>{user.userEmail}</p>
              <p className="text-black flex gap-2"><span className="font-bold">Name:</span>{user.userName}</p>
            </div>

              <div className="flex justify-center">
                <button onClick={handleLogout} className=" bg-yellow-300 cursor-pointer rounded-2xl px-8 py-2">
              log out
            </button>
              </div>
            </div>
            </div>
            
          
            
          </div>}
      </>
    );
  }
