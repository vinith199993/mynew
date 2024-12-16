"use client";

import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { useRef } from "react";

export default function FeaturedProductSlider({ featuredProducts }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className="slider-container relative overflow-hidden bg-gradient-to-b from-white via-gray-100 to-gray-300 py-10 px-4 sm:px-6">
      <Slider {...settings} ref={sliderRef}>
        {featuredProducts?.map((product, index) => (
          <div key={index} className="slide">
            <div className="flex flex-col-reverse md:flex-row gap-6 bg-white shadow-xl rounded-lg p-4 sm:p-6 md:px-20 md:py-16 w-full">
              {/* Text Section */}
              <div className="flex-1 flex flex-col gap-4 sm:gap-6">
                <h2 className="text-sm sm:text-lg tracking-widest font-semibold bg-gradient-to-r from-green-400 via-white-500 to-white-600 inline-block px-4 py-2 rounded-md shadow-md">
                  NEW ARRIVAL
                </h2>
                <div className="flex flex-col gap-3 sm:gap-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-4 sm:p-6">
                  <Link href={`/products/${product?.id}`}>
                    <h1 className="text-lg sm:text-2xl md:text-4xl font-bold text-white transition-transform transform hover:scale-105 hover:text-yellow-300">
                      {product?.title}
                    </h1>
                  </Link>
                  <p className="text-gray-200 text-sm md:text-base line-clamp-4 transition-opacity hover:opacity-90">
                    {product?.shortDescription}
                  </p>
                </div>
                <AuthContextProvider>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-lg shadow-md transition-all">
                        BUY NOW
                      </button>
                    </Link>
                    <AddToCartButton productId={product?.id} type={"large"} />
                    <FavoriteButton productId={product?.id} />
                  </div>
                </AuthContextProvider>
              </div>
              {/* Image Section */}
              <div className="flex-1">
                <Link href={`/products/${product?.id}`}>
                  <img
                    className="h-[12rem] sm:h-[14rem] md:h-[20rem] w-full object-cover rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-500 ease-in-out"
                    src={product?.featureImageURL}
                    alt={product?.title}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Navigation Buttons */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute top-1/2 left-4 sm:left-6 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-400 text-gray-600 rounded-full p-2 sm:p-3 shadow-lg z-10 transition-all"
      >
        &#9664;
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="absolute top-1/2 right-4 sm:right-6 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-400 text-gray-600 rounded-full p-2 sm:p-3 shadow-lg z-10 transition-all"
      >
        &#9654;
      </button>
    </div>
  );
}
