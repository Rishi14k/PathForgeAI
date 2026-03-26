import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorksSection from '../components/HowItWorksSection'
import PricingSection from '../components/pricingSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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