"use client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Image from "next/image";
import gsap from "gsap";
import Slider from "react-slick";
import fp1 from "../../assets/fp1.png";
import fp2 from "../../assets/fp1.2.jpg";
import fp3 from "../../assets/fp1.3.jpg";
import arrival1 from "../../assets/arrival1.png";
import arrival2 from "../../assets/arrival2.png";
import arrival3 from "../../assets/arrival3.png";
import arrival4 from "../../assets/arrival4.png";
import arrival5 from "../../assets/arrival5.png";
import arrival6 from "../../assets/arrival6.png";
import Link from "next/link";

import {
  FaStar,
  FaRegStar,
  FaThumbsUp,
  FaRegThumbsUp
} from 'react-icons/fa';

const Avatar = ({ name }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
      {initials}
    </div>
  );
};

const images2 = [fp1, fp2, fp3];
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


const products = [
  {
    id: 1,
    title: "100 Percent Apple Juice – 64 fl oz Bottle",
    image: arrival1,
    organic: true,
    cold: false,
    discount: 75,
    currentPrice: 0.5,
    originalPrice: 1.99,
    rating: 3,
  },
  {
    id: 2,
    title: "Great Value Rising Crust Frozen Pizza, Supreme",
    image: arrival2,
    organic: false,
    cold: true,
    discount: 11,
    currentPrice: 8.99,
    originalPrice: 9.99,
    rating: 3,
  },
  {
    id: 3,
    title: "Simply Orange Pulp Free Juice – 52 fl oz",
    image: arrival3,
    organic: true,
    cold: false,
    discount: 41,
    currentPrice: 2.45,
    originalPrice: 4.13,
    rating: 2,
  },
  {
    id: 4,
    title: "California Pizza Kitchen Margherita, Thin Crust",
    image: arrival4,
    organic: false,
    cold: true,
    discount: 21,
    currentPrice: 11.77,
    originalPrice: 14.77,
    rating: 3,
  },
  {
    id: 5,
    title: "Cantaloupe Melon Fresh Organic Cut",
    image: arrival5,
    organic: true,
    cold: false,
    discount: 59,
    currentPrice: 1.25,
    originalPrice: 2.98,
    rating: 3,
  },
  {
    id: 6,
    title: "Angel Soft Toilet Paper, 9 Mega Rolls",
    image: arrival6,
    organic: false,
    cold: true,
    discount: 18,
    currentPrice: 14.12,
    originalPrice: 17.12,
    rating: 3,
  },
];

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
    const next = (imageIndex + 1) % images2.length;
    setImageIndex(next);
    sliderMain.current.slickGoTo(next);
  };
  const prevImage = () => {
    const prev = (imageIndex - 1) % images2.length;
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
  const [timeLeft, setTimeLeft] = useState({
    days: 81,
    hours: 6,
    minutes: 50,
    seconds: 2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
              else {
                clearInterval(interval);
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);
  const [user] = useState({ name: 'You' });

  const getDateText = (date) => {
    const diff = (Date.now() - new Date(date)) / 1000 / 86400;
    if (diff < 1) return 'Just now';
    if (diff < 2) return '1 day ago';
    if (diff < 14) return `${Math.floor(diff)} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return new Date(date).toLocaleDateString();
  };

  const totalRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      ).toFixed(1)
    : 0;
  const ratingBreakdown = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.rating === s).length
  }));

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    const previews = files.map((f) => ({
      url: URL.createObjectURL(f)
    }));
    setImages(previews);
  };

  const removeImage = (url) => {
    setImages((prev) => prev.filter((img) => img.url !== url));
  };

  const handleSubmit = () => {
    if (!rating || !message) return alert('Please rate & write a review.');
    const newRev = {
      id: Date.now(),
      name: user.name,
      rating,
      message,
      images,
      likes: 0,
      liked: false,
      date: new Date(),
      fromUser: true
    };
    setReviews((prev) => [newRev, ...prev.filter((r) => !r.fromUser)]);
    setUserReview(newRev);
    setRating(0);
    setMessage('');
    setImages([]);
  };

  const toggleLike = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, liked: !r.liked, likes: r.likes + (r.liked ? -1 : 1) }
          : r
      )
    );
  };

  const handleEdit = () => {
    if (userReview) {
      setRating(userReview.rating);
      setMessage(userReview.message);
      setImages(userReview.images);
      setUserReview(null);
    }
  };

  useEffect(() => {
    const seed = [...Array(5)].map((_, i) => ({
      id: i + 1,
      name: ['Alice', 'John', 'Emma', 'Mark', 'Sophia'][i],
      rating: 5 - (i % 3),
      message: `This is review ${i + 1}.`,
      images: [],
      likes: Math.floor(Math.random() * 10),
      liked: false,
      date: new Date(Date.now() - i * 86400000 * 2),
      fromUser: false
    }));
    setReviews(seed);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setReviews((r) => [...r]), 60000);
    return () => clearInterval(interval);
  }, []);

  const sorted = [
    ...reviews.filter((r) => r.fromUser),
    ...reviews.filter((r) => !r.fromUser).sort((a, b) => b.date - a.date)
  ];
  const visible = showAll ? sorted : sorted.slice(0, 3);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-2 pb-3">
        <span className="text-[#9CA3AF] text-[12px] flex items-center gap-1">
          Home{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <g clipPath="url(#clip0_6314_6968)">
              <path
                d="M3.8616 6.13798L0.861598 3.13798C0.781598 3.06598 0.689598 3.02998 0.585598 3.02998C0.481598 3.02998 0.389598 3.06598 0.309598 3.13798C0.229598 3.20998 0.191598 3.29998 0.195598 3.40798C0.199598 3.51598 0.237598 3.60998 0.309598 3.68998L3.0576 6.43798L0.309598 9.18598C0.237598 9.26598 0.201598 9.35998 0.201598 9.46798C0.201598 9.57598 0.237598 9.66598 0.309598 9.73798C0.333598 9.76198 0.369598 9.78398 0.417598 9.80398C0.465598 9.82398 0.513598 9.83398 0.561598 9.83398C0.609598 9.83398 0.657598 9.82398 0.705598 9.80398C0.753598 9.78398 0.789598 9.76198 0.813598 9.73798L3.8136 6.73798C3.9976 6.49798 4.0136 6.29798 3.8616 6.13798Z"
                fill="#9CA3AF"
              />
            </g>
            <defs>
              <clipPath id="clip0_6314_6968">
                <rect
                  width="11.69"
                  height="12"
                  fill="white"
                  transform="matrix(1 0 0 -1 0.191406 12.39)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span className="text-[#9CA3AF] text-[12px] flex items-center gap-1">
          Fruits & Vegetables{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <g clipPath="url(#clip0_6314_6968)">
              <path
                d="M3.8616 6.13798L0.861598 3.13798C0.781598 3.06598 0.689598 3.02998 0.585598 3.02998C0.481598 3.02998 0.389598 3.06598 0.309598 3.13798C0.229598 3.20998 0.191598 3.29998 0.195598 3.40798C0.199598 3.51598 0.237598 3.60998 0.309598 3.68998L3.0576 6.43798L0.309598 9.18598C0.237598 9.26598 0.201598 9.35998 0.201598 9.46798C0.201598 9.57598 0.237598 9.66598 0.309598 9.73798C0.333598 9.76198 0.369598 9.78398 0.417598 9.80398C0.465598 9.82398 0.513598 9.83398 0.561598 9.83398C0.609598 9.83398 0.657598 9.82398 0.705598 9.80398C0.753598 9.78398 0.789598 9.76198 0.813598 9.73798L3.8136 6.73798C3.9976 6.49798 4.0136 6.29798 3.8616 6.13798Z"
                fill="#9CA3AF"
              />
            </g>
            <defs>
              <clipPath id="clip0_6314_6968">
                <rect
                  width="11.69"
                  height="12"
                  fill="white"
                  transform="matrix(1 0 0 -1 0.191406 12.39)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span className="text-[#030712] text-[12px] font-medium flex items-center gap-1">
          Marketside Fresh Organic Bananas, Bunch{" "}
        </span>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-12 py-6 gap-0">
        {/* IMAGE SLIDER */}
        <div className="md:col-span-6 relative">
          <Slider {...settingsMain} ref={sliderMain}>
            {images2.map((img, i) => (
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
            className="absolute bottom-50 left-0 bg-white p-4 rounded-full shadow hover:bg-[#634C9F] cursor-pointer hover:text-white transition-all duration-300"
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
            {images2.map((img, i) => (
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
        <div className="md:col-span-6">
          <h1 className="text-[36px] text-[#030712] font-bold">
            Marketside Fresh Organic Bananas, Bunch
          </h1>
          <div className="flex items-center mt-2 mb-5">
            {/* Stars */}
            {Array.from({ length: 5 }).map((_, i) => (
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
                  fill={i < 3 ? "#FACC15" : "#D1D5DB"} // 3 filled stars
                />
              </svg>
            ))}

            {/* Rating Number */}
            <span className="text-[12px] text-gray-600 ml-1">3.0</span>
            <span className="mx-4 text-[12px] text-[#E5E7EB]">|</span>
            <p className="text-[#6B7280] text-[12px]">
              SKU:{" "}
              <span className="text-black font-semibold ml-1">E7F8G9H0</span>
            </p>
          </div>

          <p className="text-[13px] text-[#4B5563] mb-5">
            Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus
            malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent
            Vivamus adipiscing nisl ut dolor dignissim semper.
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-[30px] font-bold text-[#DC2626]" id="price">
              $0.89{" "}
            </span>
            <span
              className="text-[20px] font-semibold line-through text-[#111827]"
              id="price"
            >
              $1.99
            </span>
          </div>

          <button className="bg-[#16A34A] transition-all duration-300 hover:bg-[#16a34acf] text-white px-5 text-[14px] font-semibold cursor-pointer py-3 rounded-[8px]">
            Order on WhatsApp
          </button>
          <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-[6px] p-4 w-full flex flex-col sm:flex-row items-center justify-start gap-4 my-6">
            <div className="flex items-center gap-3 text-[#EA580C] font-bold text-[14px]">
              <span>Special Offer :</span>
              <div className="flex gap-2">
                {[
                  timeLeft.days,
                  timeLeft.hours,
                  timeLeft.minutes,
                  timeLeft.seconds,
                ].map((value, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FFEDD5] text-orange-700 border border-[#FED7AA] rounded-md py-[9px] px-3 text-center "
                  >
                    {String(value).padStart(2, "0")}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[#6B7280] text-[12px]">
              Remains until the end of the offer.
            </div>
          </div>
          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-between gap-6  border border-[#D1D5DB] bg-[rgba(255, 255, 255, 0.00)] w-fit px-4 py-3">
              <button
                className="cursor-pointer"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_7048)">
                    <path
                      d="M11.1492 8.08711H1.22116C1.07382 8.08711 0.94349 8.13811 0.830156 8.24011C0.716823 8.34211 0.660156 8.48094 0.660156 8.65661C0.660156 8.83227 0.711156 8.96827 0.813156 9.06461C0.915156 9.16094 1.05116 9.20911 1.22116 9.20911H11.1492C11.2965 9.20911 11.4268 9.15811 11.5402 9.05611C11.6535 8.95411 11.7102 8.81811 11.7102 8.64811C11.7102 8.47811 11.6535 8.34211 11.5402 8.24011C11.4268 8.13811 11.2965 8.08711 11.1492 8.08711Z"
                      fill="#030712"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_7048">
                      <rect
                        width="17"
                        height="17"
                        fill="white"
                        transform="matrix(1 0 0 -1 0.5 17.0801)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <span className="text-[#020617] text-[14px]">{quantity}</span>
              <button
                className="cursor-pointer"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_7054)">
                    <path
                      d="M11.1492 8.0871H6.74616V3.6161C6.74616 3.46877 6.69516 3.33844 6.59316 3.2251C6.49116 3.11177 6.35516 3.0551 6.18516 3.0551C6.01516 3.0551 5.87916 3.11177 5.77716 3.2251C5.67516 3.33844 5.62416 3.46877 5.62416 3.6161V8.0191H1.22116C1.07382 8.0191 0.94349 8.0701 0.830156 8.1721C0.716823 8.2741 0.660156 8.41294 0.660156 8.5886C0.660156 8.76427 0.711156 8.90027 0.813156 8.9966C0.915156 9.09294 1.05116 9.1411 1.22116 9.1411H5.62416V13.5441C5.62416 13.6914 5.67516 13.8218 5.77716 13.9351C5.87916 14.0484 6.01799 14.1051 6.19366 14.1051C6.36932 14.1051 6.50532 14.0541 6.60166 13.9521C6.69799 13.8501 6.74616 13.7141 6.74616 13.5441V9.1411H11.1492C11.2965 9.1411 11.4268 9.0901 11.5402 8.9881C11.6535 8.8861 11.7102 8.7501 11.7102 8.5801C11.7102 8.4101 11.6563 8.28544 11.5487 8.2061C11.441 8.12677 11.3078 8.0871 11.1492 8.0871Z"
                      fill="#030712"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_7054">
                      <rect
                        width="17"
                        height="17"
                        fill="white"
                        transform="matrix(1 0 0 -1 0.5 17.0801)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-[#16A34A] text-white px-5 text-[14px] font-semibold cursor-pointer py-3 rounded-[8px] flex items-center gap-2 transition-all duration-300 hover:bg-[#16a34acf]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_7058)">
                    <path
                      d="M7.57599 1.74208C7.15599 1.74208 6.76632 1.84708 6.40699 2.05708C6.04765 2.26708 5.76299 2.55174 5.55299 2.91108C5.34299 3.27041 5.23799 3.66008 5.23799 4.08008H4.04799C4.04799 3.44541 4.20432 2.85974 4.51699 2.32308C4.82965 1.78641 5.25432 1.36174 5.79099 1.04908C6.32765 0.736411 6.91332 0.580078 7.54799 0.580078C8.18265 0.580078 8.76832 0.736411 9.30499 1.04908C9.84165 1.36174 10.2663 1.78641 10.579 2.32308C10.8917 2.85974 11.048 3.44541 11.048 4.08008H13.344C13.68 4.08008 13.9647 4.19908 14.198 4.43708C14.4313 4.67508 14.548 4.96674 14.548 5.31208C14.548 5.38674 14.5433 5.45674 14.534 5.52208L13.232 13.0541C13.1573 13.4927 12.952 13.8567 12.616 14.1461C12.28 14.4354 11.8927 14.5801 11.454 14.5801H3.64199C3.20332 14.5801 2.81599 14.4354 2.47999 14.1461C2.14399 13.8567 1.93865 13.4927 1.86399 13.0541L0.561988 5.53608C0.505988 5.20008 0.573654 4.89208 0.764988 4.61208C0.956321 4.33208 1.21532 4.15941 1.54199 4.09408C1.60732 4.08474 1.67732 4.08008 1.75199 4.08008H9.91399C9.91399 3.66008 9.80899 3.27041 9.59899 2.91108C9.38899 2.55174 9.10432 2.26708 8.74499 2.05708C8.38565 1.84708 7.99599 1.74208 7.57599 1.74208ZM13.344 5.24208H1.75199C1.74265 5.24208 1.72865 5.26074 1.70999 5.29808V5.32608L3.01199 12.8581C3.03999 13.0074 3.10532 13.1334 3.20799 13.2361C3.31065 13.3387 3.43199 13.3947 3.57199 13.4041L3.64199 13.4181H11.454C11.594 13.4181 11.7223 13.3737 11.839 13.2851C11.9557 13.1964 12.0327 13.0774 12.07 12.9281L13.386 5.31208C13.386 5.27474 13.3767 5.25608 13.358 5.25608L13.344 5.24208Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_7058">
                      <rect
                        width="14"
                        height="14"
                        fill="white"
                        transform="matrix(1 0 0 -1 0.421875 14.5801)"
                      />
                    </clipPath>
                  </defs>
                </svg>{" "}
                Add to cart
              </button>
              <button className="bg-[#212529] text-white px-8 text-[14px] font-semibold cursor-pointer py-3 flex items-center gap-2 rounded-[8px] transition-all duration-300 hover:bg-[#21252acf]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_7063)">
                    <path
                      d="M8.12286 1.74208C7.70286 1.74208 7.3132 1.84708 6.95386 2.05708C6.59453 2.26708 6.30986 2.55174 6.09986 2.91108C5.88986 3.27041 5.78486 3.66008 5.78486 4.08008H4.59486C4.59486 3.44541 4.7512 2.85974 5.06386 2.32308C5.37653 1.78641 5.8012 1.36174 6.33786 1.04908C6.87453 0.736411 7.4602 0.580078 8.09486 0.580078C8.72953 0.580078 9.3152 0.736411 9.85186 1.04908C10.3885 1.36174 10.8132 1.78641 11.1259 2.32308C11.4385 2.85974 11.5949 3.44541 11.5949 4.08008H13.8909C14.2269 4.08008 14.5115 4.19908 14.7449 4.43708C14.9782 4.67508 15.0949 4.96674 15.0949 5.31208C15.0949 5.38674 15.0902 5.45674 15.0809 5.52208L13.7789 13.0541C13.7042 13.4927 13.4989 13.8567 13.1629 14.1461C12.8269 14.4354 12.4395 14.5801 12.0009 14.5801H4.18886C3.7502 14.5801 3.36286 14.4354 3.02686 14.1461C2.69086 13.8567 2.48553 13.4927 2.41086 13.0541L1.10886 5.53608C1.05286 5.20008 1.12053 4.89208 1.31186 4.61208C1.5032 4.33208 1.7622 4.15941 2.08886 4.09408C2.1542 4.08474 2.2242 4.08008 2.29886 4.08008H10.4609C10.4609 3.66008 10.3559 3.27041 10.1459 2.91108C9.93586 2.55174 9.6512 2.26708 9.29186 2.05708C8.93253 1.84708 8.54286 1.74208 8.12286 1.74208ZM13.8909 5.24208H2.29886C2.28953 5.24208 2.27553 5.26074 2.25686 5.29808V5.32608L3.55886 12.8581C3.58686 13.0074 3.6522 13.1334 3.75486 13.2361C3.85753 13.3387 3.97886 13.3947 4.11886 13.4041L4.18886 13.4181H12.0009C12.1409 13.4181 12.2692 13.3737 12.3859 13.2851C12.5025 13.1964 12.5795 13.0774 12.6169 12.9281L13.9329 5.31208C13.9329 5.27474 13.9235 5.25608 13.9049 5.25608L13.8909 5.24208Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_7063">
                      <rect
                        width="14"
                        height="14"
                        fill="white"
                        transform="matrix(1 0 0 -1 0.96875 14.5801)"
                      />
                    </clipPath>
                  </defs>
                </svg>{" "}
                Buy Now
              </button>
            </div>
          </div>

          {/* Extra Info */}
          <div className="mt-6 text-sm text-[#6B7280] space-y-2 border border-[#E5E7EB] px-6 py-3">
            <div className="flex items-start gap-6 pb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 26 27"
                fill="none"
              >
                <path
                  d="M20.5182 5.23403H3.20216C2.66482 5.23403 2.16216 5.36403 1.69416 5.62403C1.22616 5.88403 0.85349 6.23936 0.576156 6.69003C0.298823 7.1407 0.160156 7.6347 0.160156 8.17203V18.988C0.160156 19.5254 0.29449 20.028 0.563156 20.496C0.831823 20.964 1.19582 21.3367 1.65516 21.614C2.11449 21.8914 2.63016 22.03 3.20216 22.03H20.5182C21.0555 22.03 21.5582 21.8957 22.0262 21.627C22.4942 21.3584 22.8668 20.9944 23.1442 20.535C23.4215 20.0757 23.5602 19.56 23.5602 18.988V8.17203C23.5602 7.6347 23.4215 7.1407 23.1442 6.69003C22.8668 6.23936 22.4942 5.88403 22.0262 5.62403C21.5582 5.36403 21.0555 5.23403 20.5182 5.23403ZM3.20216 6.87203H20.5182C20.8995 6.87203 21.2115 7.00203 21.4542 7.26203C21.6968 7.52203 21.8182 7.82536 21.8182 8.17203V10.538H1.90216V8.17203C1.90216 7.7907 2.02349 7.4787 2.26616 7.23603C2.50882 6.99336 2.82082 6.87203 3.20216 6.87203ZM20.5182 20.392H3.20216C2.83816 20.392 2.53049 20.2577 2.27916 19.989C2.02782 19.7204 1.90216 19.4214 1.90216 19.092V12.384H21.9482V18.988C21.8788 19.3867 21.7185 19.7204 21.4672 19.989C21.2158 20.2577 20.8995 20.392 20.5182 20.392Z"
                  fill="#6B7280"
                />
              </svg>
              <p>
                <strong>Payment:</strong> Payment upon receipt of goods, Payment
                by card in the department, Google Pay, Online card, -5% discount
                in case of payment.
              </p>
            </div>
            <div className="flex items-start gap-6 border-t pt-3 border-[#E5E7EB]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 26 27"
                fill="none"
              >
                <path
                  d="M18.6982 5.23403L10.0402 1.98403C9.78016 1.88003 9.59816 1.88003 9.49416 1.98403L0.810156 5.23403C0.602156 5.28603 0.441823 5.3857 0.329156 5.53303C0.21649 5.68036 0.160156 5.83203 0.160156 5.98803V13.58C0.160156 15.5214 0.836156 17.428 2.18816 19.3C3.21082 20.6694 4.55416 21.978 6.21816 23.226C7.10216 23.8847 8.06416 24.5 9.10416 25.072L9.26016 25.176C9.34682 25.2454 9.45949 25.28 9.59816 25.28C9.73682 25.28 9.84082 25.2454 9.91016 25.176L10.0402 25.098C11.0282 24.5607 11.9642 23.9627 12.8482 23.304C14.5468 22.056 15.9075 20.7387 16.9302 19.352C18.3168 17.4627 19.0102 15.5387 19.0102 13.58V5.98803C19.1142 5.83203 19.1315 5.68036 19.0622 5.53303C18.9928 5.3857 18.8715 5.28603 18.6982 5.23403ZM17.5022 13.58C17.5022 15.14 16.9388 16.7 15.8122 18.26C14.9455 19.4387 13.7928 20.574 12.3542 21.666C11.4355 22.3594 10.5168 22.9487 9.59816 23.434C8.71416 22.966 7.79549 22.3767 6.84216 21.666C5.43816 20.574 4.31149 19.4387 3.46216 18.26C2.35282 16.7 1.79816 15.14 1.79816 13.58V6.53403L9.70216 3.62203L17.5022 6.53403V13.58ZM6.99816 13.034C6.82482 12.878 6.62549 12.8 6.40016 12.8C6.17482 12.8 5.97549 12.878 5.80216 13.034C5.62882 13.19 5.54649 13.385 5.55516 13.619C5.56382 13.853 5.64616 14.0567 5.80216 14.23L7.96016 16.388C8.15082 16.544 8.33282 16.622 8.50616 16.622C8.61016 16.622 8.71416 16.596 8.81816 16.544C8.92216 16.492 9.00016 16.44 9.05216 16.388L13.3942 12.072C13.5502 11.8987 13.6282 11.695 13.6282 11.461C13.6282 11.227 13.5502 11.032 13.3942 10.876C13.2382 10.72 13.0388 10.6377 12.7962 10.629C12.5535 10.6204 12.3542 10.7027 12.1982 10.876L8.61016 14.542L6.99816 13.034Z"
                  fill="#6B7280"
                />
              </svg>
              <p>
                <strong>Warranty:</strong>The Consumer Protection Act does not
                provide for the return of this product of proper quality.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-3  cursor-pointer ">
              <span className="py-1 px-0.5 border border-[#E5E7EB] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 18 32"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_7071)">
                    <path
                      d="M8.77552 24.6839C8.96534 24.757 9.14056 24.7935 9.30118 24.7935C9.4618 24.7935 9.64432 24.7497 9.84874 24.662C12.039 23.7713 13.8423 22.6324 15.2586 21.2453C16.5436 19.9749 17.4489 18.5805 17.9745 17.0619C18.4418 15.6456 18.544 14.2657 18.2812 12.9224C18.1643 12.0755 17.8614 11.3089 17.3722 10.6226C16.8831 9.93634 16.2698 9.39243 15.5324 8.99089C14.795 8.58934 13.9956 8.38127 13.1341 8.36667C11.7323 8.41047 10.4474 8.84122 9.27928 9.65891L9.30118 9.63701C8.74632 9.25736 8.15496 8.95803 7.52709 8.73901C6.87002 8.50538 6.19834 8.38127 5.51207 8.36667H5.49017C4.61407 8.36667 3.80003 8.57109 3.04805 8.97993C2.29607 9.38878 1.6755 9.93999 1.18635 10.6336C0.697194 11.3271 0.401512 12.0974 0.299301 12.9443V12.9662C0.0364722 14.3241 0.145984 15.7113 0.627837 17.1276C1.13889 18.6462 2.03689 20.0333 3.32183 21.2891C4.75279 22.6762 6.57068 23.8078 8.77552 24.6839ZM2.00769 13.3385C2.06609 12.7544 2.25591 12.2215 2.57715 11.7396C2.89838 11.2578 3.31453 10.8781 3.82558 10.6007C4.33664 10.3233 4.8915 10.1846 5.49017 10.1846C6.77511 10.2722 7.89213 10.7029 8.84123 11.4768H8.81933L9.30118 11.8272L9.80494 11.4549C10.2722 11.0753 10.7832 10.7832 11.3381 10.5788C11.9076 10.3452 12.4989 10.2138 13.1122 10.1846H13.1341C13.7182 10.1992 14.2621 10.3452 14.7658 10.6226C15.2696 10.9 15.6857 11.276 16.0143 11.7506C16.3428 12.2251 16.5363 12.7471 16.5947 13.3166V13.3385C16.7991 14.4044 16.6896 15.5141 16.2661 16.6677C15.8135 17.8942 15.0323 19.0258 13.9226 20.0625C12.7107 21.2307 11.1702 22.1944 9.30118 22.9537C7.43218 22.2236 5.88441 21.2745 4.65788 20.1063C3.54815 19.0696 2.76697 17.9307 2.31432 16.6896C1.89087 15.536 1.78866 14.419 2.00769 13.3385Z"
                      fill="#030712"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_7071">
                      <rect
                        width="21.69"
                        height="33"
                        fill="white"
                        transform="matrix(1 0 0 -1 0.160156 33.0801)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span>Add to wishlist</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer ">
              <span className="p-2 border border-[#E5E7EB] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                >
                  <path
                    d="M18.3549 13.192C18.1642 13.192 17.9956 13.258 17.8489 13.39C17.7022 13.522 17.6289 13.698 17.6289 13.918V17.592C17.6289 17.9 17.5152 18.1604 17.2879 18.373C17.0606 18.5857 16.8076 18.692 16.5289 18.692H3.68091C3.37291 18.692 3.11257 18.5784 2.89991 18.351C2.68724 18.1237 2.58091 17.8707 2.58091 17.592V13.918C2.58091 13.7274 2.51491 13.5587 2.38291 13.412C2.25091 13.2654 2.07491 13.192 1.85491 13.192C1.63491 13.192 1.45891 13.2507 1.32691 13.368C1.19491 13.4854 1.12891 13.6394 1.12891 13.83V17.504C1.12891 17.9587 1.24257 18.3804 1.46991 18.769C1.69724 19.1577 2.00524 19.4694 2.39391 19.704C2.78257 19.9387 3.21157 20.056 3.68091 20.056H16.5289C16.9836 20.056 17.4052 19.9424 17.7939 19.715C18.1826 19.4877 18.4942 19.1797 18.7289 18.791C18.9636 18.4024 19.0809 17.9734 19.0809 17.504V13.83C19.0809 13.654 19.0076 13.5037 18.8609 13.379C18.7142 13.2544 18.5456 13.192 18.3549 13.192ZM5.99091 7.86803L9.37891 4.48003V13.83C9.37891 14.0207 9.44491 14.1894 9.57691 14.336C9.70891 14.4827 9.88857 14.556 10.1159 14.556C10.3432 14.556 10.5192 14.4937 10.6439 14.369C10.7686 14.2444 10.8309 14.0647 10.8309 13.83V4.48003L14.2409 7.86803C14.3582 7.98536 14.5049 8.04403 14.6809 8.04403C14.7689 8.04403 14.8569 8.0257 14.9449 7.98903C15.0329 7.95236 15.0989 7.91203 15.1429 7.86803C15.2896 7.73603 15.3629 7.57103 15.3629 7.37303C15.3629 7.17503 15.2896 7.0027 15.1429 6.85603L10.5669 2.28003C10.5376 2.2507 10.5009 2.22136 10.4569 2.19203C10.4129 2.1627 10.3909 2.13336 10.3909 2.10403C10.2002 2.00136 10.0169 2.00136 9.84091 2.10403C9.78224 2.10403 9.73457 2.12236 9.69791 2.15903C9.66124 2.1957 9.64291 2.23603 9.64291 2.28003L5.06691 6.85603C4.92024 7.0027 4.84691 7.17503 4.84691 7.37303C4.84691 7.57103 4.92024 7.73603 5.06691 7.86803C5.21357 8.00003 5.36757 8.0697 5.52891 8.07703C5.69024 8.08436 5.84424 8.0147 5.99091 7.86803Z"
                    fill="#030712"
                  />
                </svg>
              </span>
              <span>Share this Product</span>
            </div>
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
              src={images2[imageIndex]}
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
      <div className="container mx-auto pt-10">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-[#E5E7EB] mb-4">
          {["description", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3.5 text-sm sm:text-base font-normal transition-all ${
                activeTab === tab
                  ? "border-b-2 border-[#030712] text-[#030712]"
                  : "text-[#030712]"
              }`}
            >
              {tab === "description"
                ? "Description"
                : `Reviews (${reviews.length})`}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === "description" ? (
            <div className="text-[#030712] text-[15px] space-y-4 leading-relaxed">
              <p>
                Quisque varius diam vel metus mattis, id aliquam diam rhoncus.
                Proin vitae magna in dui finibus malesuada et at nulla. Morbi
                elit ex, viverra vitae ante vel, blandit feugiat ligula. Fusce
                fermentum iaculis nibh, at sodales leo maximus a. Nullam
                ultricies sodales nunc, in pellentesque lorem mattis quis. Cras
                imperdiet est in nunc tristique lacinia. Nullam aliquam mauris
                eu accumsan tincidunt. Suspendisse velit ex, aliquet vel ornare
                vel, dignissim a tortor.
              </p>
              <p>
                Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat
                auctor, eleifend nunc a, lobortis neque. Praesent aliquam
                dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit
                amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit
                amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus
                ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut
                arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in
                vestibulum vulputate, lorem orci convallis quam, sit amet
                consequat nulla felis pharetra lacus. Duis semper erat mauris,
                sed egestas purus commodo vel.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 mt-8  container mx-auto">
      {/* LEFT */}
      <div className="space-y-6">
        {/* Summary */}
   <div className="space-y-3">
  {ratingBreakdown.map((r) => {
    const percent = reviews.length ? (r.count / reviews.length) * 100 : 0;
    return (
      <div key={r.star} className="flex items-center gap-3">
        {/* Text + stars */}
   <div className="flex items-center gap-2 text-sm font-medium text-gray-700 min-w-[90px]">
  <span className="whitespace-nowrap">{r.star} </span>
  <div className="flex text-yellow-400">
    {Array.from({ length: r.star }).map((_, i) => (
      <FaStar key={i} size={14} />
    ))}
  </div>
</div>


        {/* Progress bar */}
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Count */}
        <div className="text-sm text-gray-500 w-6 text-right">{r.count}</div>
      </div>
    );
  })}
</div>



        {/* Review Cards */}
        {visible.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <Avatar name={r.name} />
              <div className="ml-3">
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs text-gray-500">{getDateText(r.date)}</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) =>
                i < r.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
              )}
            </div>
            <p className="text-gray-700 mb-2">{r.message}</p>
            {r.images.length > 0 && (
              <div className="flex gap-2 mb-2">
                {r.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt="rev-img"
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                onClick={() => toggleLike(r.id)}
                className="flex items-center text-sm text-gray-600 hover:text-blue-600"
              >
                {r.liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                <span className="ml-1">{r.likes}</span>
              </button>
              {r.fromUser && (
                <button
                  onClick={handleEdit}
                  className="text-sm text-blue-600 underline"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Toggle */}
        {reviews.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:underline"
          >
            {showAll ? 'View Less' : 'View More'}
          </button>
        )}
      </div>

      {/* RIGHT */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold">
          {userReview ? 'Edit Your Review' : 'Post a Review'}
        </h2>
        <div className="flex text-yellow-400 text-2xl">
          {[1,2,3,4,5].map((i) => (
            <button
              key={i}
              onClick={() => setRating(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              className="p-1"
            >
              {i <= (hover || rating) ? <FaStar /> : <FaRegStar />}
            </button>
          ))}
        </div>
        <textarea
          rows={3}
          className="w-full border rounded p-2"
          placeholder="Write your review..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div className="flex gap-2 flex-wrap">
          {images.map((img) => (
            <div key={img.url} className="relative">
              <img
                src={img.url}
                alt="preview"
                className="w-20 h-20 rounded object-cover"
              />
              <button
                onClick={() => removeImage(img.url)}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white px-1 rounded-full text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
        >
          {userReview ? 'Update Review' : 'Submit Review'}
        </button>
      </div>
            </div>
          )}
        </div>
      </div>
      <section className="py-10 " ref={containerRef}>
        {/* Heading */}
        <div
          ref={sectionRef}
          className="flex justify-between items-center mb-6 flex-wrap gap-4 md:gap-0"
        >
          {/* Text Section */}
          <div ref={headingRef} className="flex items-center gap-3 flex-wrap">
            <h2 className="text-[18px] font-bold text-[#030712]">
              Related Products
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(227px,1fr))] grid-cols-1">
          {products.map((item) => (
            <div
              key={item.id}
              className="product-card bg-white p-4 border border-[#E5E7EB]  group h-full flex flex-col justify-between"
            >
              <div className="relative mb-4">
                <Link href={"/"}>
                  <img
                    src={item.image.src}
                    alt={item.title}
                    className="w-full h-40 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {/* Discount Badge */}
                <span className="absolute top-1 bg-[#DC2626] text-[#FEF2F2] text-[10px] font-bold px-2 py-1 rounded-full">
                  {`${item.discount}%`}
                </span>
                <span className="absolute top-1 right-0 cursor-pointer hover:scale-105 transition-transform duration-300">
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
              <div className="flex items-center gap-2 mb-2">
                {item.organic && (
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
                {item.cold && (
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

              {/* Title */}
              <Link
                href="/"
                className="text-[13px] cursor-pointer font-semibold text-[#030712] hover:text-[#634C9F] transition-all duration-300 mb-1 line-clamp-2 pr-1"
              >
                {item.title}
              </Link>

              <div className="flex items-center mt-2.5 mb-5">
                {/* Stars */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={`star-${item.id}-${i}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 11 12"
                    fill="none"
                  >
                    <path
                      d="M6.09821 1.11494C6.04133 0.997618 5.95956 0.904128 5.8529 0.834469C5.74625 0.764811 5.62893 0.72998 5.50095 0.72998C5.37296 0.72998 5.25387 0.764811 5.14366 0.834469C5.03345 0.904128 4.9499 0.997618 4.89302 1.11494L3.55985 3.96362L0.562893 4.41457C0.442019 4.42924 0.331811 4.47873 0.232268 4.56305C0.132724 4.64738 0.0651771 4.75187 0.029626 4.87652C-0.00592519 5.00117 -0.00948031 5.12766 0.0189606 5.25598C0.0474015 5.3843 0.107838 5.49245 0.200271 5.58044L2.36534 7.80219L1.8534 10.9258C1.83207 11.0578 1.84629 11.1825 1.89606 11.2998C1.94583 11.4171 2.02049 11.5161 2.12003 11.5968C2.21958 11.6774 2.33334 11.7214 2.46132 11.7288C2.58931 11.7361 2.71018 11.7104 2.82395 11.6518L5.50095 10.1779L8.17795 11.6518C8.29171 11.7104 8.41081 11.7361 8.53524 11.7288C8.65967 11.7214 8.77521 11.6793 8.88186 11.6023C8.98852 11.5253 9.06495 11.4263 9.11117 11.3053C9.15738 11.1843 9.16983 11.0578 9.1485 10.9258L8.62589 7.80219L10.8016 5.58044C10.8941 5.49245 10.9545 5.3843 10.9829 5.25598C11.0114 5.12766 11.0043 5.00117 10.9616 4.87652C10.9189 4.75187 10.8514 4.64738 10.759 4.56305C10.6665 4.47873 10.5563 4.42924 10.4283 4.41457L7.44204 3.96362L6.09821 1.11494Z"
                      fill={i < item.rating ? "#FACC15" : "#D1D5DB"}
                    />
                  </svg>
                ))}

                {/* Rating Number */}
                <span className="text-xs text-gray-600 ml-1">
                  {item.rating}.0
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className="text-[20px] font-bold text-[#DC2626]"
                  id="price"
                >
                  ${item.currentPrice.toFixed(2)}
                </span>
                <span
                  className="text-[15px] font-semibold line-through text-[#111827]"
                  id="price"
                >
                  ${item.originalPrice.toFixed(2)}
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
          ))}
        </div>
      </section>
    </div>
  );
}
