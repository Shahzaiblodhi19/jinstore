"use client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Image from "next/image";
import gsap from "gsap";
import Slider from "react-slick";
import fp1 from "../assets/fp1.png";
import fp2 from "../assets/fp1.2.jpg";
import fp3 from "../assets/fp1.3.jpg";

const images = [fp1, fp2, fp3];
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-white hover:text-white p-1.5 rounded-full shadow cursor-pointer transition-all duration-300 hover:bg-[#634C9F]"
  >
    <svg
      className="w-4.5 h-4.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-white hover:text-white p-1.5 rounded-full shadow cursor-pointer transition-all duration-300 hover:bg-[#634C9F]"
  >
    <svg
      className="w-4.5 h-4.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

export default function ProductPage() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const sliderMain = useRef(null);
  const sliderThumb = useRef(null);

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  const nextImage = () => {
    const next = (imageIndex + 1) % images.length;
    setImageIndex(next);
    sliderMain.current.slickGoTo(next);
  };
  const prevImage = () => {
    const prev = (imageIndex - 1) % images.length;
    setImageIndex(prev);
    sliderMain.current.slickGoTo(prev);
  };

  useEffect(() => {
    if (sliderMain.current) {
      setNav1(sliderMain.current);
    }
    if (sliderThumb.current) {
      setNav2(sliderThumb.current);
    }
  }, []);

  const settingsMain = {
    asNavFor: nav2,
    arrows: true,
    infinite: false,
    dots: false,
    afterChange: (i) => setImageIndex(i),
  };

  const settingsThumb = {
    slidesToShow: 8,
    swipeToSlide: true,
    infinite: false,
    asNavFor: nav1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isFullscreen) {
      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          y: 30,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.5,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 30,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isFullscreen]);
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [imageIndex]);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 py-6 gap-8">
      {/* IMAGE SLIDER */}
      <div className="md:col-span-5 relative">
        <Slider {...settingsMain} ref={sliderMain}>
          {images.map((img, i) => (
            <div key={i}>
              <Image
                src={img.src}
                alt={`banana-${i}`}
                width={500}
                height={500}
                className="mx-auto rounded-lg cursor-grab"
              />
            </div>
          ))}
        </Slider>
        <div className="absolute top-1 left-4 ">
          <span className="bg-[#DC2626] text-[#FEF2F2] text-[10px] font-bold px-2 py-1 rounded-full">
            50%
          </span>
          <span className="flex items-center gap-1 mt-2 text-[10px] px-2 py-1 bg-[linear-gradient(90deg,_#D4FC79_0%,_#96E6A1_50%)] text-[#166534] rounded-full font-extrabold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
            >
              <path
                d="M2.29297 3.388H0.667969C0.667969 6.521 3.21597 9.069 6.36197 9.069V12.319C6.36197 12.787 6.72597 13.164 7.14197 13.164C7.55797 13.164 7.98697 12.787 7.98697 12.345V9.095C7.98697 5.949 5.43897 3.388 2.29297 3.388ZM12.043 1.776C9.89797 1.776 8.05197 2.959 7.07697 4.714C7.77897 5.468 8.29897 6.404 8.57197 7.444C11.432 7.145 13.668 4.727 13.668 1.776H12.043Z"
                fill="#166534"
              />
            </svg>{" "}
            ORGANIC
          </span>
        </div>

        <div
          onClick={openFullscreen}
          className="absolute bottom-25 left-0 bg-white p-4 rounded-full shadow hover:bg-[#634C9F] cursor-pointer hover:text-white transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 35 36"
            fill="none"
          >
            <path
              d="M33.5846 24.1745C33.2128 24.1745 32.884 24.3055 32.598 24.5673C32.3121 24.8291 32.1691 25.1782 32.1691 25.6145V31.0691L23.7623 22.5164C23.4763 22.2545 23.1475 22.1236 22.7757 22.1236C22.404 22.1236 22.0752 22.2545 21.7892 22.5164C21.5033 22.7782 21.3674 23.1127 21.3817 23.52C21.396 23.9273 21.5319 24.2618 21.7892 24.5236L30.1961 33.0764H24.8346C24.4628 33.0764 24.134 33.2145 23.848 33.4909C23.5621 33.7673 23.4191 34.1164 23.4191 34.5382C23.4191 34.96 23.5478 35.3091 23.8051 35.5855C24.0625 35.8618 24.4056 36 24.8346 36H33.5846C33.8133 36 33.9992 35.9418 34.1422 35.8255C34.2279 35.8255 34.3066 35.7818 34.3781 35.6945C34.4496 35.6073 34.4853 35.52 34.4853 35.4327C34.4853 35.3455 34.521 35.2655 34.5925 35.1927C34.664 35.12 34.7426 35.0836 34.8284 35.0836C34.8284 35.0255 34.857 34.9382 34.9142 34.8218C34.9714 34.7055 35 34.6036 35 34.5164V25.7891C35 25.2655 34.8642 24.8655 34.5925 24.5891C34.3209 24.3127 33.9849 24.1745 33.5846 24.1745ZM11.2377 22.3418L2.83088 30.8945V25.44C2.83088 25.0618 2.70221 24.7273 2.44485 24.4364C2.1875 24.1455 1.83721 24 1.394 24C0.950776 24 0.607639 24.1236 0.364583 24.3709C0.121528 24.6182 0 24.9745 0 25.44V34.1673C0 34.4 0.0571895 34.5891 0.171569 34.7345C0.171569 34.8218 0.207312 34.9018 0.278799 34.9745C0.350286 35.0473 0.428922 35.0836 0.514706 35.0836C0.60049 35.0836 0.686275 35.12 0.772059 35.1927C0.857843 35.2655 0.900735 35.3455 0.900735 35.4327C0.957925 35.4327 1.04371 35.4618 1.15809 35.52C1.27247 35.5782 1.35825 35.6073 1.41544 35.6073H9.99387C10.3656 35.6073 10.6944 35.4764 10.9804 35.2145C11.2663 34.9527 11.4093 34.5964 11.4093 34.1455C11.4093 33.6945 11.2878 33.3455 11.0447 33.0982C10.8017 32.8509 10.4514 32.7273 9.99387 32.7273H4.63235L13.0392 24.1745C13.2966 23.8836 13.4252 23.5418 13.4252 23.1491C13.4252 22.7564 13.2966 22.4291 13.0392 22.1673C12.7819 21.9055 12.4888 21.8036 12.1599 21.8618C11.8311 21.92 11.5237 22.08 11.2377 22.3418ZM34.8284 0.872728C34.8284 0.785455 34.7927 0.705455 34.7212 0.632728C34.6497 0.560001 34.5711 0.523637 34.4853 0.523637C34.3995 0.523637 34.3209 0.487273 34.2494 0.414546C34.1779 0.341819 34.1422 0.261819 34.1422 0.174546C34.0564 0.174546 33.9563 0.145455 33.8419 0.0872733C33.7275 0.0290914 33.6417 5.25266e-07 33.5846 5.25266e-07H25.0061C24.6344 5.25266e-07 24.3056 0.13091 24.0196 0.392728C23.7337 0.654546 23.5907 1.01091 23.5907 1.46182C23.5907 1.91273 23.7122 2.26182 23.9553 2.50909C24.1983 2.75636 24.5486 2.88 25.0061 2.88H30.3676L21.9608 11.4327C21.7034 11.7236 21.5748 12.0582 21.5748 12.4364C21.5748 12.8145 21.7034 13.1491 21.9608 13.44C22.0466 13.5273 22.1752 13.6073 22.3468 13.68C22.5184 13.7527 22.69 13.7891 22.8615 13.7891C23.0331 13.7891 23.2047 13.7527 23.3762 13.68C23.5478 13.6073 23.6765 13.5273 23.7623 13.44L32.1691 4.88727V10.3418C32.1691 10.72 32.2978 11.0545 32.5551 11.3455C32.8125 11.6364 33.1628 11.7818 33.606 11.7818C34.0492 11.7818 34.3924 11.6582 34.6354 11.4109C34.8785 11.1636 35 10.8073 35 10.3418V1.44C35 1.38182 34.9714 1.29455 34.9142 1.17818C34.857 1.06182 34.8284 0.960001 34.8284 0.872728ZM4.63235 2.88H9.99387C10.3656 2.88 10.6944 2.74909 10.9804 2.48727C11.2663 2.22546 11.4093 1.87636 11.4093 1.44C11.4093 1.00364 11.2735 0.683637 11.0018 0.480001C10.7302 0.276364 10.3942 0.174546 9.99387 0.174546H1.41544C1.18668 0.174546 1.01511 0.232728 0.900735 0.349091C0.786356 0.349091 0.693423 0.385455 0.621936 0.458182C0.550449 0.53091 0.514706 0.603637 0.514706 0.676364C0.514706 0.749091 0.457516 0.785455 0.343137 0.785455C0.228758 0.785455 0.171569 0.821819 0.171569 0.894546C0.171569 0.967273 0.142974 1.06182 0.0857843 1.17818C0.0285948 1.29455 0 1.38182 0 1.44V10.1673C0 10.5455 0.128676 10.88 0.386029 11.1709C0.643382 11.4618 0.993668 11.6073 1.43689 11.6073C1.88011 11.6073 2.22324 11.4836 2.4663 11.2364C2.70935 10.9891 2.83088 10.6327 2.83088 10.1673V4.71273L11.2377 13.2655C11.3235 13.44 11.4522 13.5709 11.6238 13.6582C11.7953 13.7455 11.9669 13.7891 12.1385 13.7891C12.31 13.7891 12.4816 13.7527 12.6532 13.68C12.8248 13.6073 12.9534 13.5273 13.0392 13.44C13.2966 13.1491 13.4252 12.8145 13.4252 12.4364C13.4252 12.0582 13.2966 11.7236 13.0392 11.4327L4.63235 2.88Z"
              fill="currentColor"
              fillOpacity="1"
            />
          </svg>
        </div>
        <Slider ref={sliderThumb} {...settingsThumb}>
          {images.map((img, i) => (
            <div key={i} className="!w-auto px-1 flex justify-center">
              <Image
                src={img}
                alt={`thumb-${i}`}
                width={70}
                height={70}
                onClick={() => {
                  if (sliderMain.current?.slickGoTo) {
                    sliderMain.current.slickGoTo(i);
                    setImageIndex(i);
                  }
                }}
                className={`rounded-md border cursor-pointer transition-all ${
                  imageIndex === i ? "border-[#634C9F]" : "border-[#E5E7EB]"
                }`}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="md:col-span-7">
        <h1 className="text-3xl font-bold mb-2">
          Marketside Fresh Organic Bananas, Bunch
        </h1>
        <p className="text-gray-500 mb-3">SKU: E7F8G9H0</p>

        <div className="text-red-600 text-2xl font-bold mb-2">
          $0.89{" "}
          <span className="line-through text-sm text-gray-500 ml-2">$1.99</span>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus
          malesuada tincidunt.
        </p>

        <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">
          Order on WhatsApp
        </button>

        {/* Quantity Selector */}
        <div className="flex items-center gap-3 mb-4">
          <button
            className="bg-gray-200 px-3 py-1 rounded text-lg"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="bg-gray-200 px-3 py-1 rounded text-lg"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        <div className="flex gap-4 mb-4">
          <button className="bg-green-600 text-white px-5 py-2 rounded">
            Add to cart
          </button>
          <button className="bg-black text-white px-5 py-2 rounded">
            Buy Now
          </button>
        </div>

        {/* Extra Info */}
        <div className="mt-6 text-sm text-gray-600 space-y-2">
          <p>
            <strong>Payment:</strong> Google Pay, Online Card, 5% discount on
            card payment.
          </p>
          <p>
            <strong>Warranty:</strong> No return if the product is in good
            condition.
          </p>
        </div>
      </div>

      {/* FULLSCREEN IMAGE VIEW */}
      <div
        ref={modalRef}
        className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={closeFullscreen}
          className="absolute top-5 right-5 text-white text-3xl p-2 hover:scale-110 hover:text-gray-300 transition-transform duration-200 ease-in-out cursor-pointer"
          aria-label="Close fullscreen"
        >
          <AiOutlineClose />
        </button>

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute left-10 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl shadow-md transition-all duration-200 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <AiOutlineLeft />
        </button>

        {/* Animated Image */}
        <div className="max-h-[90vh]" ref={imageRef}>
          <Image
            src={images[imageIndex]}
            alt={`fullscreen-${imageIndex}`}
            width={800}
            height={800}
            className="object-contain"
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl shadow-md transition-all duration-200 backdrop-blur-sm"
          aria-label="Next image"
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
}
