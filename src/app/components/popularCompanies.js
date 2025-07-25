import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Machic",
    rating: 4,
    votes: 41,
    description: "Good quality product can only be found in good stores",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Blonwe",
    rating: 4,
    votes: 37,
    description: "All kinds of grocery products are available in our store.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Bacola",
    rating: 4,
    votes: 35,
    description: "Our work can definitely support the local economy.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Medibazar",
    rating: 4,
    votes: 30,
    description:
      "Save your time – save your money – shop from our grocery store.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const StarRating = ({ count }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={`star-${i}`}
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 11 12"
        fill="none"
      >
        <path
          d="M6.09821 1.11494C6.04133 0.997618 5.95956 0.904128 5.8529 0.834469C5.74625 0.764811 5.62893 0.72998 5.50095 0.72998C5.37296 0.72998 5.25387 0.764811 5.14366 0.834469C5.03345 0.904128 4.9499 0.997618 4.89302 1.11494L3.55985 3.96362L0.562893 4.41457C0.442019 4.42924 0.331811 4.47873 0.232268 4.56305C0.132724 4.64738 0.0651771 4.75187 0.029626 4.87652C-0.00592519 5.00117 -0.00948031 5.12766 0.0189606 5.25598C0.0474015 5.3843 0.107838 5.49245 0.200271 5.58044L2.36534 7.80219L1.8534 10.9258C1.83207 11.0578 1.84629 11.1825 1.89606 11.2998C1.94583 11.4171 2.02049 11.5161 2.12003 11.5968C2.21958 11.6774 2.33334 11.7214 2.46132 11.7288C2.58931 11.7361 2.71018 11.7104 2.82395 11.6518L5.50095 10.1779L8.17795 11.6518C8.29171 11.7104 8.41081 11.7361 8.53524 11.7288C8.65967 11.7214 8.77521 11.6793 8.88186 11.6023C8.98852 11.5253 9.06495 11.4263 9.11117 11.3053C9.15738 11.1843 9.16983 11.0578 9.1485 10.9258L8.62589 7.80219L10.8016 5.58044C10.8941 5.49245 10.9545 5.3843 10.9829 5.25598C11.0114 5.12766 11.0043 5.00117 10.9616 4.87652C10.9189 4.75187 10.8514 4.64738 10.759 4.56305C10.6665 4.47873 10.5563 4.42924 10.4283 4.41457L7.44204 3.96362L6.09821 1.11494Z"
          fill={i < count ? "#FACC15" : "#D1D5DB"}
        />
      </svg>
    );
  }
  return <div className="flex ">{stars}</div>;
};

export default function PopularCompanies() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="container pb-10 mx-auto">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4 md:gap-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-[18px] font-bold text-[#030712]">Popular Companies</h2>
          <p className="text-[13px] text-[#9CA3AF]">
            Some of the new products arriving this weeks
          </p>
        </div>
        <button className="text-[12px] cursor-pointer font-semibold text-[#000] border border-[#E5E7EB] rounded-full px-4 py-2 flex items-center gap-2 hover:gap-3 hover:text-[#fff] hover:bg-[#634C9F] transition-all duration-300">
          View All
          <svg
            width="14"
            height="6"
            viewBox="0 0 14 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3956 2.81796..."
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="rounded-lg border border-[#E5E7EB] py-6 px-3 bg-white flex flex-col"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 relative rounded-md overflow-hidden">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[#030712] text-[15px]">
                  {review.name}
                </h3>
                <p className="text-[12px] text-[#6B7280] -mt-0.5">Featured</p>
                <div className="flex items-center mt-1">
                  <StarRating count={review.rating} />
                  <span className="text-sm text-gray-600 ml-2">
                    {review.votes}
                  </span>
                </div>
              </div>
            </div>
            <hr className="my-2 border-[#E5E7EB]" />
            <p className="text-[#030712] text-[12px]">{review.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
