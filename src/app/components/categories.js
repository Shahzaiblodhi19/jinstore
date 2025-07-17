"use client";
import Image from "next/image";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";
import cat4 from "../assets/cat4.png";
import cat5 from "../assets/cat5.png";
import cat6 from "../assets/cat6.png";
import cat7 from "../assets/cat7.png";
import cat8 from "../assets/cat8.png";
import cat9 from "../assets/cat9.png";


// Sample category data
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
  return (
    <section className="container mx-auto pb-10">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-6 text-center">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                width={96}
                height={96}
                className="object-contain hover:scale-105 transition-transform duration-200 ease-in-out"
              />
            </div>
            <p className="text-[13px] font-semibold text-[#030712]">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
