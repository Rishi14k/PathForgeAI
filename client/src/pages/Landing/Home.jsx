import React from 'react'
import HeroSection from '../../components/Hero/HeroSection'
import FeaturesSection from '../../components/Hero/FeaturesSection'
import HowItWorksSection from '../../components/Hero/HowItWorksSection'
import PricingSection from '../../components/Hero/PricingSection'
import Navbar from '../../components/Hero/Navbar'
import Footer from '../../components/Hero/Footer'
import PricingPage from '../PricingPage'
import SkillOrbitCanvas from '../../components/skillorbit/SkillOrbitCanvas'
import SkillOrbitBackground from '../../components/Hero/SkillOrbitBackground'
import RoadmapPreview from '../../components/Hero/RoadmapPreview'

const Home = () => {
  return (
    <div className='bg-[#05060A]'>
      <Navbar/>
      {/* <div className='relative min-h-screen'>

      <SkillOrbitCanvas/>      
      </div> */}
        <HeroSection/>
        <FeaturesSection/>
        <HowItWorksSection/>
        <div className='relative mx-auto lg:mt-24 max-w-6xl'>
        <RoadmapPreview/>
        </div>
        <PricingPage/>
        <Footer/>
    </div>
  )
}

export default Home