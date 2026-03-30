import React from 'react'
import HeroSection from '../../components/Hero/HeroSection'
import FeaturesSection from '../../components/Hero/FeaturesSection'
import HowItWorksSection from '../../components/Hero/HowItWorksSection'
import PricingSection from '../../components/Hero/PricingSection'
import Navbar from '../../components/Hero/Navbar'
import Footer from '../../components/Hero/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
        <HeroSection/>
        <FeaturesSection/>
        <HowItWorksSection/>
        <PricingSection/>
        <Footer/>
    </div>
  )
}

export default Home