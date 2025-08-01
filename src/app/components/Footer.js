"use client";
import Image from "next/image";
import playStore from "../assets/playstore.png";
import appStore from "../assets/qppstore.png";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
 const newsletterRef = useRef(null);
  const footerRef = useRef(null);
  const bottomRef = useRef(null);
  const helpRef = useRef(null);
  const moneyRef = useRef(null);
  const helpYouRef = useRef(null);
  const knowUsRef = useRef(null);
  const sectionRef = useRef(null); // App & Social

 useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: newsletterRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Newsletter (faster)
    tl.from(".newsletter-heading", {
      opacity: 0,
      y: 30,
      duration: 0.4,
      ease: "power2.out",
    })
      .from(".newsletter-text", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power1.out",
      }, "<0.1")
      .from(".newsletter-form", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power1.out",
      }, "<0.1")
      .from(".newsletter-note", {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power1.out",
      }, "<0.1");

    // Help
    tl.from(helpRef.current, {
      opacity: 0,
      y: 25,
      duration: 0.5,
      ease: "power1.out",
    })
      .from(".footer-help-item", {
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.3,
        ease: "power1.out",
      }, "<");

    // Money
    tl.from(moneyRef.current, {
      opacity: 0,
      y: 25,
      duration: 0.4,
      ease: "power1.out",
    }, "<0.1");

    // Help You
    tl.from(helpYouRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: "power2.out",
    })
      .from(".footer-help-item", {
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.3,
        ease: "power1.out",
      }, "<");

    // Know Us
    tl.from(knowUsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: "power2.out",
    })
      .from(".footer-know-item", {
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.3,
        ease: "power1.out",
      }, "<");

    // App & Social
    tl.from(sectionRef.current.querySelector(".app-heading"), {
      y: 15,
      opacity: 0,
      duration: 0.4,
      ease: "power1.out",
    })
      .from(sectionRef.current.querySelectorAll(".app-link"), {
        x: -20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.4,
        ease: "power1.out",
      }, "<0.1")
      .from(sectionRef.current.querySelector(".follow-text"), {
        y: 10,
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
      }, "<0.1")
      .from(sectionRef.current.querySelectorAll(".social-icon"), {
        scale: 0.95,
        opacity: 0,
        stagger: 0.08,
        duration: 0.3,
        ease: "back.out(1.5)",
      }, "<");

    // Footer container
    tl.from(footerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
    });

    // Bottom
    tl.from(bottomRef.current, {
      opacity: 0,
      y: 25,
      duration: 0.6,
      ease: "power2.out",
    })
      .from(".footer-icon", {
        y: 15,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power1.out",
      }, "<")
      .from(".footer-link", {
        opacity: 0,
        y: 15,
        duration: 0.3,
        stagger: 0.08,
        ease: "power1.out",
      }, "<");

  }, newsletterRef);

  return () => ctx.revert();
}, []);


  return (
    <footer className="bg-[#F3F4F6] text-gray-700 text-sm py-10">
      <div className="container mx-auto " ref={newsletterRef}>
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-b border-[#D1D5DB] pb-10 mb-10 gap-4">
          <div className="text-center lg:text-left">
            <h2 className="text-[20px] text-[#111827] font-semibold mb-1 newsletter-heading">
              Join our newsletter for <span id="price">$15</span> offs
            </h2>
            <p className="text-[#6B7280] text-[12px] newsletter-text">
              Register now to get latest updates on promotions & <br /> coupons.
              Don&apos;t worry, we not spam!
            </p>
          </div>
          <div className="flex flex-col">
            <div
              className="flex items-center justify-between w-full sm:w-auto bg-white border border-[#D1D5DB] rounded-lg newsletter-form"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                className="ml-4"
              >
                <path
                  d="M15.8202 3.00986H2.50016C2.08682 3.00986 1.70016 3.10986 1.34016 3.30986C0.980156 3.50986 0.69349 3.7832 0.480156 4.12986C0.266823 4.47653 0.160156 4.85653 0.160156 5.26986V15.2699C0.160156 15.6832 0.26349 16.0699 0.470156 16.4299C0.676823 16.7899 0.956823 17.0765 1.31016 17.2899C1.66349 17.5032 2.06016 17.6099 2.50016 17.6099H15.8202C16.2335 17.6099 16.6202 17.5065 16.9802 17.2999C17.3402 17.0932 17.6268 16.8132 17.8402 16.4599C18.0535 16.1065 18.1602 15.7099 18.1602 15.2699V5.26986C18.1602 4.85653 18.0535 4.47653 17.8402 4.12986C17.6268 3.7832 17.3402 3.50986 16.9802 3.30986C16.6202 3.10986 16.2335 3.00986 15.8202 3.00986ZM2.50016 4.26986H15.8202C16.1135 4.26986 16.3535 4.36986 16.5402 4.56986C16.7268 4.76986 16.8202 5.0032 16.8202 5.26986V5.76986L9.66016 10.3499C9.48682 10.4299 9.30682 10.4699 9.12016 10.4699C8.93349 10.4699 8.75349 10.4299 8.58016 10.3499L1.50016 5.76986V5.26986C1.50016 4.97653 1.59349 4.73653 1.78016 4.54986C1.96682 4.3632 2.20682 4.26986 2.50016 4.26986ZM15.8202 16.3499H2.50016C2.22016 16.3499 1.98349 16.2465 1.79016 16.0399C1.59682 15.8332 1.50016 15.6032 1.50016 15.3499V7.26986L8.00016 11.4299C8.28016 11.6565 8.66682 11.7699 9.16016 11.7699C9.65349 11.7699 10.0402 11.6565 10.3202 11.4299L16.8202 7.26986V15.2699C16.8202 15.5632 16.7268 15.8165 16.5402 16.0299C16.3535 16.2432 16.1135 16.3499 15.8202 16.3499Z"
                  fill="#9CA3AF"
                />
              </svg>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-72 px-2 py-3 "
              />
              <button className="bg-[#634C9F] text-white px-5 py-3 rounded-tr-lg rounded-br-lg cursor-pointer hover:bg-[#7A5BBF] transition-colors duration-300">
                SEND
              </button>
            </div>
            <p className="text-[#6B7280] text-[10px] mt-2 newsletter-note">
              By subscribing you agree to our{" "}
              <span className="text-[#634C9F] font-semibold cursor-pointer">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-[#634C9F] font-semibold cursor-pointer">
                Privacy & Cookies Policy.
              </span>{" "}
            </p>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Help Section */}
          <div ref={helpRef}>
            <h3 className="font-semibold text-[#111827] text-[14px] mb-5">
              Do You Need Help ?
            </h3>
            <p className="mb-8 text-[#6B7280] text-[12px]">
              Autoseligen syr. Nek diarask fröbomba. Nör antipol kynoda nynat.
              Pressa fåmoska.
            </p>
            <div className="flex items-start gap-4 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
              >
                <path
                  d="M22.3434 17.2654C21.13 17.1347 20.122 16.864 19.3194 16.4534C18.7407 16.2294 18.148 16.1874 17.5414 16.3274C16.9347 16.4674 16.398 16.7427 15.9314 17.1534L14.8674 18.3294C12.5154 16.7987 10.574 14.8574 9.04338 12.5054L10.1074 11.4414C10.5554 10.9934 10.84 10.466 10.9614 9.85938C11.0827 9.25272 11.0314 8.65072 10.8074 8.05338C10.4714 7.17605 10.238 6.16805 10.1074 5.02938C9.97672 4.26405 9.59872 3.62472 8.97338 3.11138C8.34805 2.59805 7.63405 2.34138 6.83138 2.34138H3.10738C2.52872 2.37872 2.01072 2.56538 1.55338 2.90138C1.09605 3.23738 0.741382 3.66672 0.489382 4.18938C0.237382 4.71205 0.130049 5.26272 0.167382 5.84138C0.354049 7.70805 0.764715 9.53272 1.39938 11.3154C2.03405 13.0981 2.87405 14.7734 3.91938 16.3414C5.78605 19.2907 8.19405 21.6987 11.1434 23.5654C12.73 24.5547 14.41 25.3667 16.1834 26.0014C17.9567 26.636 19.7767 27.0747 21.6434 27.3174H22.0074C22.3994 27.3174 22.7914 27.2334 23.1834 27.0654C23.5754 26.8974 23.9207 26.6687 24.2194 26.3794C24.518 26.09 24.7467 25.7494 24.9054 25.3574C25.064 24.9654 25.1434 24.564 25.1434 24.1534V20.6534C25.1434 19.7947 24.882 19.048 24.3594 18.4134C23.8367 17.7787 23.1647 17.396 22.3434 17.2654ZM23.2674 20.5414V24.0414C23.2674 24.4334 23.118 24.788 22.8194 25.1054C22.4834 25.404 22.1287 25.5534 21.7554 25.5534H21.6434C19.926 25.3854 18.2554 25.012 16.6314 24.4334C14.9514 23.836 13.3927 23.0427 11.9554 22.0534C10.63 21.1947 9.39338 20.1914 8.24538 19.0434C7.09738 17.8954 6.08472 16.6494 5.20738 15.3054C4.27405 13.8494 3.51338 12.3 2.92538 10.6574C2.33738 9.01472 1.93138 7.33472 1.70738 5.61738C1.76338 5.18805 1.93138 4.82872 2.21138 4.53938C2.49138 4.25005 2.82738 4.10538 3.21938 4.10538H6.83138C7.18605 4.10538 7.50805 4.23138 7.79738 4.48338C8.08672 4.73538 8.23138 5.02938 8.23138 5.36538C8.26872 5.85072 8.36205 6.39205 8.51138 6.98938C8.60472 7.36272 8.75405 7.90405 8.95938 8.61338L9.04338 8.86538C9.15538 9.16405 9.18338 9.44872 9.12738 9.71938C9.07138 9.99005 8.93138 10.2187 8.70738 10.4054L7.41938 11.8054C7.25138 11.9174 7.15338 12.0714 7.12538 12.2674C7.09738 12.4634 7.11138 12.6547 7.16738 12.8414C8.04472 14.3534 9.11338 15.7394 10.3734 16.9994C11.6334 18.2594 13.0194 19.328 14.5314 20.2054C14.6994 20.3174 14.886 20.3547 15.0914 20.3174C15.2967 20.28 15.4554 20.196 15.5674 20.0654L17.1074 18.5534C17.294 18.3667 17.5367 18.236 17.8354 18.1614C18.134 18.0867 18.3954 18.1054 18.6194 18.2174C19.702 18.6467 20.8687 18.9174 22.1194 19.0294C22.474 19.0854 22.7727 19.2674 23.0154 19.5754C23.258 19.8834 23.342 20.2054 23.2674 20.5414ZM14.8674 3.96538C16.3794 4.11472 17.7514 4.58138 18.9834 5.36538C20.2154 6.14938 21.2234 7.15738 22.0074 8.38938C22.7914 9.62138 23.258 10.9934 23.4074 12.5054C23.4074 12.7294 23.496 12.9207 23.6734 13.0794C23.8507 13.238 24.0327 13.3174 24.2194 13.3174H24.3314C24.5554 13.3174 24.7467 13.2194 24.9054 13.0234C25.064 12.8274 25.1434 12.6081 25.1434 12.3654C24.9567 10.6107 24.3874 8.99605 23.4354 7.52138C22.5207 6.08405 21.3307 4.90805 19.8654 3.99338C18.4 3.07872 16.7807 2.52805 15.0074 2.34138C14.7647 2.34138 14.5454 2.42072 14.3494 2.57938C14.1534 2.73805 14.0554 2.92005 14.0554 3.12538C14.0554 3.33072 14.1347 3.52205 14.2934 3.69938C14.452 3.87672 14.6434 3.96538 14.8674 3.96538ZM14.0554 7.71738C13.9994 7.94138 14.046 8.15605 14.1954 8.36138C14.3447 8.56672 14.5314 8.69738 14.7554 8.75338C15.726 8.94005 16.5707 9.39738 17.2894 10.1254C18.008 10.8534 18.4887 11.7214 18.7314 12.7294C18.7874 12.9534 18.89 13.126 19.0394 13.2474C19.1887 13.3687 19.3567 13.4294 19.5434 13.4294H19.6554C19.898 13.3734 20.0894 13.2427 20.2294 13.0374C20.3694 12.8321 20.4114 12.6081 20.3554 12.3654C20.1314 11.0401 19.5387 9.89205 18.5774 8.92138C17.616 7.95072 16.4634 7.31605 15.1194 7.01738C14.8767 6.96138 14.6527 6.99405 14.4474 7.11538C14.242 7.23672 14.1114 7.43738 14.0554 7.71738Z"
                  fill="#111827"
                />
              </svg>{" "}
              <div className="flex flex-col gap-1">
                <span className="text-[12px]">Monday-Friday: 08am–9pm</span>
                <p className="text-xl font-bold">0 800 300-353</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
              >
                <path
                  d="M22.0842 4.16547H3.43616C2.85749 4.16547 2.31616 4.30547 1.81216 4.58547C1.30816 4.86547 0.906823 5.24813 0.608156 5.73347C0.30949 6.2188 0.160156 6.7508 0.160156 7.32947V21.3295C0.160156 21.9081 0.304823 22.4495 0.594156 22.9535C0.88349 23.4575 1.27549 23.8588 1.77016 24.1575C2.26482 24.4561 2.82016 24.6055 3.43616 24.6055H22.0842C22.6628 24.6055 23.2042 24.4608 23.7082 24.1715C24.2122 23.8821 24.6135 23.4901 24.9122 22.9955C25.2108 22.5008 25.3602 21.9455 25.3602 21.3295V7.32947C25.3602 6.7508 25.2108 6.2188 24.9122 5.73347C24.6135 5.24813 24.2122 4.86547 23.7082 4.58547C23.2042 4.30547 22.6628 4.16547 22.0842 4.16547ZM3.43616 5.92947H22.0842C22.4948 5.92947 22.8308 6.06947 23.0922 6.34947C23.3535 6.62947 23.4842 6.95613 23.4842 7.32947V8.02947L13.4602 14.4415C13.2175 14.5535 12.9655 14.6095 12.7042 14.6095C12.4428 14.6095 12.1908 14.5535 11.9482 14.4415L2.03616 8.02947V7.32947C2.03616 6.9188 2.16682 6.5828 2.42816 6.32147C2.68949 6.06013 3.02549 5.92947 3.43616 5.92947ZM22.0842 22.8415H3.43616C3.04416 22.8415 2.71282 22.6968 2.44216 22.4075C2.17149 22.1181 2.03616 21.7961 2.03616 21.4415V10.1295L11.1362 15.9535C11.5282 16.2708 12.0695 16.4295 12.7602 16.4295C13.4508 16.4295 13.9922 16.2708 14.3842 15.9535L23.4842 10.1295V21.3295C23.4842 21.7401 23.3535 22.0948 23.0922 22.3935C22.8308 22.6921 22.4948 22.8415 22.0842 22.8415Z"
                  fill="#111827"
                />
              </svg>{" "}
              <div className="flex flex-col gap-1">
                <span className="text-[12px]">Need help with your order?</span>
                <p className="text-md font-semibold">info@example.com</p>
              </div>
            </div>
          </div>

          {/* Make Money Section */}
          <div ref={moneyRef}>
            <h3 className="font-semibold text-[#111827] text-[14px] mb-5">
              Make Money with Us
            </h3>
            <ul className="space-y-2">
              <li className="text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Sell on Grogin
              </li>
              <li className="text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Sell Your Services on Grogin
              </li>
              <li className="text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Sell on Grogin Business
              </li>
              <li className="text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Sell Your Apps on Grogin
              </li>
              <li className="text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Become an Affiliate
              </li>
              <li className="text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Advertise Your Products
              </li>
              <li className="text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Sell-Publish with Us
              </li>
              <li className="text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Become a Blowwe Vendor
              </li>
            </ul>
          </div>

          {/* Help You Section */}
          <div ref={helpYouRef} >
            <h3 className="font-semibold text-[#111827] text-[14px] mb-5">
              Let Us Help You
            </h3>
           <ul className="space-y-2">
    {[
      "Accessibility Statement",
      "Your Orders",
      "Returns & Replacements",
      "Shipping Rates & Policies",
      "Refund and Returns Policy",
      "Privacy Policy",
      "Terms and Conditions",
      "Cookie Settings",
      "Help Center",
    ].map((text, i) => (
      <li key={i} className=" text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
        {text}
      </li>
    ))}
  </ul>
          </div>

          {/* Know Us Section */}
          <div ref={knowUsRef} >
            <h3 className="font-semibold text-[#111827] text-[14px] mb-5">
              Get to Know Us
            </h3>
            <ul className="space-y-2">
              <li className=" text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Careers for Grogin
              </li>
              <li className=" text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                About Grogin
              </li>
              <li className=" text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Investor Relations
              </li>
              <li className=" text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Grogin Devices
              </li>
              <li className=" text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Customer reviews
              </li>
              <li className=" text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Social Responsibility
              </li>
              <li className=" text-[#4B5563] text-[13px] cursor-pointer hover:text-[#634C9F] hover:font-medium transition-all duration-300">
                Store Locations
              </li>
            </ul>
          </div>

          {/* App & Social */}
          <div ref={sectionRef}>
            <h3 className="app-heading font-semibold text-[#111827] text-[14px] mb-5">
              Download our app
            </h3>
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 app-link">
                <Image
                  src={playStore}
                  alt="Google Play"
                  width={160}
                  height={40}
                />
                <p className="text-[10px] text-[#6B7280] ">
                  Download App Get -20% Discount
                </p>
              </div>
              <div className="flex items-center gap-2 app-link">
                <Image src={appStore} alt="App Store" width={160} height={40} />
                <p className="text-[10px] text-[#6B7280]">
                  Download App Get -25% Discount
                </p>
              </div>
            </div>
            <p className="mb-2 mt-10 follow-text">Follow us on social media:</p>
            <div className="flex  mt-4 flex-wrap space gap-2 ">
              <div className="cursor-pointer social-icon bg-white p-4 rounded-[6px] hover:bg-[#634C9F] text-[#1877F2] hover:text-white transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 15 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6481_3507)">
                    <path
                      d="M10.4727 8.59992L10.8927 5.88492H8.28266V4.12992C8.28266 3.70992 8.39266 3.37492 8.61266 3.12492C8.88266 2.81492 9.28266 2.65992 9.81266 2.65992H10.9977V0.349922L10.3377 0.259922C9.80766 0.199923 9.32766 0.169922 8.89766 0.169922C8.17766 0.169922 7.55266 0.312422 7.02266 0.597423C6.49266 0.882422 6.08266 1.29992 5.79266 1.84992C5.50266 2.39992 5.35766 3.05992 5.35766 3.82992V5.88492H2.97266V8.59992H5.35766V15.1699H8.28266V8.59992H10.4727Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6481_3507">
                      <rect
                        width="15"
                        height="15"
                        fill="white"
                        transform="matrix(1 0 0 -1 0 15.1699)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="cursor-pointer social-icon bg-white p-4 rounded-[6px] hover:bg-[#634C9F] text-[#000000] hover:text-white transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M20.66 3h-3.07l-5.17 6.82L7.13 3H3.06l6.91 9.1L3 21h3.07l5.61-7.4L16.87 21h4.07l-7.1-9.33L20.66 3z" />
                </svg>
              </div>
              <div className="cursor-pointer social-icon bg-white p-4 rounded-[6px] hover:bg-[#634C9F] text-[#FD1D1D] hover:text-white transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M7.66816 4.06973C7.01749 4.06973 6.41749 4.2324 5.86816 4.55773C5.31882 4.88307 4.88149 5.3204 4.55616 5.86973C4.23082 6.41907 4.06816 7.01907 4.06816 7.66973C4.06816 8.3204 4.23082 8.9204 4.55616 9.46973C4.88149 10.0191 5.31882 10.4537 5.86816 10.7737C6.41749 11.0937 7.01749 11.2537 7.66816 11.2537C8.31882 11.2537 8.91882 11.0937 9.46816 10.7737C10.0175 10.4537 10.4522 10.0191 10.7722 9.46973C11.0922 8.9204 11.2522 8.3204 11.2522 7.66973C11.2522 7.01907 11.0922 6.41907 10.7722 5.86973C10.4522 5.3204 10.0175 4.88307 9.46816 4.55773C8.91882 4.2324 8.31882 4.06973 7.66816 4.06973ZM7.66816 10.0057C7.24149 10.0057 6.84949 9.90173 6.49216 9.69373C6.13482 9.48573 5.85216 9.2004 5.64416 8.83773C5.43616 8.47507 5.33216 8.08573 5.33216 7.66973C5.33216 7.25373 5.43616 6.8644 5.64416 6.50173C5.85216 6.13907 6.13482 5.85373 6.49216 5.64573C6.84949 5.43773 7.24149 5.33373 7.66816 5.33373C8.09482 5.33373 8.48682 5.43773 8.84416 5.64573C9.20149 5.85373 9.48416 6.1364 9.69216 6.49373C9.90016 6.85107 10.0042 7.24307 10.0042 7.66973C10.0042 8.0964 9.90016 8.4884 9.69216 8.84573C9.48416 9.20307 9.19882 9.48573 8.83616 9.69373C8.47349 9.90173 8.08416 10.0057 7.66816 10.0057ZM12.2442 3.92573C12.2442 4.1604 12.1615 4.3604 11.9962 4.52573C11.8308 4.69107 11.6308 4.77373 11.3962 4.77373C11.1615 4.77373 10.9642 4.69107 10.8042 4.52573C10.6442 4.3604 10.5642 4.1604 10.5642 3.92573C10.5642 3.69107 10.6442 3.49373 10.8042 3.33373C10.9642 3.17373 11.1615 3.09373 11.3962 3.09373C11.6308 3.09373 11.8308 3.17373 11.9962 3.33373C12.1615 3.49373 12.2442 3.69107 12.2442 3.92573ZM14.6122 4.77373C14.5908 4.16573 14.5002 3.63773 14.3402 3.18973C14.1588 2.67773 13.8735 2.22973 13.4842 1.84573C13.0948 1.46173 12.6442 1.17907 12.1322 0.997734C11.6842 0.837733 11.1562 0.741734 10.5482 0.709734C9.97216 0.677733 9.00949 0.661734 7.66016 0.661734C6.31082 0.661734 5.34816 0.677733 4.77216 0.709734C4.15349 0.741734 3.62549 0.837733 3.18816 0.997734C2.67616 1.17907 2.22816 1.46173 1.84416 1.84573C1.46016 2.22973 1.17749 2.67773 0.996156 3.18973C0.82549 3.63773 0.72949 4.16573 0.708156 4.77373C0.676156 5.34973 0.660156 6.3124 0.660156 7.66173C0.660156 9.01107 0.676156 9.97373 0.708156 10.5497C0.72949 11.1577 0.820156 11.6857 0.980156 12.1337C1.16149 12.6457 1.44949 13.0991 1.84416 13.4937C2.23882 13.8884 2.69216 14.1711 3.20416 14.3417C3.63082 14.5017 4.15349 14.5924 4.77216 14.6137C5.34816 14.6564 6.31082 14.6777 7.66016 14.6777C9.00949 14.6777 9.97216 14.6564 10.5482 14.6137C11.1562 14.5924 11.6842 14.5017 12.1322 14.3417C12.6442 14.1604 13.0948 13.8751 13.4842 13.4857C13.8735 13.0964 14.1588 12.6457 14.3402 12.1337C14.5002 11.6857 14.5908 11.1577 14.6122 10.5497C14.6442 9.97373 14.6602 9.01373 14.6602 7.66973C14.6602 6.32573 14.6442 5.3604 14.6122 4.77373ZM13.1242 11.7977C13.0068 12.0964 12.8335 12.3631 12.6042 12.5977C12.3748 12.8324 12.1055 13.0084 11.7962 13.1257C11.4442 13.2644 10.8735 13.3551 10.0842 13.3977C9.63616 13.4191 8.99082 13.4244 8.14816 13.4137H7.18816C6.34549 13.4244 5.70016 13.4191 5.25216 13.3977C4.45216 13.3551 3.88149 13.2644 3.54016 13.1257C3.23082 13.0084 2.96149 12.8351 2.73216 12.6057C2.50282 12.3764 2.32949 12.1071 2.21216 11.7977C2.07349 11.4457 1.98282 10.8751 1.94016 10.0857C1.91882 9.63773 1.91349 8.9924 1.92416 8.14973V7.18973C1.91349 6.34707 1.91882 5.70173 1.94016 5.25373C1.98282 4.45373 2.07349 3.88307 2.21216 3.54173C2.32949 3.2324 2.50282 2.96307 2.73216 2.73373C2.96149 2.5044 3.23082 2.33107 3.54016 2.21373C3.88149 2.07507 4.44682 1.9844 5.23616 1.94173C5.68416 1.9204 6.33482 1.91507 7.18816 1.92573H8.14816C8.99082 1.91507 9.63616 1.9204 10.0842 1.94173C10.8735 1.9844 11.4442 2.07507 11.7962 2.21373C12.1055 2.33107 12.3748 2.5044 12.6042 2.73373C12.8335 2.96307 13.0068 3.2324 13.1242 3.54173C13.2628 3.88307 13.3535 4.4484 13.3962 5.23773C13.4175 5.68573 13.4228 6.3364 13.4122 7.18973V8.14973C13.4228 8.9924 13.4175 9.63773 13.3962 10.0857C13.3535 10.8751 13.2628 11.4457 13.1242 11.7977Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="cursor-pointer social-icon bg-white p-4 rounded-[6px] hover:bg-[#634C9F] text-[#0077B5] hover:text-white transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 15 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6481_3516)">
                    <path
                      d="M4.03766 13.2949H1.32266V4.53492H4.03766V13.2949ZM2.67266 3.33492C2.39266 3.33492 2.13016 3.26242 1.88516 3.11742C1.64016 2.97242 1.44766 2.77992 1.30766 2.53992C1.16766 2.29992 1.09766 2.03492 1.09766 1.74492C1.09766 1.45492 1.16766 1.18992 1.30766 0.949923C1.44766 0.709922 1.63766 0.519922 1.87766 0.379922C2.11766 0.239923 2.38266 0.169922 2.67266 0.169922C2.96266 0.169922 3.22766 0.239923 3.46766 0.379922C3.70766 0.519922 3.89766 0.709922 4.03766 0.949923C4.17766 1.18992 4.24766 1.45492 4.24766 1.74492C4.24766 2.03492 4.17766 2.29992 4.03766 2.53992C3.89766 2.77992 3.70516 2.97242 3.46016 3.11742C3.21516 3.26242 2.95266 3.33492 2.67266 3.33492ZM14.2227 13.2949H11.5077V9.03492C11.5077 8.57492 11.4877 8.22492 11.4477 7.98492C11.3877 7.59492 11.2627 7.29492 11.0727 7.08492C10.8527 6.83492 10.5277 6.70992 10.0977 6.70992C9.44766 6.70992 8.99766 6.93992 8.74766 7.39992C8.55766 7.74992 8.46266 8.26992 8.46266 8.95992V13.2949H5.74766V4.53492H8.35766V5.71992H8.38766C8.58766 5.33992 8.89766 5.01992 9.31766 4.75992C9.79766 4.45992 10.3477 4.30992 10.9677 4.30992C11.8377 4.30992 12.5277 4.49492 13.0377 4.86492C13.4877 5.19492 13.8027 5.68992 13.9827 6.34992C14.1427 6.89992 14.2227 7.60992 14.2227 8.47992V13.2949Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6481_3516">
                      <rect
                        width="15"
                        height="15"
                        fill="white"
                        transform="matrix(1 0 0 -1 0 15.1699)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
            <div
      ref={footerRef}
      className="mt-10 border-t border-[#D1D5DB] pt-6 flex flex-col sm:flex-row justify-between items-center gap-2"
    >
      <p className="text-xs font-medium">
        Copyright 2025 © Jinstore Ecommerce Platform. All rights reserved.
      </p>
      <p className="text-xs">
        <span className="text-gray-600">Powered by</span>{" "}
        <span className="text-[#634C9F] font-semibold">Shahzaib Lodhi</span>
      </p>
    </div>

        {/* Links Bottom */}
        <div
      ref={bottomRef} className="flex items-center justify-center md:justify-between gap-4 mt-6 flex-wrap">
          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <svg className="footer-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="14"
              viewBox="0 0 36 14"
              fill="none"
            >
              <mask
                id="mask0_6481_3521"
                style={{ maskype: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="1"
                width="36"
                height="13"
              >
                <path d="M36 1.07031H0V13.0703H36V1.07031Z" fill="white" />
              </mask>
              <g mask="url(#mask0_6481_3521)">
                <path
                  d="M31.6008 5.37042L32.2008 8.57042H29.8008L31.0008 5.47042L31.2008 4.87041L31.3008 4.37041C31.3008 4.47041 31.6008 5.37042 31.6008 5.37042ZM8.90078 12.4704L13.3008 1.57042H10.3008L7.60078 9.07042L7.30078 7.47042L6.30078 2.47042C6.20078 1.87042 5.70078 1.47042 4.90078 1.47042H0.400781L0.300781 1.67042C1.50078 1.87042 2.40078 2.27041 3.30078 2.87041L5.90078 12.5704H9.00078L8.90078 12.4704ZM15.6008 12.4704L17.4008 1.57042H14.6008L12.8008 12.6704H15.6008V12.4704ZM25.7008 8.97042C25.7008 7.77042 24.9008 6.77042 23.3008 5.87042C22.1008 5.37042 21.5008 4.97042 21.5008 4.57042C21.5008 3.97042 22.1008 3.67042 23.3008 3.67042C24.0008 3.67042 24.7008 3.67042 25.3008 4.17042H25.7008L26.0008 1.67042C25.1008 1.27041 24.3008 1.17041 23.4008 1.17041C22.5008 1.17041 21.7008 1.37041 21.0008 1.67042C20.3008 1.97042 19.7008 2.37042 19.2008 2.97042C18.8008 3.57042 18.6008 4.17041 18.6008 4.87041C18.6008 6.07042 19.4008 7.07042 21.2008 7.97042C22.1008 8.47042 22.6008 8.8704 22.6008 9.2704C22.6008 9.9704 22.0008 10.4704 20.9008 10.4704C20.0008 10.4704 19.0008 10.2704 18.2008 9.87041L17.8008 9.67041L17.3008 12.0704C18.3008 12.4704 19.4008 12.7704 20.5008 12.7704C21.8008 12.8704 23.0008 12.4704 24.0008 11.8704C25.2008 11.0704 25.7008 10.0704 25.7008 8.97042ZM35.7008 12.4704L33.4008 1.57042H31.2008C30.5008 1.57042 30.0008 1.77042 29.8008 2.47042L25.5008 12.6704H28.5008L29.0008 11.0704H32.8008L33.2008 12.7704H35.8008V12.4704H35.7008Z"
                  fill="url(#paint0_linear_6481_3521)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_6481_3521"
                  x1="1.58268"
                  y1="6.97882"
                  x2="35.2457"
                  y2="6.97882"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2C3572" />
                  <stop offset="1" stopColor="#3C62AB" />
                </linearGradient>
              </defs>
            </svg>
            <svg className="footer-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
            >
              <g clipPath="url(#clip0_6481_3527)">
                <mask
                  id="mask0_6481_3527"
                  style={{ maskype: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="16"
                >
                  <path d="M24 0.67041H0V15.4704H24V0.67041Z" fill="white" />
                </mask>
                <g mask="url(#mask0_6481_3527)">
                  <path
                    d="M7.4 15.4704C11.4869 15.4704 14.8 12.1573 14.8 8.07042C14.8 3.98351 11.4869 0.67041 7.4 0.67041C3.31309 0.67041 0 3.98351 0 8.07042C0 12.1573 3.31309 15.4704 7.4 15.4704Z"
                    fill="#DD3D31"
                  />
                  <path
                    d="M16.5992 15.4704C20.6861 15.4704 23.9992 12.1573 23.9992 8.07042C23.9992 3.98351 20.6861 0.67041 16.5992 0.67041C12.5123 0.67041 9.19922 3.98351 9.19922 8.07042C9.19922 12.1573 12.5123 15.4704 16.5992 15.4704Z"
                    fill="#EEB046"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.999 13.9705C15.199 11.4705 15.799 6.77051 13.299 3.57051C12.899 3.07051 12.499 2.67051 11.999 2.27051C8.79892 4.77051 8.19892 9.47051 10.699 12.6705C11.099 13.1705 11.499 13.5705 11.999 13.9705Z"
                    fill="#EF7D2F"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_6481_3527">
                  <rect
                    width="24"
                    height="15"
                    fill="white"
                    transform="translate(0 0.470215)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg className="footer-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="16"
              viewBox="0 0 53 16"
              fill="none"
            >
              <mask
                id="mask0_6481_3535"
                style={{ maskype: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="1"
                width="53"
                height="15"
              >
                <path d="M52.5 1.07031H0V15.0703H52.5V1.07031Z" fill="white" />
              </mask>
              <g mask="url(#mask0_6481_3535)">
                <path
                  d="M6.639 1.18262H2.614C2.339 1.18262 2.1015 1.38261 2.064 1.6576L0.438998 11.9576C0.401498 12.1576 0.563998 12.3451 0.776498 12.3451H2.7015C2.9765 12.3451 3.214 12.1452 3.2515 11.8702L3.689 9.0951C3.7265 8.8201 3.964 8.62011 4.239 8.62011H5.5015C8.1515 8.62011 9.6765 7.34512 10.0765 4.79512C10.2515 3.68262 10.089 2.80761 9.564 2.19511C8.989 1.54511 7.9765 1.18262 6.639 1.18262ZM7.1015 4.95761C6.8765 6.39511 5.7765 6.39511 4.714 6.39511H4.1015L4.5265 3.70761C4.5515 3.54511 4.689 3.42012 4.8515 3.42012H5.1265C5.8515 3.42012 6.539 3.42011 6.889 3.83261C7.114 4.08261 7.1765 4.44511 7.1015 4.95761Z"
                  fill="#283B82"
                />
                <path
                  d="M18.6523 4.90771H16.7273C16.5648 4.90771 16.4273 5.03272 16.4023 5.19522L16.3148 5.73274L16.1773 5.53271C15.7648 4.93271 14.8273 4.72021 13.9023 4.72021C11.7773 4.72021 9.96476 6.33272 9.60226 8.59522C9.41476 9.72022 9.67726 10.7953 10.3148 11.5578C10.9023 12.2453 11.7398 12.5327 12.7398 12.5327C14.4523 12.5327 15.4023 11.4328 15.4023 11.4328L15.3148 11.9702C15.2773 12.1702 15.4398 12.3578 15.6398 12.3578H17.3773C17.6523 12.3578 17.8898 12.1578 17.9273 11.8828L18.9648 5.29524C19.0148 5.09524 18.8523 4.90771 18.6523 4.90771ZM15.9648 8.65772C15.7773 9.75772 14.9023 10.4953 13.7898 10.4953C13.2273 10.4953 12.7898 10.3202 12.5023 9.97022C12.2148 9.63272 12.1148 9.15773 12.2023 8.62023C12.3773 7.53273 13.2648 6.77023 14.3648 6.77023C14.9148 6.77023 15.3523 6.95774 15.6523 7.29524C15.9273 7.63274 16.0523 8.12022 15.9648 8.65772Z"
                  fill="#283B82"
                />
                <path
                  d="M28.9013 4.90771H26.9638C26.7763 4.90771 26.6013 4.99521 26.5013 5.15771L23.8388 9.08272L22.7138 5.30772C22.6388 5.07022 22.4263 4.90771 22.1763 4.90771H20.2763C20.0513 4.90771 19.8888 5.13271 19.9638 5.34521L22.0888 11.5952L20.0888 14.4202C19.9263 14.6452 20.0888 14.9452 20.3638 14.9452H22.3013C22.4888 14.9452 22.6513 14.8577 22.7638 14.7077L29.2013 5.42024C29.3263 5.20774 29.1638 4.90771 28.9013 4.90771Z"
                  fill="#283B82"
                />
                <path
                  d="M35.3031 1.18262H31.2781C31.0031 1.18262 30.7656 1.38261 30.7281 1.6576L29.1031 11.9576C29.0656 12.1576 29.2281 12.3451 29.4281 12.3451H31.5031C31.6906 12.3451 31.8531 12.2076 31.8906 12.0201L32.3531 9.0951C32.3906 8.8201 32.6281 8.62011 32.9031 8.62011H34.1781C36.8281 8.62011 38.3531 7.34512 38.7531 4.79512C38.9281 3.68262 38.7656 2.80761 38.2406 2.19511C37.6656 1.54511 36.6531 1.18262 35.3031 1.18262ZM35.7656 4.95761C35.5406 6.39511 34.4406 6.39511 33.3781 6.39511H32.7781L33.2031 3.70761C33.2281 3.54511 33.3656 3.42012 33.5281 3.42012H33.8031C34.5281 3.42012 35.2156 3.42011 35.5656 3.83261C35.7781 4.08261 35.8406 4.44511 35.7656 4.95761Z"
                  fill="#469BDB"
                />
                <path
                  d="M47.3124 4.90771H45.3874C45.2249 4.90771 45.0874 5.03272 45.0624 5.19522L44.9749 5.73274L44.8374 5.53271C44.4249 4.93271 43.4874 4.72021 42.5624 4.72021C40.4374 4.72021 38.6249 6.33272 38.2624 8.59522C38.0749 9.72022 38.3374 10.7953 38.9749 11.5578C39.5624 12.2453 40.3999 12.5327 41.3999 12.5327C43.1124 12.5327 44.0624 11.4328 44.0624 11.4328L43.9749 11.9702C43.9374 12.1702 44.0999 12.3578 44.3124 12.3578H46.0499C46.3249 12.3578 46.5624 12.1578 46.5999 11.8828L47.6374 5.29524C47.6749 5.09524 47.5124 4.90771 47.3124 4.90771ZM44.6249 8.65772C44.4374 9.75772 43.5624 10.4953 42.4499 10.4953C41.8874 10.4953 41.4499 10.3202 41.1624 9.97022C40.8749 9.63272 40.7749 9.15773 40.8624 8.62023C41.0374 7.53273 41.9249 6.77023 43.0249 6.77023C43.5749 6.77023 44.0124 6.95774 44.3124 7.29524C44.5999 7.63274 44.7124 8.12022 44.6249 8.65772Z"
                  fill="#469BDB"
                />
                <path
                  d="M49.5773 1.47019L47.9273 11.9702C47.8898 12.1702 48.0523 12.3577 48.2523 12.3577H49.9148C50.1898 12.3577 50.4273 12.1577 50.4648 11.8827L52.0898 1.5827C52.1273 1.38269 51.9648 1.1952 51.7648 1.1952H49.9023C49.7523 1.1827 49.6148 1.30769 49.5773 1.47019Z"
                  fill="#469BDB"
                />
              </g>
            </svg>
            <svg className="footer-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="16"
              viewBox="0 0 41 16"
              fill="none"
            >
              <mask
                id="mask0_6481_3546"
                style={{ maskype: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="1"
                width="41"
                height="15"
              >
                <path
                  d="M40.5 1.07031H0.5V15.0703H40.5V1.07031Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_6481_3546)">
                <path
                  d="M29.3 4.47002C30.2 4.47002 30.9 3.77002 30.9 2.87002C30.9 1.97002 30.2 1.27002 29.3 1.27002C28.4 1.27002 27.7 1.97002 27.7 2.87002C27.6 3.77002 28.3 4.47002 29.3 4.47002C29.3 4.57002 29.3 4.57002 29.3 4.47002ZM16.7 5.37002C16.6 5.57002 16.1 7.07002 14.8 8.67002V1.97002L11.4 2.67002V14.77H14.8V11.07C15.8 12.57 16.3 14.77 16.3 14.77H20.4C20 13.07 18.2 9.97002 18.2 9.97002C19.3 8.57002 20.1 7.07002 20.6 5.47002L16.7 5.37002ZM25.7 5.27002C22.6 5.37002 21.1 6.77002 21.1 9.47002V14.77H24.5V10.47C24.5 8.87002 24.7 8.17002 26.7 8.07002V5.37002C26.3 5.27002 25.7 5.27002 25.7 5.27002ZM5.6 6.77002C5.2 6.77002 4.2 6.67002 4.2 5.77002C4.2 4.67002 5.6 4.67002 6.1 4.67002C7 4.67002 8.2 4.97002 9.1 5.17002C9.4 5.27002 9.7 5.37002 10 5.47002V2.67002H9.9C8.9 2.27002 7.7 1.97002 5.5 1.97002C1.8 1.97002 0.5 4.17002 0.5 6.07002C0.5 7.17002 1 9.67002 5.3 9.97002C5.7 9.97002 6.6 10.07 6.6 10.97C6.6 11.67 5.8 12.17 4.5 12.17C3 12.17 1.6 11.77 0.8 11.47V14.47C2.1 14.77 3.5 14.97 5.2 14.97C8.9 14.97 10.5 12.87 10.5 10.87C10.5 8.47002 8.7 6.97002 5.6 6.77002ZM27.6 14.77H30.9V5.37002H27.6V14.77ZM37.2 2.57002V14.77H40.5V1.97002L37.2 2.57002ZM32.3 2.57002L35.6 1.97002V14.77H32.3V2.57002Z"
                  fill="#862565"
                />
              </g>
            </svg>
            <svg className="footer-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="16"
              viewBox="0 0 64 16"
              fill="none"
            >
              <g clipPath="url(#clip0_6481_3552)">
                <mask
                  id="mask0_6481_3552"
                  style={{ maskype: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="1"
                  width="64"
                  height="15"
                >
                  <path
                    d="M63.2 1.07031H0.5V15.0703H63.2V1.07031Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_6481_3552)">
                  <path
                    d="M11.5993 1.07031H8.59922C8.59922 3.57031 7.39922 5.87031 5.39922 7.37031L4.19922 8.37031L8.89922 14.7703H12.7993L8.39922 8.87031C10.4993 6.87031 11.5993 4.07031 11.5993 1.07031Z"
                    fill="black"
                  />
                  <path
                    d="M3.79922 1.07031H0.699219V14.7703H3.79922V1.07031Z"
                    fill="black"
                  />
                  <path
                    d="M16.6992 1.07031H13.6992V14.7703H16.6992V1.07031Z"
                    fill="black"
                  />
                  <path
                    d="M42.5984 5.07031C41.4984 5.07031 40.3984 5.37031 39.6984 6.37031V5.37031H36.8984V14.7703H39.7984V9.77031C39.7984 8.37031 40.7984 7.67031 41.8984 7.67031C43.0984 7.67031 43.8984 8.37031 43.8984 9.77031V14.7703H46.6984V8.77031C46.5984 6.57031 44.8984 5.07031 42.5984 5.07031Z"
                    fill="black"
                  />
                  <path
                    d="M25.6008 5.37031V5.97031C24.8008 5.37031 23.8008 5.07031 22.8008 5.07031C20.0008 5.07031 17.8008 7.27031 17.8008 10.0703C17.8008 12.8703 20.0008 15.0703 22.8008 15.0703C23.8008 15.0703 24.8008 14.7703 25.6008 14.1703V14.7703H28.4008V5.37031H25.6008ZM23.0008 12.4703C21.6008 12.4703 20.4008 11.3703 20.4008 10.0703C20.4008 8.77031 21.5008 7.67031 23.0008 7.67031C24.5008 7.67031 25.6008 8.77031 25.6008 10.0703C25.6008 11.3703 24.4008 12.4703 23.0008 12.4703Z"
                    fill="black"
                  />
                  <path
                    d="M32.7984 6.57061V5.37061H29.8984V14.7706H32.7984V10.3706C32.7984 8.87061 34.3984 8.07061 35.4984 8.07061V5.37061C34.3984 5.37061 33.3984 5.77061 32.7984 6.57061Z"
                    fill="black"
                  />
                  <path
                    d="M55.3977 5.37031V5.97031C54.5977 5.37031 53.6977 5.07031 52.5977 5.07031C49.7977 5.07031 47.5977 7.27031 47.5977 10.0703C47.5977 12.8703 49.7977 15.0703 52.5977 15.0703C53.5977 15.0703 54.5977 14.7703 55.3977 14.1703V14.7703H58.1977V5.37031H55.3977ZM52.8977 12.4703C51.4977 12.4703 50.2977 11.3703 50.2977 10.0703C50.2977 8.77031 51.3977 7.67031 52.8977 7.67031C54.2977 7.67031 55.4977 8.77031 55.4977 10.0703C55.3977 11.3703 54.2977 12.4703 52.8977 12.4703Z"
                    fill="black"
                  />
                  <path
                    d="M60.3984 5.57061C60.3984 5.47061 60.2984 5.37061 60.1984 5.37061H59.8984V6.07061H59.9984V5.87061H60.0984L60.2984 6.07061H60.3984L60.2984 5.77061C60.3984 5.77061 60.3984 5.67061 60.3984 5.57061ZM60.1984 5.67061H60.0984V5.47061H60.1984C60.2984 5.47061 60.2984 5.47061 60.2984 5.57061C60.2984 5.67061 60.2984 5.67061 60.1984 5.67061Z"
                    fill="black"
                  />
                  <path
                    d="M60.2 5.07031C59.8 5.07031 59.5 5.37031 59.5 5.77031C59.5 6.17031 59.8 6.47031 60.2 6.47031C60.6 6.47031 60.9 6.17031 60.9 5.77031C60.9 5.37031 60.5 5.07031 60.2 5.07031ZM60.2 6.27031C59.9 6.27031 59.7 6.07031 59.7 5.67031C59.7 5.37031 59.9 5.07031 60.2 5.07031C60.5 5.07031 60.7 5.27031 60.7 5.67031C60.7 6.07031 60.4 6.27031 60.2 6.27031Z"
                    fill="black"
                  />
                  <path
                    d="M61.3 11.4702C60.3 11.4702 59.5 12.2702 59.5 13.2702C59.5 14.2702 60.3 15.0702 61.3 15.0702C62.3 15.0702 63.1 14.2702 63.1 13.2702C63.1 12.1702 62.3 11.4702 61.3 11.4702Z"
                    fill="black"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_6481_3552">
                  <rect
                    width="64"
                    height="15"
                    fill="white"
                    transform="translate(0 0.470215)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="text-center text-[11px] text-[#634C9F] font-medium space-x-3">
            <a href="#" className="footer-link hover:underline">
              Terms and Conditions
            </a>
            <a href="#" className="footer-link hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="footer-link hover:underline">
              Order Tracking
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
