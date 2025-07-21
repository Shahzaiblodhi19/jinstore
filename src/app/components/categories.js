"use client";
import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";
import cat4 from "../assets/cat4.png";
import cat5 from "../assets/cat5.png";
import cat6 from "../assets/cat6.png";
import cat7 from "../assets/cat7.png";
import cat8 from "../assets/cat8.png";
import cat9 from "../assets/cat9.png";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "Fruits & Vegetables", image: cat1 },
  { name: "Baby & Pregnancy", image: cat2 },
  { name: "Beverages", image: cat3 },
  { name: "Meats & Seafood", image: cat4 },
  { name: "Biscuits & Snacks", image: cat5 },
  { name: "Breads & Bakery", image: cat6 },
  { name: "Breakfast & Dairy", image: cat7 },
  { name: "Frozen Foods", image: cat8 },
  { name: "Grocery & Staples", image: cat9 },
];

export default function CategoryGrid() {
  useEffect(() => {
    gsap.utils.toArray(".cat-item").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section className="container mx-auto pb-10">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-6 text-center">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="category-item cat-item flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-6">
              <Image
                src={cat.image}
                alt={cat.name}
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
            <p className="text-[13px] font-semibold text-[#030712] transition-colors duration-300 group-hover:text-[#6C5DD3]">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
