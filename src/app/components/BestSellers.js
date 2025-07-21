"use client";
import { useEffect, useState , useRef} from "react";
import Link from "next/link";
import product1 from "../assets/fp1.png";
import product2 from "../assets/fp2.png";
import product3 from "../assets/fp3.png";
import product4 from "../assets/fp4.jpg";
import product5 from "../assets/fp5.png";
import product6 from "../assets/fp6.png";
import offerProduct from "../assets/offerProduct.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Mock product data
const products = [
  {
    id: 1,
    title: "Marketside Fresh Organic Bananas, Bunch",
    image: product1,
    discount: 56,
    price: 0.89,
    originalPrice: 1.99,
    rating: 3,
    tag: "ORGANIC",
    endTime:
      new Date().getTime() +
      77 * 3600 * 1000 +
      6 * 60 * 60 * 1000 +
      55 * 60 * 1000 +
      51 * 1000,
  },
  {
    id: 2,
    title: "Lay’s Classic Potato Snack Chips, Party Size, 13 oz Bag",
    image: product2,
    discount: 50,
    price: 1.0,
    rating: 2,
    originalPrice: 1.99,
    tag: "COLD SALE",
    endTime: new Date().getTime() + 3600 * 77 * 1000,
  },
  {
    id: 3,
    title: "Great Value Classic Crust Pepperoni Microwave Frozen Pizza",
    image: product3,
    discount: 51,
    rating: 4,
    price: 1.99,
    originalPrice: 3.99,
    tag: "ORGANIC",
    endTime: new Date().getTime() + 3600 * 75 * 1000,
  },
  {
    id: 4,
    title: "All Natural 85_15 Ground Beef – 1lb",
    image: offerProduct,
    discount: 12,
    tag: "COLD SALE",
    price: 7.75,
    rating: 3,
    originalPrice: 8.75,
    endTime: new Date().getTime() + 3600 * 77 * 1000,
    description:
      "Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper.",
  },
  {
    id: 5,
    title: "ACT Anticavity Fluoride Mouthwash With Zero Alcohol",
    image: product5,
    discount: 47,
    rating: 2,
    tag: "ORGANIC",
    price: 2.33,
    originalPrice: 4.33,
    endTime: new Date().getTime() + 3600 * 74 * 1000,
  },
  {
    id: 6,
    title: "FireSmith Flame Grilled Chicken Breast – Deli Fresh Sliced",
    image: product6,
    discount: 12,
    rating: 5,
    price: 15.91,
    originalPrice: 17.91,
    tag: "COLD SALE",
    endTime: new Date().getTime() + 3600 * 61 * 1000,
  },
  {
    id: 7,
    title: "FireSmith Flame Grilled Chicken Breast – Deli Fresh Sliced",
    image: product4,
    discount: 12,
    rating: 5,
    price: 15.91,
    originalPrice: 17.91,
    tag: "COLD SALE",
    endTime: new Date().getTime() + 3600 * 61 * 1000,
  },
];

