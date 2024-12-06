"use client";

import { useState } from "react";
import ReactModal from "react-modal";

export default function Photos({ imageList }) {
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (imageList?.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Main Image Section */}
      <div
        className="flex justify-center w-full cursor-zoom-in"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          className="object-cover h-[350px] md:h-[430px] transition-transform duration-300 hover:scale-105"
          src={selectedImage}
          alt="Selected"
        />
      </div>

      {/* Thumbnail Section */}
      <div className="flex flex-wrap justify-center items-center gap-3">
        {imageList?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => setSelectedImage(item)}
              className={`w-[80px] border rounded p-2 ${
                item === selectedImage ? "border-blue-500" : "border-gray-300"
              } cursor-pointer hover:shadow-lg`}
            >
              <img className="object-cover" src={item} alt={`Thumbnail ${index}`} />
            </div>
          );
        })}
      </div>

      {/* Modal for Larger Image View */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Image Modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "transparent",
            border: "none",
          },
        }}
      >
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-white text-xl z-50"
          >
            ✖
          </button>
          <img
            src={selectedImage}
            className="object-contain max-h-screen max-w-screen"
            alt="Modal View"
          />
        </div>
      </ReactModal>
    </div>
  );
}
