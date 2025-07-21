"use client";
import React, { useEffect, useRef } from "react";
import banner from "../assets/discountBanner.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Discount50Banner = () => {
  const bannerRef = useRef(null);
  const textRef = useRef([]);

  useEffect(() => {
    const el = bannerRef.current;
    const textEls = textRef.current;

    // Banner fade-up
    gsap.fromTo(
      el,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    // Text stagger animation
    gsap.fromTo(
      textEls,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div className="container pb-10 hidden md:block" ref={bannerRef}>
      <div
        className="bg-center bg-cover px-8 py-5 border border-[#FFEDD5] rounded-lg"
        style={{
          backgroundImage: `url(${banner.src})`,
        }}
      >
        <h3
          className="text-[19px] text-[#EA580C] font-bold"
          ref={(el) => (textRef.current[0] = el)}
        >
          In store or online your health & safety is our top priority
        </h3>
        <p
          className="text-[#6B7280] text-[12px] mt-1"
          ref={(el) => (textRef.current[1] = el)}
        >
          The only supermarket that makes your life easier, makes you enjoy life
          and makes it better
        </p>
      </div>
    </div>
  );
};

export default Discount50Banner;