export default function BestSellers() {
     const [countdowns, setCountdowns] = useState({});
  
    useEffect(() => {
      const interval = setInterval(() => {
        const now = Date.now();
        const newCountdowns = products.reduce((acc, product) => {
          const timeLeft = Math.max(product.endTime - now, 0);
          acc[product.id] = timeLeft;
          return acc;
        }, {});
        setCountdowns(newCountdowns);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatTimeLeft = (ms) => {
      const totalSeconds = Math.floor(ms / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return [days, hours, minutes, seconds];
    };
     const containerRef = useRef(null);
  
    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.from(".product-card", {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      }, containerRef);
  
      return () => ctx.revert(); // Cleanup
    }, []);
   const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const buttonRef = useRef(null);
  
    useEffect(() => {
      const ctx = gsap.context(() => {
        // Animate the heading text
        gsap.from(headingRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // when section enters viewport
            toggleActions: "play none none none",
          },
        });
  
        // Animate the button
        gsap.from(buttonRef.current, {
          x: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }, sectionRef);
  
      return () => ctx.revert();
    }, []);
  return (
    <div className="container pb-10" ref={containerRef}>
      {/* Heading */}
      <div ref={sectionRef}  className="flex justify-between items-center mb-6 flex-wrap gap-4 md:gap-0">
        <div  ref={headingRef} className="flex items-center gap-3 flex-wrap">
          <h2 className="text-[18px] font-bold text-[#030712]">
            Best Sellers
          </h2>
          <p className="text-[13px] text-[#9CA3AF]">
            Some of the new products arriving this weeks
          </p>
        </div>
        <button ref={buttonRef}  className="text-[12px] cursor-pointer font-semibold text-[#000] border border-[#E5E7EB] rounded-full px-4 py-2 flex items-center gap-2 hover:gap-3 hover:text-[#fff] hover:bg-[#634C9F] transition-all duration-300">
          View All{" "}
          <svg
            width="14"
            height="6"
            viewBox="0 0 14 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3956 2.81796C13.3956 2.78996 13.3839 2.76429 13.3606 2.74096C13.3372 2.71762 13.3116 2.70596 13.2836 2.70596L10.9456 0.367957C10.8522 0.283957 10.7449 0.241957 10.6236 0.241957C10.5022 0.241957 10.3949 0.283957 10.3016 0.367957C10.2082 0.451957 10.1639 0.55929 10.1686 0.689957C10.1732 0.820623 10.2176 0.927957 10.3016 1.01196L11.8836 2.59396H1.31356C1.19223 2.59396 1.0849 2.63596 0.991563 2.71996C0.898229 2.80396 0.851562 2.91829 0.851562 3.06296C0.851562 3.20762 0.893563 3.31962 0.977563 3.39896C1.06156 3.47829 1.17356 3.51796 1.31356 3.51796H11.9396L10.3576 5.09996C10.2736 5.18396 10.2316 5.28896 10.2316 5.41496C10.2316 5.54096 10.2736 5.65062 10.3576 5.74396C10.3856 5.77196 10.4276 5.79762 10.4836 5.82096C10.5396 5.84429 10.5956 5.85596 10.6516 5.85596C10.7076 5.85596 10.7636 5.84429 10.8196 5.82096C10.8756 5.79762 10.9176 5.77196 10.9456 5.74396L13.2836 3.40596C13.3022 3.38729 13.3209 3.36396 13.3396 3.33596C13.3582 3.30796 13.3769 3.29396 13.3956 3.29396C13.4236 3.17262 13.4376 3.07929 13.4376 3.01396C13.4376 2.94862 13.4236 2.88329 13.3956 2.81796Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <div className="flex flex-col">
          {products.slice(0, 3).map((product) => {
           const timeLeft = countdowns[product.id] || 0;
        const [d, h, m, s] = formatTimeLeft(timeLeft);

            return (
              <div
                key={product.id}
             className="product-card bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 group h-full flex flex-col justify-between">
            
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="relative w-full sm:w-fit">
                    <Link
                      href={"/"}
                      className="w-full sm:w-42 h-42 flex items-center justify-center"
                    >
                      <img
                        src={product.image.src}
                        alt={product.title}
                        className="w-full h-42 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    {/* Discount Badge */}
                    <span className="absolute top-1 bg-[#DC2626] text-[#FEF2F2] text-[10px] font-bold px-2 py-1 rounded-full">
                      {`${product.discount}%`}
                    </span>
                    <span className="absolute top-1 right-0 cursor-pointer hover:scale-105 transition-transform duration-300 p-1 bg-white rounded-full">
                      <svg
                        width="19"
                        height="17"
                        viewBox="0 0 19 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.9901 0.340088C12.2274 0.340088 11.4977 0.505089 10.8011 0.835089C10.1044 1.16509 9.5214 1.60875 9.05206 2.16609C8.5974 1.57942 8.0254 1.12842 7.33606 0.813087C6.64673 0.497755 5.90606 0.340088 5.11406 0.340088C4.2194 0.340088 3.3834 0.560087 2.60606 1.00009C1.85806 1.42542 1.26406 2.00476 0.824062 2.73809C0.384062 3.47142 0.164062 4.26342 0.164062 5.11409C0.164062 6.71275 0.596729 8.28942 1.46206 9.84409C2.1514 11.0908 3.11206 12.3008 4.34406 13.4741C5.22406 14.3248 6.20673 15.1094 7.29206 15.8281C7.96673 16.2974 8.4654 16.6054 8.78806 16.7521C8.84673 16.8108 8.93473 16.8401 9.05206 16.8401C9.1694 16.8401 9.29406 16.8108 9.42606 16.7521C9.77806 16.5761 10.2767 16.2681 10.9221 15.8281C11.9927 15.1094 12.9754 14.3248 13.8701 13.4741C15.0874 12.3008 16.0407 11.0908 16.7301 9.84409C17.5954 8.28942 18.0281 6.71275 18.0281 5.11409C18.0281 4.26342 17.8007 3.47142 17.3461 2.73809C16.8914 2.00476 16.2754 1.42175 15.4981 0.989088C14.7207 0.556421 13.8847 0.340088 12.9901 0.340088ZM9.05206 15.3661C8.1134 14.7941 7.24806 14.1854 6.45606 13.5401C5.06273 12.4108 3.96273 11.2448 3.15606 10.0421C2.07073 8.44342 1.52806 6.83009 1.52806 5.20209C1.52806 4.57142 1.69306 3.98842 2.02306 3.45309C2.35306 2.91775 2.79306 2.49242 3.34306 2.17709C3.89306 1.86175 4.4834 1.70409 5.11406 1.70409C5.8474 1.70409 6.51106 1.89475 7.10506 2.27609C7.69906 2.65742 8.1354 3.17075 8.41406 3.81609C8.47273 3.96275 8.5864 4.06542 8.75506 4.12409C8.92373 4.18275 9.09973 4.18275 9.28306 4.12409C9.4664 4.06542 9.60206 3.96275 9.69006 3.81609C9.96873 3.17075 10.4087 2.65742 11.0101 2.27609C11.6114 1.89475 12.2714 1.70409 12.9901 1.70409C13.6501 1.70409 14.2551 1.86175 14.8051 2.17709C15.3551 2.49242 15.7877 2.91775 16.1031 3.45309C16.4184 3.98842 16.5761 4.57142 16.5761 5.20209C16.5761 6.80075 16.0334 8.39942 14.9481 9.99809C14.1267 11.2008 13.0267 12.3741 11.6481 13.5181C10.8267 14.1928 9.9614 14.8088 9.05206 15.3661Z"
                          fill="#030712"
                        />
                      </svg>
                    </span>
                  </div>
                  {/* Tags */}
                  <div className="flex sm:hidden items-center gap-2">
                    {product.tag == "ORGANIC" && (
                      <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-[linear-gradient(90deg,_#D4FC79_0%,_#96E6A1_50%)] text-[#166534] rounded-full font-extrabold">
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
                    )}
                    {product.tag === "COLD SALE" && (
                      <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-[linear-gradient(90deg,_#A5EFFF_0%,_#E7F8FD_50%)] text-[#0891B2] rounded-full font-extrabold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M12.5017 9.37256L11.1689 8.61464L12.3188 7.93518C12.5278 7.80451 12.6062 7.53011 12.4756 7.32104C12.358 7.11198 12.0836 7.03358 11.8614 7.16424L10.2804 8.09198L7.88916 6.71998L10.2804 5.33491L11.8614 6.27571C11.9398 6.31491 12.0182 6.34104 12.0966 6.34104C12.2404 6.34104 12.3972 6.26264 12.4756 6.11891C12.6062 5.90984 12.5278 5.63544 12.3188 5.50478L11.1689 4.82531L12.5017 4.06744C12.7108 3.93678 12.7761 3.66238 12.6585 3.45331C12.5409 3.24424 12.2665 3.16584 12.0444 3.28344L10.7246 4.05438L10.7116 2.72158C10.7116 2.47331 10.5025 2.27731 10.2673 2.27731C10.019 2.27731 9.82303 2.48638 9.82303 2.73464L9.8361 4.56398L7.44489 5.94904V3.19198L9.05209 2.29038C9.26116 2.15971 9.33956 1.88531 9.22196 1.67624C9.09129 1.46718 8.82996 1.38878 8.60782 1.50638L7.44489 2.15971V0.630912C7.44489 0.382646 7.24889 0.186646 7.00062 0.186646C6.75236 0.186646 6.55636 0.382646 6.55636 0.630912V2.15971L5.39342 1.50638C5.18436 1.38878 4.90996 1.46718 4.77929 1.67624C4.66169 1.88531 4.74009 2.15971 4.94916 2.29038L6.55636 3.19198V5.94904L4.16516 4.56398L4.17822 2.73464C4.19129 2.48638 3.98222 2.27731 3.74702 2.27731C3.73396 2.27731 3.73396 2.27731 3.73396 2.27731C3.49876 2.27731 3.28969 2.47331 3.28969 2.72158L3.27662 4.05438L1.95689 3.28344C1.73476 3.16584 1.46036 3.24424 1.34276 3.45331C1.22516 3.66238 1.29049 3.93678 1.51262 4.06744L2.83236 4.82531L1.68249 5.50478C1.47342 5.63544 1.39502 5.90984 1.52569 6.11891C1.60409 6.26264 1.76089 6.34104 1.90462 6.34104C1.98302 6.34104 2.06142 6.31491 2.13982 6.27571L3.72089 5.33491L6.11209 6.71998L3.72089 8.10504L2.13982 7.16424C1.91769 7.03358 1.65636 7.11198 1.52569 7.32104C1.39502 7.53011 1.47342 7.80451 1.68249 7.93518L2.83236 8.61464L1.51262 9.37256C1.29049 9.50322 1.22516 9.77762 1.34276 9.98669C1.42116 10.1304 1.57796 10.2088 1.73476 10.2088C1.80009 10.2088 1.87849 10.1958 1.95689 10.1435L3.27662 9.38562L3.28969 10.7184C3.28969 10.9667 3.49876 11.1627 3.73396 11.1627C3.73396 11.1627 3.73396 11.1627 3.74702 11.1627C3.98222 11.1627 4.19129 10.9536 4.17822 10.7054L4.16516 8.87598L6.55636 7.49091V10.248L4.94916 11.1496C4.74009 11.2803 4.66169 11.5547 4.77929 11.7638C4.87076 11.9075 5.01449 11.9859 5.17129 11.9859C5.24969 11.9859 5.32809 11.9728 5.39342 11.9336L6.55636 11.2803V12.8091C6.55636 13.0574 6.75236 13.2534 7.00062 13.2534C7.24889 13.2534 7.44489 13.0574 7.44489 12.8091V11.2803L8.60782 11.9336C8.67316 11.9728 8.75156 11.9859 8.82996 11.9859C8.98676 11.9859 9.13049 11.9075 9.22196 11.7638C9.33956 11.5547 9.26116 11.2803 9.05209 11.1496L7.44489 10.248V7.49091L9.8361 8.87598L9.82303 10.7054C9.82303 10.9536 10.019 11.1627 10.2542 11.1627C10.2673 11.1627 10.2673 11.1627 10.2673 11.1627C10.5156 11.1627 10.7116 10.9667 10.7116 10.7184L10.7246 9.38562L12.0444 10.1435C12.1228 10.1958 12.2012 10.2088 12.2665 10.2088C12.4233 10.2088 12.5801 10.1304 12.6585 9.98669C12.7761 9.77762 12.7108 9.50322 12.5017 9.37256Z"
                            fill="#0891B2"
                          />
                        </svg>{" "}
                        COLD SALE
                      </span>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <Link
                        href="/"
                        className="text-[14px] cursor-pointer font-semibold text-[#030712] hover:text-[#634C9F] transition-all duration-300 mb-1 line-clamp-2 pr-1"
                      >
                        {product.title}
                      </Link>
                    </div>
                    <div className="flex items-center mt-2.5 mb-5">
                      {/* Stars */}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={`star-${product.id}-${i}`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 11 12"
                          fill="none"
                        >
                          <path
                            d="M6.09821 1.11494C6.04133 0.997618 5.95956 0.904128 5.8529 0.834469C5.74625 0.764811 5.62893 0.72998 5.50095 0.72998C5.37296 0.72998 5.25387 0.764811 5.14366 0.834469C5.03345 0.904128 4.9499 0.997618 4.89302 1.11494L3.55985 3.96362L0.562893 4.41457C0.442019 4.42924 0.331811 4.47873 0.232268 4.56305C0.132724 4.64738 0.0651771 4.75187 0.029626 4.87652C-0.00592519 5.00117 -0.00948031 5.12766 0.0189606 5.25598C0.0474015 5.3843 0.107838 5.49245 0.200271 5.58044L2.36534 7.80219L1.8534 10.9258C1.83207 11.0578 1.84629 11.1825 1.89606 11.2998C1.94583 11.4171 2.02049 11.5161 2.12003 11.5968C2.21958 11.6774 2.33334 11.7214 2.46132 11.7288C2.58931 11.7361 2.71018 11.7104 2.82395 11.6518L5.50095 10.1779L8.17795 11.6518C8.29171 11.7104 8.41081 11.7361 8.53524 11.7288C8.65967 11.7214 8.77521 11.6793 8.88186 11.6023C8.98852 11.5253 9.06495 11.4263 9.11117 11.3053C9.15738 11.1843 9.16983 11.0578 9.1485 10.9258L8.62589 7.80219L10.8016 5.58044C10.8941 5.49245 10.9545 5.3843 10.9829 5.25598C11.0114 5.12766 11.0043 5.00117 10.9616 4.87652C10.9189 4.75187 10.8514 4.64738 10.759 4.56305C10.6665 4.47873 10.5563 4.42924 10.4283 4.41457L7.44204 3.96362L6.09821 1.11494Z"
                            fill={i < product.rating ? "#FACC15" : "#D1D5DB"}
                          />
                        </svg>
                      ))}

                      {/* Rating Number */}
                      <span className="text-xs text-gray-600 ml-1">
                        {product.rating}.0
                      </span>
                    </div>

                    {/* Prices */}
                    <div className="flex items-baseline gap-1 mb-4">
                      <span
                        className="text-[20px] font-bold text-[#DC2626]"
                        id="price"
                      >
                        ${product.price.toFixed(2)}
                      </span>
                      <span
                        className="text-[15px] font-semibold line-through text-[#111827]"
                        id="price"
                      >
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Button */}
                    <button className="relative w-full overflow-hidden text-[12px] font-semibold border border-[#634C9F] px-4 py-2 rounded-full cursor-pointer flex items-center justify-between group">
                      {/* Background animation */}
                      <span className="absolute inset-0 bg-[#634C9F] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>

                      {/* Foreground text with proper hover color */}
                      <span className="relative z-10 text-[#634C9F] group-hover:text-white transition-colors duration-300">
                        Add to cart
                      </span>
                      <span className="relative z-10 text-lg leading-4 text-[#634C9F] group-hover:text-white transition-colors duration-300">
                        ＋
                      </span>
                    </button>
                  </div>
                </div>
                {/* Tags */}
                <div className="hidden sm:flex items-center gap-2 mb-2">
                  {product.tag == "ORGANIC" && (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-[linear-gradient(90deg,_#D4FC79_0%,_#96E6A1_50%)] text-[#166534] rounded-full font-extrabold">
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
                  )}
                  {product.tag === "COLD SALE" && (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-[linear-gradient(90deg,_#A5EFFF_0%,_#E7F8FD_50%)] text-[#0891B2] rounded-full font-extrabold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M12.5017 9.37256L11.1689 8.61464L12.3188 7.93518C12.5278 7.80451 12.6062 7.53011 12.4756 7.32104C12.358 7.11198 12.0836 7.03358 11.8614 7.16424L10.2804 8.09198L7.88916 6.71998L10.2804 5.33491L11.8614 6.27571C11.9398 6.31491 12.0182 6.34104 12.0966 6.34104C12.2404 6.34104 12.3972 6.26264 12.4756 6.11891C12.6062 5.90984 12.5278 5.63544 12.3188 5.50478L11.1689 4.82531L12.5017 4.06744C12.7108 3.93678 12.7761 3.66238 12.6585 3.45331C12.5409 3.24424 12.2665 3.16584 12.0444 3.28344L10.7246 4.05438L10.7116 2.72158C10.7116 2.47331 10.5025 2.27731 10.2673 2.27731C10.019 2.27731 9.82303 2.48638 9.82303 2.73464L9.8361 4.56398L7.44489 5.94904V3.19198L9.05209 2.29038C9.26116 2.15971 9.33956 1.88531 9.22196 1.67624C9.09129 1.46718 8.82996 1.38878 8.60782 1.50638L7.44489 2.15971V0.630912C7.44489 0.382646 7.24889 0.186646 7.00062 0.186646C6.75236 0.186646 6.55636 0.382646 6.55636 0.630912V2.15971L5.39342 1.50638C5.18436 1.38878 4.90996 1.46718 4.77929 1.67624C4.66169 1.88531 4.74009 2.15971 4.94916 2.29038L6.55636 3.19198V5.94904L4.16516 4.56398L4.17822 2.73464C4.19129 2.48638 3.98222 2.27731 3.74702 2.27731C3.73396 2.27731 3.73396 2.27731 3.73396 2.27731C3.49876 2.27731 3.28969 2.47331 3.28969 2.72158L3.27662 4.05438L1.95689 3.28344C1.73476 3.16584 1.46036 3.24424 1.34276 3.45331C1.22516 3.66238 1.29049 3.93678 1.51262 4.06744L2.83236 4.82531L1.68249 5.50478C1.47342 5.63544 1.39502 5.90984 1.52569 6.11891C1.60409 6.26264 1.76089 6.34104 1.90462 6.34104C1.98302 6.34104 2.06142 6.31491 2.13982 6.27571L3.72089 5.33491L6.11209 6.71998L3.72089 8.10504L2.13982 7.16424C1.91769 7.03358 1.65636 7.11198 1.52569 7.32104C1.39502 7.53011 1.47342 7.80451 1.68249 7.93518L2.83236 8.61464L1.51262 9.37256C1.29049 9.50322 1.22516 9.77762 1.34276 9.98669C1.42116 10.1304 1.57796 10.2088 1.73476 10.2088C1.80009 10.2088 1.87849 10.1958 1.95689 10.1435L3.27662 9.38562L3.28969 10.7184C3.28969 10.9667 3.49876 11.1627 3.73396 11.1627C3.73396 11.1627 3.73396 11.1627 3.74702 11.1627C3.98222 11.1627 4.19129 10.9536 4.17822 10.7054L4.16516 8.87598L6.55636 7.49091V10.248L4.94916 11.1496C4.74009 11.2803 4.66169 11.5547 4.77929 11.7638C4.87076 11.9075 5.01449 11.9859 5.17129 11.9859C5.24969 11.9859 5.32809 11.9728 5.39342 11.9336L6.55636 11.2803V12.8091C6.55636 13.0574 6.75236 13.2534 7.00062 13.2534C7.24889 13.2534 7.44489 13.0574 7.44489 12.8091V11.2803L8.60782 11.9336C8.67316 11.9728 8.75156 11.9859 8.82996 11.9859C8.98676 11.9859 9.13049 11.9075 9.22196 11.7638C9.33956 11.5547 9.26116 11.2803 9.05209 11.1496L7.44489 10.248V7.49091L9.8361 8.87598L9.82303 10.7054C9.82303 10.9536 10.019 11.1627 10.2542 11.1627C10.2673 11.1627 10.2673 11.1627 10.2673 11.1627C10.5156 11.1627 10.7116 10.9667 10.7116 10.7184L10.7246 9.38562L12.0444 10.1435C12.1228 10.1958 12.2012 10.2088 12.2665 10.2088C12.4233 10.2088 12.5801 10.1304 12.6585 9.98669C12.7761 9.77762 12.7108 9.50322 12.5017 9.37256Z"
                          fill="#0891B2"
                        />
                      </svg>{" "}
                      COLD SALE
                    </span>
                  )}
                </div>
                {/* Timer */}
                <div className="mt-6 sm:mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-1 text-[12px] text-[#4B5563]">
                  <div className="flex items-center gap-1 text-[12px]">
                    {[d, h, m, s].map((unit, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="bg-[#F3F4F6] px-2 py-1 rounded font-semibold border border-[#E5E7EB]">
                          {unit.toString().padStart(2, "0")}
                        </span>
                        {idx === 2 && (
                          <span className="text-[#4B5563] font-semibold text-[14px]">
                            :
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="ml-0 sm:ml-3 text-[#9CA3AF]">
                    Remains until the end of the offer
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Column: 1 Big Product */}
        <div className="flex items-center justify-center product-card">
          <div className="border-4 border-[#DC2626] rounded-[8px] px-4 sm:px-8 pt-8 lg:pb-2 pb-8 bg-white w-full h-full">
            <div className="flex flex-col items-start gap-4 ">
              <div className="relative w-full">
                <Link href={"/"}>
                  <img
                    src={products[3].image.src}
                    alt={products[3].title}
                    className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {/* Discount Badge */}
                <span className="absolute top-1 bg-[#DC2626] text-[#FEF2F2] text-[10px] font-bold px-2 py-1 rounded-full">
                  {`${products[3].discount}%`}
                </span>
                <span className="absolute top-1 right-0 cursor-pointer hover:scale-105 transition-transform duration-300 p-1 bg-white rounded-full">
                  <svg
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.9901 0.340088C12.2274 0.340088 11.4977 0.505089 10.8011 0.835089C10.1044 1.16509 9.5214 1.60875 9.05206 2.16609C8.5974 1.57942 8.0254 1.12842 7.33606 0.813087C6.64673 0.497755 5.90606 0.340088 5.11406 0.340088C4.2194 0.340088 3.3834 0.560087 2.60606 1.00009C1.85806 1.42542 1.26406 2.00476 0.824062 2.73809C0.384062 3.47142 0.164062 4.26342 0.164062 5.11409C0.164062 6.71275 0.596729 8.28942 1.46206 9.84409C2.1514 11.0908 3.11206 12.3008 4.34406 13.4741C5.22406 14.3248 6.20673 15.1094 7.29206 15.8281C7.96673 16.2974 8.4654 16.6054 8.78806 16.7521C8.84673 16.8108 8.93473 16.8401 9.05206 16.8401C9.1694 16.8401 9.29406 16.8108 9.42606 16.7521C9.77806 16.5761 10.2767 16.2681 10.9221 15.8281C11.9927 15.1094 12.9754 14.3248 13.8701 13.4741C15.0874 12.3008 16.0407 11.0908 16.7301 9.84409C17.5954 8.28942 18.0281 6.71275 18.0281 5.11409C18.0281 4.26342 17.8007 3.47142 17.3461 2.73809C16.8914 2.00476 16.2754 1.42175 15.4981 0.989088C14.7207 0.556421 13.8847 0.340088 12.9901 0.340088ZM9.05206 15.3661C8.1134 14.7941 7.24806 14.1854 6.45606 13.5401C5.06273 12.4108 3.96273 11.2448 3.15606 10.0421C2.07073 8.44342 1.52806 6.83009 1.52806 5.20209C1.52806 4.57142 1.69306 3.98842 2.02306 3.45309C2.35306 2.91775 2.79306 2.49242 3.34306 2.17709C3.89306 1.86175 4.4834 1.70409 5.11406 1.70409C5.8474 1.70409 6.51106 1.89475 7.10506 2.27609C7.69906 2.65742 8.1354 3.17075 8.41406 3.81609C8.47273 3.96275 8.5864 4.06542 8.75506 4.12409C8.92373 4.18275 9.09973 4.18275 9.28306 4.12409C9.4664 4.06542 9.60206 3.96275 9.69006 3.81609C9.96873 3.17075 10.4087 2.65742 11.0101 2.27609C11.6114 1.89475 12.2714 1.70409 12.9901 1.70409C13.6501 1.70409 14.2551 1.86175 14.8051 2.17709C15.3551 2.49242 15.7877 2.91775 16.1031 3.45309C16.4184 3.98842 16.5761 4.57142 16.5761 5.20209C16.5761 6.80075 16.0334 8.39942 14.9481 9.99809C14.1267 11.2008 13.0267 12.3741 11.6481 13.5181C10.8267 14.1928 9.9614 14.8088 9.05206 15.3661Z"
                      fill="#030712"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center mt-2.5 mb-3">
                  {/* Stars */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={`star-${products[3].id}-${i}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 11 12"
                      fill="none"
                    >
                      <path
                        d="M6.09821 1.11494C6.04133 0.997618 5.95956 0.904128 5.8529 0.834469C5.74625 0.764811 5.62893 0.72998 5.50095 0.72998C5.37296 0.72998 5.25387 0.764811 5.14366 0.834469C5.03345 0.904128 4.9499 0.997618 4.89302 1.11494L3.55985 3.96362L0.562893 4.41457C0.442019 4.42924 0.331811 4.47873 0.232268 4.56305C0.132724 4.64738 0.0651771 4.75187 0.029626 4.87652C-0.00592519 5.00117 -0.00948031 5.12766 0.0189606 5.25598C0.0474015 5.3843 0.107838 5.49245 0.200271 5.58044L2.36534 7.80219L1.8534 10.9258C1.83207 11.0578 1.84629 11.1825 1.89606 11.2998C1.94583 11.4171 2.02049 11.5161 2.12003 11.5968C2.21958 11.6774 2.33334 11.7214 2.46132 11.7288C2.58931 11.7361 2.71018 11.7104 2.82395 11.6518L5.50095 10.1779L8.17795 11.6518C8.29171 11.7104 8.41081 11.7361 8.53524 11.7288C8.65967 11.7214 8.77521 11.6793 8.88186 11.6023C8.98852 11.5253 9.06495 11.4263 9.11117 11.3053C9.15738 11.1843 9.16983 11.0578 9.1485 10.9258L8.62589 7.80219L10.8016 5.58044C10.8941 5.49245 10.9545 5.3843 10.9829 5.25598C11.0114 5.12766 11.0043 5.00117 10.9616 4.87652C10.9189 4.75187 10.8514 4.64738 10.759 4.56305C10.6665 4.47873 10.5563 4.42924 10.4283 4.41457L7.44204 3.96362L6.09821 1.11494Z"
                        fill={i < products[3].rating ? "#FACC15" : "#D1D5DB"}
                      />
                    </svg>
                  ))}

                  {/* Rating Number */}
                  <span className="text-xs text-gray-600 ml-1">
                    {products[3].rating}.0
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <Link
                    href="/"
                    className="text-[16px] cursor-pointer font-semibold text-[#030712] hover:text-[#634C9F] transition-all duration-300 mb-1 line-clamp-2 pr-1"
                  >
                    {products[3].title}
                  </Link>
                </div>

                {/* Prices */}
                <div className="flex items-baseline gap-1 mb-5 mt-3">
                  <span
                    className="text-[24px] font-bold text-[#DC2626]"
                    id="price"
                  >
                    ${products[3].price.toFixed(2)}
                  </span>
                  <span
                    className="text-[19px] font-semibold line-through text-[#111827]"
                    id="price"
                  >
                    ${products[3].originalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-[#4B5563] text-[13px] mb-10">
                  {products[3].description}
                </p>
                <p className="text-[#9CA3AF] text-[11px]">
                  This product is about to ran out
                </p>
                <span
                  className="w-full h-[6px] block mt-2 mb-3"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #FFD200 0%, #DC2626 100%)",
                  }}
                ></span>
                <div className="flex items-center gap-1 w-full mb-6">
                  <span className="text-[#6B7280] text-[12px]">
                    available only:
                  </span>
                  <span className="text-[#000000] text-[13px] font-bold">
                    38
                  </span>
                </div>
                {/* Button */}
                <button className=" w-full text-[12px] font-semibold bg-[#16A34A] px-4 py-3 rounded-[8px] cursor-pointer flex items-center justify-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_6314_2339)">
                      <path
                        d="M7.48224 1.912C7.06224 1.912 6.67257 2.017 6.31324 2.227C5.9539 2.437 5.66924 2.72167 5.45924 3.081C5.24924 3.44033 5.14424 3.83 5.14424 4.25H3.95424C3.95424 3.61533 4.11057 3.02967 4.42324 2.493C4.7359 1.95633 5.16057 1.53167 5.69724 1.219C6.2339 0.906333 6.81957 0.75 7.45424 0.75C8.0889 0.75 8.67457 0.906333 9.21124 1.219C9.7479 1.53167 10.1726 1.95633 10.4852 2.493C10.7979 3.02967 10.9542 3.61533 10.9542 4.25H13.2502C13.5862 4.25 13.8709 4.369 14.1042 4.607C14.3376 4.845 14.4542 5.13667 14.4542 5.482C14.4542 5.55667 14.4496 5.62667 14.4402 5.692L13.1382 13.224C13.0636 13.6627 12.8582 14.0267 12.5222 14.316C12.1862 14.6053 11.7989 14.75 11.3602 14.75H3.54824C3.10957 14.75 2.72224 14.6053 2.38624 14.316C2.05024 14.0267 1.8449 13.6627 1.77024 13.224L0.468238 5.706C0.412238 5.37 0.479904 5.062 0.671238 4.782C0.862571 4.502 1.12157 4.32933 1.44824 4.264C1.51357 4.25467 1.58357 4.25 1.65824 4.25H9.82024C9.82024 3.83 9.71524 3.44033 9.50524 3.081C9.29524 2.72167 9.01057 2.437 8.65124 2.227C8.2919 2.017 7.90224 1.912 7.48224 1.912ZM13.2502 5.412H1.65824C1.6489 5.412 1.6349 5.43067 1.61624 5.468V5.496L2.91824 13.028C2.94624 13.1773 3.01157 13.3033 3.11424 13.406C3.2169 13.5087 3.33824 13.5647 3.47824 13.574L3.54824 13.588H11.3602C11.5002 13.588 11.6286 13.5437 11.7452 13.455C11.8619 13.3663 11.9389 13.2473 11.9762 13.098L13.2922 5.482C13.2922 5.44467 13.2829 5.426 13.2642 5.426L13.2502 5.412Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_6314_2339">
                        <rect
                          width="14"
                          height="14"
                          fill="white"
                          transform="matrix(1 0 0 -1 0.328125 14.75)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  {/* Foreground text with proper hover color */}
                  <span className="relative z-10 text-white font-bold">
                    Add to cart
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {products.slice(4, 7).map((product) => {
           const timeLeft = countdowns[product.id] || 0;
        const [d, h, m, s] = formatTimeLeft(timeLeft);

            return (
              <div
                key={product.id}
                             className="product-card bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 group h-full flex flex-col justify-between">

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="relative w-full sm:w-fit">
                    <Link
                      href={"/"}
                      className="w-full sm:w-42 h-42 flex items-center justify-center"
                    >
                      <img
                        src={product.image.src}
                        alt={product.title}
                        className="w-full h-42 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    {/* Discount Badge */}
                    <span className="absolute top-1 bg-[#DC2626] text-[#FEF2F2] text-[10px] font-bold px-2 py-1 rounded-full">
                      {`${product.discount}%`}
                    </span>
                    <span className="absolute top-1 right-0 cursor-pointer hover:scale-105 transition-transform duration-300 p-1 bg-white rounded-full">
                      <svg
                        width="19"
                        height="17"
                        viewBox="0 0 19 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.9901 0.340088C12.2274 0.340088 11.4977 0.505089 10.8011 0.835089C10.1044 1.16509 9.5214 1.60875 9.05206 2.16609C8.5974 1.57942 8.0254 1.12842 7.33606 0.813087C6.64673 0.497755 5.90606 0.340088 5.11406 0.340088C4.2194 0.340088 3.3834 0.560087 2.60606 1.00009C1.85806 1.42542 1.26406 2.00476 0.824062 2.73809C0.384062 3.47142 0.164062 4.26342 0.164062 5.11409C0.164062 6.71275 0.596729 8.28942 1.46206 9.84409C2.1514 11.0908 3.11206 12.3008 4.34406 13.4741C5.22406 14.3248 6.20673 15.1094 7.29206 15.8281C7.96673 16.2974 8.4654 16.6054 8.78806 16.7521C8.84673 16.8108 8.93473 16.8401 9.05206 16.8401C9.1694 16.8401 9.29406 16.8108 9.42606 16.7521C9.77806 16.5761 10.2767 16.2681 10.9221 15.8281C11.9927 15.1094 12.9754 14.3248 13.8701 13.4741C15.0874 12.3008 16.0407 11.0908 16.7301 9.84409C17.5954 8.28942 18.0281 6.71275 18.0281 5.11409C18.0281 4.26342 17.8007 3.47142 17.3461 2.73809C16.8914 2.00476 16.2754 1.42175 15.4981 0.989088C14.7207 0.556421 13.8847 0.340088 12.9901 0.340088ZM9.05206 15.3661C8.1134 14.7941 7.24806 14.1854 6.45606 13.5401C5.06273 12.4108 3.96273 11.2448 3.15606 10.0421C2.07073 8.44342 1.52806 6.83009 1.52806 5.20209C1.52806 4.57142 1.69306 3.98842 2.02306 3.45309C2.35306 2.91775 2.79306 2.49242 3.34306 2.17709C3.89306 1.86175 4.4834 1.70409 5.11406 1.70409C5.8474 1.70409 6.51106 1.89475 7.10506 2.27609C7.69906 2.65742 8.1354 3.17075 8.41406 3.81609C8.47273 3.96275 8.5864 4.06542 8.75506 4.12409C8.92373 4.18275 9.09973 4.18275 9.28306 4.12409C9.4664 4.06542 9.60206 3.96275 9.69006 3.81609C9.96873 3.17075 10.4087 2.65742 11.0101 2.27609C11.6114 1.89475 12.2714 1.70409 12.9901 1.70409C13.6501 1.70409 14.2551 1.86175 14.8051 2.17709C15.3551 2.49242 15.7877 2.91775 16.1031 3.45309C16.4184 3.98842 16.5761 4.57142 16.5761 5.20209C16.5761 6.80075 16.0334 8.39942 14.9481 9.99809C14.1267 11.2008 13.0267 12.3741 11.6481 13.5181C10.8267 14.1928 9.9614 14.8088 9.05206 15.3661Z"
                          fill="#030712"
                        />
                      </svg>
                    </span>
                  </div>
                  {/* Tags */}
                  <div className="flex sm:hidden items-center gap-2">
                    {product.tag == "ORGANIC" && (
                      <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-[linear-gradient(90deg,_#D4FC79_0%,_#96E6A1_50%)] text-[#166534] rounded-full font-extrabold">
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
                    )}
                    {product.tag === "COLD SALE" && (
                      <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-[linear-gradient(90deg,_#A5EFFF_0%,_#E7F8FD_50%)] text-[#0891B2] rounded-full font-extrabold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M12.5017 9.37256L11.1689 8.61464L12.3188 7.93518C12.5278 7.80451 12.6062 7.53011 12.4756 7.32104C12.358 7.11198 12.0836 7.03358 11.8614 7.16424L10.2804 8.09198L7.88916 6.71998L10.2804 5.33491L11.8614 6.27571C11.9398 6.31491 12.0182 6.34104 12.0966 6.34104C12.2404 6.34104 12.3972 6.26264 12.4756 6.11891C12.6062 5.90984 12.5278 5.63544 12.3188 5.50478L11.1689 4.82531L12.5017 4.06744C12.7108 3.93678 12.7761 3.66238 12.6585 3.45331C12.5409 3.24424 12.2665 3.16584 12.0444 3.28344L10.7246 4.05438L10.7116 2.72158C10.7116 2.47331 10.5025 2.27731 10.2673 2.27731C10.019 2.27731 9.82303 2.48638 9.82303 2.73464L9.8361 4.56398L7.44489 5.94904V3.19198L9.05209 2.29038C9.26116 2.15971 9.33956 1.88531 9.22196 1.67624C9.09129 1.46718 8.82996 1.38878 8.60782 1.50638L7.44489 2.15971V0.630912C7.44489 0.382646 7.24889 0.186646 7.00062 0.186646C6.75236 0.186646 6.55636 0.382646 6.55636 0.630912V2.15971L5.39342 1.50638C5.18436 1.38878 4.90996 1.46718 4.77929 1.67624C4.66169 1.88531 4.74009 2.15971 4.94916 2.29038L6.55636 3.19198V5.94904L4.16516 4.56398L4.17822 2.73464C4.19129 2.48638 3.98222 2.27731 3.74702 2.27731C3.73396 2.27731 3.73396 2.27731 3.73396 2.27731C3.49876 2.27731 3.28969 2.47331 3.28969 2.72158L3.27662 4.05438L1.95689 3.28344C1.73476 3.16584 1.46036 3.24424 1.34276 3.45331C1.22516 3.66238 1.29049 3.93678 1.51262 4.06744L2.83236 4.82531L1.68249 5.50478C1.47342 5.63544 1.39502 5.90984 1.52569 6.11891C1.60409 6.26264 1.76089 6.34104 1.90462 6.34104C1.98302 6.34104 2.06142 6.31491 2.13982 6.27571L3.72089 5.33491L6.11209 6.71998L3.72089 8.10504L2.13982 7.16424C1.91769 7.03358 1.65636 7.11198 1.52569 7.32104C1.39502 7.53011 1.47342 7.80451 1.68249 7.93518L2.83236 8.61464L1.51262 9.37256C1.29049 9.50322 1.22516 9.77762 1.34276 9.98669C1.42116 10.1304 1.57796 10.2088 1.73476 10.2088C1.80009 10.2088 1.87849 10.1958 1.95689 10.1435L3.27662 9.38562L3.28969 10.7184C3.28969 10.9667 3.49876 11.1627 3.73396 11.1627C3.73396 11.1627 3.73396 11.1627 3.74702 11.1627C3.98222 11.1627 4.19129 10.9536 4.17822 10.7054L4.16516 8.87598L6.55636 7.49091V10.248L4.94916 11.1496C4.74009 11.2803 4.66169 11.5547 4.77929 11.7638C4.87076 11.9075 5.01449 11.9859 5.17129 11.9859C5.24969 11.9859 5.32809 11.9728 5.39342 11.9336L6.55636 11.2803V12.8091C6.55636 13.0574 6.75236 13.2534 7.00062 13.2534C7.24889 13.2534 7.44489 13.0574 7.44489 12.8091V11.2803L8.60782 11.9336C8.67316 11.9728 8.75156 11.9859 8.82996 11.9859C8.98676 11.9859 9.13049 11.9075 9.22196 11.7638C9.33956 11.5547 9.26116 11.2803 9.05209 11.1496L7.44489 10.248V7.49091L9.8361 8.87598L9.82303 10.7054C9.82303 10.9536 10.019 11.1627 10.2542 11.1627C10.2673 11.1627 10.2673 11.1627 10.2673 11.1627C10.5156 11.1627 10.7116 10.9667 10.7116 10.7184L10.7246 9.38562L12.0444 10.1435C12.1228 10.1958 12.2012 10.2088 12.2665 10.2088C12.4233 10.2088 12.5801 10.1304 12.6585 9.98669C12.7761 9.77762 12.7108 9.50322 12.5017 9.37256Z"
                            fill="#0891B2"
                          />
                        </svg>{" "}
                        COLD SALE
                      </span>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <Link
                        href="/"
                        className="text-[14px] cursor-pointer font-semibold text-[#030712] hover:text-[#634C9F] transition-all duration-300 mb-1 line-clamp-2 pr-1"
                      >
                        {product.title}
                      </Link>
                    </div>
                    <div className="flex items-center mt-2.5 mb-5">
                      {/* Stars */}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={`star-${product.id}-${i}`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 11 12"
                          fill="none"
                        >
                          <path
                            d="M6.09821 1.11494C6.04133 0.997618 5.95956 0.904128 5.8529 0.834469C5.74625 0.764811 5.62893 0.72998 5.50095 0.72998C5.37296 0.72998 5.25387 0.764811 5.14366 0.834469C5.03345 0.904128 4.9499 0.997618 4.89302 1.11494L3.55985 3.96362L0.562893 4.41457C0.442019 4.42924 0.331811 4.47873 0.232268 4.56305C0.132724 4.64738 0.0651771 4.75187 0.029626 4.87652C-0.00592519 5.00117 -0.00948031 5.12766 0.0189606 5.25598C0.0474015 5.3843 0.107838 5.49245 0.200271 5.58044L2.36534 7.80219L1.8534 10.9258C1.83207 11.0578 1.84629 11.1825 1.89606 11.2998C1.94583 11.4171 2.02049 11.5161 2.12003 11.5968C2.21958 11.6774 2.33334 11.7214 2.46132 11.7288C2.58931 11.7361 2.71018 11.7104 2.82395 11.6518L5.50095 10.1779L8.17795 11.6518C8.29171 11.7104 8.41081 11.7361 8.53524 11.7288C8.65967 11.7214 8.77521 11.6793 8.88186 11.6023C8.98852 11.5253 9.06495 11.4263 9.11117 11.3053C9.15738 11.1843 9.16983 11.0578 9.1485 10.9258L8.62589 7.80219L10.8016 5.58044C10.8941 5.49245 10.9545 5.3843 10.9829 5.25598C11.0114 5.12766 11.0043 5.00117 10.9616 4.87652C10.9189 4.75187 10.8514 4.64738 10.759 4.56305C10.6665 4.47873 10.5563 4.42924 10.4283 4.41457L7.44204 3.96362L6.09821 1.11494Z"
                            fill={i < product.rating ? "#FACC15" : "#D1D5DB"}
                          />
                        </svg>
                      ))}

                      {/* Rating Number */}
                      <span className="text-xs text-gray-600 ml-1">
                        {product.rating}.0
                      </span>
                    </div>

                    {/* Prices */}
                    <div className="flex items-baseline gap-1 mb-4">
                      <span
                        className="text-[20px] font-bold text-[#DC2626]"
                        id="price"
                      >
                        ${product.price.toFixed(2)}
                      </span>
                      <span
                        className="text-[15px] font-semibold line-through text-[#111827]"
                        id="price"
                      >
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Button */}
                    <button className="relative w-full overflow-hidden text-[12px] font-semibold border border-[#634C9F] px-4 py-2 rounded-full cursor-pointer flex items-center justify-between group">
                      {/* Background animation */}
                      <span className="absolute inset-0 bg-[#634C9F] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>

                      {/* Foreground text with proper hover color */}
                      <span className="relative z-10 text-[#634C9F] group-hover:text-white transition-colors duration-300">
                        Add to cart
                      </span>
                      <span className="relative z-10 text-lg leading-4 text-[#634C9F] group-hover:text-white transition-colors duration-300">
                        ＋
                      </span>
                    </button>
                  </div>
                </div>
                {/* Tags */}
                <div className="hidden sm:flex items-center gap-2 mb-2">
                  {product.tag == "ORGANIC" && (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-[linear-gradient(90deg,_#D4FC79_0%,_#96E6A1_50%)] text-[#166534] rounded-full font-extrabold">
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
                  )}
                  {product.tag === "COLD SALE" && (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-[linear-gradient(90deg,_#A5EFFF_0%,_#E7F8FD_50%)] text-[#0891B2] rounded-full font-extrabold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M12.5017 9.37256L11.1689 8.61464L12.3188 7.93518C12.5278 7.80451 12.6062 7.53011 12.4756 7.32104C12.358 7.11198 12.0836 7.03358 11.8614 7.16424L10.2804 8.09198L7.88916 6.71998L10.2804 5.33491L11.8614 6.27571C11.9398 6.31491 12.0182 6.34104 12.0966 6.34104C12.2404 6.34104 12.3972 6.26264 12.4756 6.11891C12.6062 5.90984 12.5278 5.63544 12.3188 5.50478L11.1689 4.82531L12.5017 4.06744C12.7108 3.93678 12.7761 3.66238 12.6585 3.45331C12.5409 3.24424 12.2665 3.16584 12.0444 3.28344L10.7246 4.05438L10.7116 2.72158C10.7116 2.47331 10.5025 2.27731 10.2673 2.27731C10.019 2.27731 9.82303 2.48638 9.82303 2.73464L9.8361 4.56398L7.44489 5.94904V3.19198L9.05209 2.29038C9.26116 2.15971 9.33956 1.88531 9.22196 1.67624C9.09129 1.46718 8.82996 1.38878 8.60782 1.50638L7.44489 2.15971V0.630912C7.44489 0.382646 7.24889 0.186646 7.00062 0.186646C6.75236 0.186646 6.55636 0.382646 6.55636 0.630912V2.15971L5.39342 1.50638C5.18436 1.38878 4.90996 1.46718 4.77929 1.67624C4.66169 1.88531 4.74009 2.15971 4.94916 2.29038L6.55636 3.19198V5.94904L4.16516 4.56398L4.17822 2.73464C4.19129 2.48638 3.98222 2.27731 3.74702 2.27731C3.73396 2.27731 3.73396 2.27731 3.73396 2.27731C3.49876 2.27731 3.28969 2.47331 3.28969 2.72158L3.27662 4.05438L1.95689 3.28344C1.73476 3.16584 1.46036 3.24424 1.34276 3.45331C1.22516 3.66238 1.29049 3.93678 1.51262 4.06744L2.83236 4.82531L1.68249 5.50478C1.47342 5.63544 1.39502 5.90984 1.52569 6.11891C1.60409 6.26264 1.76089 6.34104 1.90462 6.34104C1.98302 6.34104 2.06142 6.31491 2.13982 6.27571L3.72089 5.33491L6.11209 6.71998L3.72089 8.10504L2.13982 7.16424C1.91769 7.03358 1.65636 7.11198 1.52569 7.32104C1.39502 7.53011 1.47342 7.80451 1.68249 7.93518L2.83236 8.61464L1.51262 9.37256C1.29049 9.50322 1.22516 9.77762 1.34276 9.98669C1.42116 10.1304 1.57796 10.2088 1.73476 10.2088C1.80009 10.2088 1.87849 10.1958 1.95689 10.1435L3.27662 9.38562L3.28969 10.7184C3.28969 10.9667 3.49876 11.1627 3.73396 11.1627C3.73396 11.1627 3.73396 11.1627 3.74702 11.1627C3.98222 11.1627 4.19129 10.9536 4.17822 10.7054L4.16516 8.87598L6.55636 7.49091V10.248L4.94916 11.1496C4.74009 11.2803 4.66169 11.5547 4.77929 11.7638C4.87076 11.9075 5.01449 11.9859 5.17129 11.9859C5.24969 11.9859 5.32809 11.9728 5.39342 11.9336L6.55636 11.2803V12.8091C6.55636 13.0574 6.75236 13.2534 7.00062 13.2534C7.24889 13.2534 7.44489 13.0574 7.44489 12.8091V11.2803L8.60782 11.9336C8.67316 11.9728 8.75156 11.9859 8.82996 11.9859C8.98676 11.9859 9.13049 11.9075 9.22196 11.7638C9.33956 11.5547 9.26116 11.2803 9.05209 11.1496L7.44489 10.248V7.49091L9.8361 8.87598L9.82303 10.7054C9.82303 10.9536 10.019 11.1627 10.2542 11.1627C10.2673 11.1627 10.2673 11.1627 10.2673 11.1627C10.5156 11.1627 10.7116 10.9667 10.7116 10.7184L10.7246 9.38562L12.0444 10.1435C12.1228 10.1958 12.2012 10.2088 12.2665 10.2088C12.4233 10.2088 12.5801 10.1304 12.6585 9.98669C12.7761 9.77762 12.7108 9.50322 12.5017 9.37256Z"
                          fill="#0891B2"
                        />
                      </svg>{" "}
                      COLD SALE
                    </span>
                  )}
                </div>
                {/* Timer */}
                <div className="mt-6 sm:mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-1 text-[12px] text-[#4B5563]">
                  <div className="flex items-center gap-1 text-[12px]">
                    {[d, h, m, s].map((unit, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="bg-[#F3F4F6] px-2 py-1 rounded font-semibold border border-[#E5E7EB]">
                          {unit.toString().padStart(2, "0")}
                        </span>
                        {idx === 2 && (
                          <span className="text-[#4B5563] font-semibold text-[14px]">
                            :
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="ml-0 sm:ml-3 text-[#9CA3AF]">
                    Remains until the end of the offer
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
