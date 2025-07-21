"use client";

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
import Blogs from "./components/Blogs";
import PopularCompanies from "./components/popularCompanies";

export default function HomePage() {
  return (
    <div>
      <BannerSlider />
      <FeatureHighlights />
      <div className="container py-10">
        <hr className="border-[#E5E7EB]" />
      </div>
      <WeeklyDeals />
      <CategoryGrid />
      <NewArrivals />
      <WeeklyDeals2 />
      <FeaturedProducts />
      <WeeklyDeals3 />
      <BestSellers />
      <Discount50Banner />
      <Blogs />
      <PopularCompanies />
    </div>
  );
}
