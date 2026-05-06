"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
const images = [
  "/ebookHero.jpg",
  "/ebookHero2.jpg",
  "/ebookHero3.jpg",
  "/ebookHero4.jpg",
];
export default function Hero() {
  return (
    <section className="relative flex items-center justify-center h-[70vh] w-full">

      {/* Background Image */}
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
         speed={600} 
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[70vh]"
      >

        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative  h-[70vh] w-full ">
              <Image
                src={src}
                alt="Ebook Hero"
                fill
                loading="eager"
                 sizes="(max-width: 768px) 100vw, 25vw"
                className=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
              <div className="absolute inset-0 bg-indigo-900/10 mix-blend-multiply"></div>
              <div className="absolute z-10 max-w-2xl md:max-w-4xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-widest uppercase shadow-xl">
                  Welcome to Ebook Hub
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
                  Discover Your Next <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Favorite Book</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto drop-shadow-md">
                  Read academic, competitive, and fiction books anytime, anywhere.
                  Your digital library starts here.
                </p>

                <div className="mt-10 flex justify-center gap-4 flex-wrap">
                  <Link href="/explore" className="bg-indigo-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-indigo-700 hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-300">
                    Explore Books
                  </Link>

                  <a href="#toprecommended"  className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                    Top Recommended
                  </a >
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}


      </Swiper>





      {/* Content */}


    </section>
  );
}
