import React from 'react'
import PackageDetail from '../Components/PackageDetail'
import SliderCarousel from '../Components/SliderCarousel'
import { HeroSection } from '../Components/HeroSection'

const Home = () => {
  return (
    <>
     <HeroSection />
     <SliderCarousel />
     <PackageDetail />
    </>
  )
}

export default Home