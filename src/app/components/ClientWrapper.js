
"use client";

import { useEffect, useState } from "react";
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
        <div className="loader animate-spin rounded-full border-t-4 border-[#634C9F] h-12 w-12" />
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
