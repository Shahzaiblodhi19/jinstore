import React from "react";
import banner from "../assets/discountBanner.png";

const Discount50Banner = () => {
  return (
    <div className="container pb-10 hidden md:block">
      <div
        className="bg-center bg-cover px-8 py-5 border border-[#FFEDD5] rounded-lg"
        style={{
          backgroundImage: `url(${banner.src})`,
        }}
      >
        <h3 className="text-[19px] text-[#EA580C] font-bold">
          In store or online your health & safety is our top priority
        </h3>
        <p className="text-[#6B7280] text-[12px] mt-1">
          The only supermarket that makes your life easier, makes you enjoy life
          and makes it better
        </p>
      </div>
    </div>
  );
};

export default Discount50Banner;
