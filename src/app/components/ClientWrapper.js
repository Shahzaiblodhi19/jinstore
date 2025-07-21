
"use client";

import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// Import your components
import Header from "./header";
import Footer from "./Footer";
import PromoStrip from "./promoStrip";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Delay full page render
    }, 3000); // 3 seconds loader

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        {/* Add your branded loader here */}
        <div className="flex flex-col items-center justify-center gap-2">
             <div className="w-25 h-25">
        <DotLottieReact
          src="https://lottie.host/dd09d945-4679-4283-bf4c-60d9e0f6db10/7GYW1CbSWY.lottie"
          loop
          autoplay
        />
      </div>
           <div className="animate-pulse text-lg font-semibold text-[#634C9F]">
        Loading...
      </div>
      </div>
      </div>
    );
  }

  return     <>
      <PromoStrip />
      <Header />
      <main>{children}</main>
      <Footer />
    </>;
}
