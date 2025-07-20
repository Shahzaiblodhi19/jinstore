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
import FeaturedProducts from "./components/FeaturedProducts";
import WeeklyDeals3 from "./components/WeeklyDeals3";
import BestSellers from "./components/BestSellers";
import Discount50Banner from "./components/discount50Banner";

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
      <FeaturedProducts />
      <WeeklyDeals3 />
      <BestSellers />
      <Discount50Banner  />
    </div>
  );
}
