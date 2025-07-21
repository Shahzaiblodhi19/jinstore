"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="w-40 h-40">
        <DotLottieReact
          src="https://lottie.host/dd09d945-4679-4283-bf4c-60d9e0f6db10/7GYW1CbSWY.lottie"
          loop
          autoplay
        />
      </div>
      <div className="animate-pulse text-lg font-semibold text-black mt-4">
        Loading...
      </div>
    </div>
  );
}
