"use client";

import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function Photos({ imageList }) {
  const [selectedImage, setSelectedImage] = useState(imageList[0]);

  if (imageList?.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Main Image Section */}
      <div className="flex justify-center w-full">
        <Zoom>
          <img
            className="object-cover h-[350px] md:h-[430px] transition-transform duration-300 hover:scale-105"
            src={selectedImage}
            alt="Selected"
          />
        </Zoom>
      </div>

      {/* Thumbnail Section */}
      <div className="flex flex-wrap justify-center items-center gap-3">
        {imageList?.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(item)}
            className={`w-[80px] border rounded p-2 ${
              item === selectedImage ? "border-blue-500" : "border-gray-300"
            } cursor-pointer hover:shadow-lg`}
          >
            <img className="object-cover" src={item} alt={`Thumbnail ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
