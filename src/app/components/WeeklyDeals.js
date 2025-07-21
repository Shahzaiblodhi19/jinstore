"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import deal1 from "../assets/deal1.png";
import deal2 from "../assets/deal2.jpg";
import deal3 from "../assets/deal3.jpg";

gsap.registerPlugin(ScrollTrigger);

const deals = [
  {
    title: "Quality eggs at an affordable price",
    subtitle: "Eat one every day",
    tag: "Only This Week",
    button: "Shop Now",
    image: deal1,
  },
  {
    title: "Snacks that nourishes our mind and body",
    subtitle: "Shine the morning…",
    tag: "Only This Week",
    button: "Shop Now",
    image: deal2,
  },
  {
    title: "Unbeatable quality, unbeatable prices.",
    subtitle: "Only this week. Don’t miss…",
    tag: "Only This Week",
    button: "Shop Now",
    image: deal3,
  },
];

export default function WeeklyDeals() {
 useEffect(() => {
    gsap.utils.toArray(".deal-card").forEach((card) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });

      const tag = card.querySelector(".deal-tag");
      const title = card.querySelector(".deal-title");
      const subtitle = card.querySelector(".deal-subtitle");
      const button = card.querySelector(".deal-button");
      const icon = card.querySelector(".deal-icon");

      tl.fromTo(
        card,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
        .fromTo(tag, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, "-=0.2")
        .fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, "-=0.2")
        .fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, "-=0.2")
        .fromTo(button, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
        .fromTo(icon, { x: -5, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 }, "-=0.3");
    });
  }, []);
  return (
    <section className="pb-10">
      <div className="container mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="deal-card relative w-full rounded-md overflow-hidden flex items-start justify-between p-4 sm:p-6"
              style={{
                backgroundImage: `url(${deal.image.src || deal.image})`,
                backgroundSize: "cover",
                backgroundPosition: "right center",
              }}
            >
              <div className="relative z-10 max-w-[50%] lg:max-w-[65%]">
                <p className="text-[11px] deal-tag sm:text-[12px] text-[#EA580C] font-medium">
                  {deal.tag}
                </p>
                <h3 className="text-[16px] deal-title sm:text-[15px] xl:text-[20px] font-bold text-[#111827] mt-1 sm:mt-2 leading-snug">
                  {deal.title}
                </h3>
                <p className="text-[11px] deal-subtitle sm:text-[12px] text-[#6B7280] mt-1">
                  {deal.subtitle}
                </p>

                <button className="group deal-button relative mt-3 sm:mt-4 inline-flex items-center justify-center overflow-hidden bg-white border border-[#E5E7EB] text-[#212529] font-bold text-[11px] sm:text-[12px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow transition-colors duration-300">
                  <span className="absolute inset-0 bg-[#634C9F] z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out rounded-full"></span>
                  <span className="relative z-10 flex items-center duration-300 group-hover:text-white gap-1 sm:gap-2 hover:gap-3 transition-all">
                    {deal.button}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M12.8565 7.12789C12.8565 7.09989 12.8448 7.07423 12.8215 7.05089C12.7982 7.02756 12.7725 7.01589 12.7445 7.01589L10.4065 4.67789C10.3132 4.59389 10.2058 4.55189 10.0845 4.55189C9.96317 4.55189 9.85583 4.59389 9.7625 4.67789C9.66917 4.76189 9.62483 4.86923 9.6295 4.99989C9.63417 5.13056 9.6785 5.23789 9.7625 5.32189L11.3445 6.90389H0.7745C0.653167 6.90389 0.545833 6.94589 0.4525 7.02989C0.359167 7.11389 0.3125 7.22823 0.3125 7.37289C0.3125 7.51756 0.3545 7.62956 0.4385 7.70889C0.5225 7.78823 0.6345 7.82789 0.7745 7.82789H11.4005L9.8185 9.40989C9.7345 9.49389 9.6925 9.59889 9.6925 9.72489C9.6925 9.85089 9.7345 9.96056 9.8185 10.0539C9.8465 10.0819 9.8885 10.1076 9.9445 10.1309C10.0005 10.1542 10.0565 10.1659 10.1125 10.1659C10.1685 10.1659 10.2245 10.1542 10.2805 10.1309C10.3365 10.1076 10.3785 10.0819 10.4065 10.0539L12.7445 7.71589C12.7632 7.69723 12.7818 7.67389 12.8005 7.64589C12.8192 7.61789 12.8378 7.60389 12.8565 7.60389C12.8845 7.48256 12.8985 7.38923 12.8985 7.32389C12.8985 7.25856 12.8845 7.19323 12.8565 7.12789Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
