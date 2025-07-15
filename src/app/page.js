'use client';

import React, { useState, useEffect } from 'react';
import PromoStrip from './components/promoStrip';
import Header from './components/header';
import BannerSlider from './components/BannerSlider';


export default function TranslatePage() {

  return (
    <div>
      <PromoStrip />
      <Header />
      <BannerSlider />
    </div>
  );
}
