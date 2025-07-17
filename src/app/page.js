"use client";

import React, { useState, useEffect } from "react";
import PromoStrip from "./components/promoStrip";
import Header from "./components/header";
import BannerSlider from "./components/BannerSlider";
import FeatureHighlights from "./components/FeatureHighlights";
import WeeklyDeals from "./components/WeeklyDeals";
import NewArrivals from "./components/newArrivals";
import WeeklyDeals2 from "./components/WeeklyDeals2";
import CategoryGrid from "./components/categories";

export default function TranslatePage() {
  return (
    <div>
      <PromoStrip />
      <Header />
      <BannerSlider />
      <FeatureHighlights />
      <div className="container py-10"><hr className="border-[#E5E7EB]" /></div>
      <WeeklyDeals />
      <CategoryGrid />
      <NewArrivals />
      <WeeklyDeals2 />
    </div>
  );
}
