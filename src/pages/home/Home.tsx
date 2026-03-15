import React from 'react';

// Home sections
import { HeroSection } from './components/HeroSection/HeroSection';
import { OurBrandsSection } from './components/OurBrandsSection/OurBrandsSection';
import { FeaturedProducts } from './components/FeaturedProducts/FeaturedProducts';
import { TrustBar } from './components/TrustBar/TrustBar';
import { StoreSection } from './components/StoreSection/StoreSection';

import './Home.css';

export function Home() {
  return (
    <div className='home-container'>
      <HeroSection />
      <OurBrandsSection />
      <FeaturedProducts />
      <TrustBar />
      <StoreSection />
    </div>
  );
}
