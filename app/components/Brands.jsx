"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import Link from "next/link";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function Brands({ brands }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5">
      {/* Shop By Brands Section with Modern Outer Border */}
      <div className="border-2 border-gray-200 rounded-lg shadow-lg p-5 bg-white">
        <div className="flex justify-center w-full">
          <h1 className="text-2xl font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300">
            Shop By Brands
          </h1>
        </div>
      </div>

      {/* Brands Carousel */}
      <Slider {...settings}>
        {brands.map((brand) => (
          <Link href={`/brands/${brand.id}`} key={brand.id}>
            <div className="px-2">
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="h-20 rounded-lg md:p-5 p-2 border overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={brand?.imageURL}
                    alt={brand?.name}
                  />
                </div>
                <h2 className="text-center font-semibold text-gray-600">
                  {brand.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
