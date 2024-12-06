"use client";

import { Button } from "@nextui-org/react";
import { collection } from "firebase/firestore";
import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";
import './Categories.css'


export default function Categories({ categories }) {
  var settings = {
    dots: true,
    infinite: true, // Makes the slider loop infinitely
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // Enables automatic sliding
    autoplaySpeed: 3000, // Time in milliseconds before sliding
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  if (categories.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5">
      <div className="flex justify-center w-full">
        <h1 className="text-2xl font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300">
          Shop By Category
        </h1>
      </div>
      <Slider {...settings}>
        {(categories?.length <= 2
          ? [...categories, ...categories, ...categories]
          : categories
        )?.map((category) => {
          return (
            <Link href={`/categories/${category?.id}`} key={category?.id}>
              <div className="px-2 category-card">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="md:h-32 md:w-32 h-24 w-24 rounded-full md:p-5 p-2 border overflow-hidden category-image-container">
                    <img
                      src={category?.imageURL}
                      alt={category?.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h1 className="font-semibold text-gray-600 hover:text-blue-500 transition-colors duration-300">
                    {category?.name}
                  </h1>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}
