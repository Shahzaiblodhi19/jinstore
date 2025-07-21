"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Banner1 from "../assets/heroBanner1.jpg";
import Banner2 from "../assets/heroBanner2.png";

const slides = [
  {
    id: 1,
    image: Banner1,
    tag: "Weekend Discount",
    title: "Get the best quality products at the lowest prices",
    description:
      "We have prepared special discounts for you on grocery products. Don't miss these opportunities...",
    price: "$27.99",
    original: "$56.67",
  },
  {
    id: 2,
    image: Banner2,
    tag: "Super Sale",
    title: "Shopping with us for better quality and the best price",
    description:
      "We have prepared special discounts for you on grocery products. Don't miss these opportunities...",
    price: "$21.87",
    original: "$26.67",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const contentRef = useRef([]);
  const slideWrapperRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!contentRef.current[current]) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          slideWrapperRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
        .fromTo(
          contentRef.current[current].querySelectorAll(".anim"),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, contentRef);

    return () => ctx.revert();
  }, [current]);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center py-4 lg:min-h-[500px] min-h-fit z">
      {/* Sidebar space placeholder */}
      <div className="hidden lg:block w-80 flex-shrink-0 "></div>

      <div className="relative w-full">
        <div
          ref={slideWrapperRef}
          className="relative overflow-hidden rounded-xl bg-gray-100"
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div
                ref={(el) => (contentRef.current[idx] = el)}
                key={slide.id}
                className="w-full flex-shrink-0 bg-cover bg-center flex flex-col md:flex-row items-center"
                style={{ backgroundImage: `url(${slide.image.src})` }}
              >
                {/* Overlay */}
                <div className="bg-[#ffffff6d] md:bg-transparent pt-6 sm:pt-12 sm:pb-16 pb-12 lg:pt-16 lg:pb-32 w-full">
                  <div className="w-full px-4 sm:px-8 md:px-12">
                    <span
                      className="anim inline-block text-[#166534] font-semibold text-[10px] px-3 py-1 rounded-md"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(22, 163, 74, 0.50) 0%, rgba(34, 197, 94, 0.00) 60%)",
                      }}
                    >
                      {slide.tag}
                    </span>

                    <h2 className="anim text-[24px] sm:text-[30px] md:text-[35px] font-bold text-[#39245F] leading-tight mt-2 whitespace-pre-line md:w-[60%] lg:w-[45%]">
                      {slide.title}
                    </h2>

                    <p className="anim text-[#030712] text-sm md:text-[12px] mt-2 md:w-[80%] lg:w-[55%]">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 sm:mt-7">
                      <button className="anim bg-[#634C9F] hover:bg-purple-700 transition-all cursor-pointer text-white text-sm px-5 py-2.5 rounded-md flex items-center gap-3">
                        Shop Now{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 19 10"
                          fill="none"
                        >
                          <path
                            d="M18.9366 4.58853C18.9366 4.53865 18.919 4.49293 18.8838 4.45137C18.8485 4.40981 18.8098 4.38903 18.7675 4.38903L15.238 0.224439C15.0971 0.074813 14.9351 0 14.7519 0C14.5688 0 14.4067 0.074813 14.2659 0.224439C14.125 0.374065 14.058 0.565254 14.0651 0.798005C14.0721 1.03076 14.139 1.22195 14.2659 1.37157L16.6541 4.18953H0.697442C0.514275 4.18953 0.352243 4.26434 0.211346 4.41397C0.0704487 4.56359 0 4.76725 0 5.02494C0 5.28263 0.0634038 5.48213 0.190211 5.62344C0.317019 5.76475 0.486096 5.83541 0.697442 5.83541H16.7386L14.3504 8.65337C14.2236 8.80299 14.1602 8.99002 14.1602 9.21446C14.1602 9.4389 14.2236 9.63425 14.3504 9.8005C14.3927 9.85037 14.4561 9.89609 14.5406 9.93766C14.6251 9.97922 14.7097 10 14.7942 10C14.8788 10 14.9633 9.97922 15.0478 9.93766C15.1324 9.89609 15.1958 9.85037 15.238 9.8005L18.7675 5.63591C18.7957 5.60266 18.8239 5.5611 18.8521 5.51122C18.8802 5.46135 18.9084 5.43641 18.9366 5.43641C18.9789 5.22028 19 5.05403 19 4.93766C19 4.82128 18.9789 4.7049 18.9366 4.58853Z"
                            fill="white"
                          />
                        </svg>
                      </button>

                      <div className="anim">
                        <div className="flex items-center mt-1 sm:mt-0">
                          <p className="text-[#DC2626] font-bold text-lg sm:text-[20px] md:text-[24px] flex items-end">
                            {slide.price}
                          </p>
                          <span className="line-through text-[#111827] text-sm md:text-[16px] font-medium ml-2">
                            {slide.original}
                          </span>
                        </div>
                        <p className="text-xs text-[#030712] mt-1">
                          Don&apos;t miss this limited time offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex justify-center w-fit bg-white p-2 rounded-full gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                current === idx ? "bg-[#634C9F]" : "bg-[#E5E7EB]"
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
