import React from 'react'
import PackageDetail from '../Components/PackageDetail'
import SliderCarousel from '../Components/SliderCarousel'
import { HeroSection } from '../Components/HeroSection'


const Home = () => {
  return (
    <>
     <page>
     <HeroSection />
     <SliderCarousel />
     <PackageDetail />
     </page>
    </>
  )
}

export default Home