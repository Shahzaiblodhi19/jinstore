import React from "react";
import deal1 from "../assets/2deal1.png";
import deal2 from "../assets/2deal2.png";
import deal3 from "../assets/2deal3.png";
import deal4 from "../assets/2deal4.png";

function WeeklyDeals2() {
  const cards = [
    {
      title: "Provides you experienced quality products",
      subtitle: "Feed your family the best",
      image: deal1,
    },
    {
      title: "Shopping with us for better quality and the best price",
      subtitle: "Only this week. Don’t miss...",
      image: deal2,
    },
    {
      title: "Get the best quality products at the lowest prices",
      subtitle: "A different kind of grocery store",
      image: deal3,
    },
    {
      title: "Where you get your all favorite brands under one roof",
      subtitle: "Only this week. Don’t miss...",
      image: deal4,
    },
  ];
  return (
    <main className="pb-10 container">
      <div
        className="grid justify-center gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(317.5px, 1fr))",
        }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="h-[397.23px] rounded-md p-5 flex flex-col justify-start items-start"
            style={{
              backgroundImage: `url(${card.image.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="space-y-2">
              <p className="text-[11px] sm:text-[12px] text-[#EA580C] font-medium">
                Only This Week
              </p>
              <h2 className="text-[16px] sm:text-[15px] xl:text-[19px] font-bold text-[#111827] mt-1 sm:mt-2 leading-snug">
                {card.title}
              </h2>
              <p className="text-[11px] sm:text-[12px] text-[#6B7280] mt-1">
                {card.subtitle}
              </p>
            </div>
            <button className="group relative mt-3 sm:mt-4 cursor-pointer inline-flex items-center justify-center overflow-hidden bg-white border border-[#E5E7EB] text-[#212529] font-bold text-[11px] sm:text-[12px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow transition-colors duration-300">
                  {/* Background Slide */}
                  <span className="absolute inset-0 bg-[#634C9F] z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out rounded-full"></span>

                  {/* Text + Icon */}
                  <span className="relative z-10 flex items-center duration-300 group-hover:text-white gap-1 sm:gap-2 hover:gap-3 transition-all">
                    Shop Now
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_6314_2870)">
                          <path
                            d="M12.8565 7.12789C12.8565 7.09989 12.8448 7.07423 12.8215 7.05089C12.7982 7.02756 12.7725 7.01589 12.7445 7.01589L10.4065 4.67789C10.3132 4.59389 10.2058 4.55189 10.0845 4.55189C9.96317 4.55189 9.85583 4.59389 9.7625 4.67789C9.66917 4.76189 9.62483 4.86923 9.6295 4.99989C9.63417 5.13056 9.6785 5.23789 9.7625 5.32189L11.3445 6.90389H0.7745C0.653167 6.90389 0.545833 6.94589 0.4525 7.02989C0.359167 7.11389 0.3125 7.22823 0.3125 7.37289C0.3125 7.51756 0.3545 7.62956 0.4385 7.70889C0.5225 7.78823 0.6345 7.82789 0.7745 7.82789H11.4005L9.8185 9.40989C9.7345 9.49389 9.6925 9.59889 9.6925 9.72489C9.6925 9.85089 9.7345 9.96056 9.8185 10.0539C9.8465 10.0819 9.8885 10.1076 9.9445 10.1309C10.0005 10.1542 10.0565 10.1659 10.1125 10.1659C10.1685 10.1659 10.2245 10.1542 10.2805 10.1309C10.3365 10.1076 10.3785 10.0819 10.4065 10.0539L12.7445 7.71589C12.7632 7.69723 12.7818 7.67389 12.8005 7.64589C12.8192 7.61789 12.8378 7.60389 12.8565 7.60389C12.8845 7.48256 12.8985 7.38923 12.8985 7.32389C12.8985 7.25856 12.8845 7.19323 12.8565 7.12789Z"
                            fill="currentColor"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6314_2870">
                            <rect
                              width="14"
                              height="14"
                              fill="white"
                              transform="matrix(1 0 0 -1 0.191406 14.3099)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </span>
                </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default WeeklyDeals2;
