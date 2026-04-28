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
                 sizes="(max-width: 768px) 100vw, 25vw"
                className=""
              />
              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="absolute z-10 max-w-2xl md:max-w-4xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <h1 className="text-2xl md:text-6xl font-bold leading-tight">
                  Discover Your Next <span className="text-yellow-400">Favorite Book</span>
                </h1>

                <p className="mt-5 text-lg md:text-xl text-gray-200">
                  Read academic, competitive, and fiction books anytime, anywhere.
                  Your digital library starts here.
                </p>

                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <Link href="/explore" className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
                    Explore Books
                  </Link>

                  <a href="#toprecommended"  className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
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
