import { Compass } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-[#2A2E39]/40 bg-[#0E0F14]/50">
  <div className="mx-auto max-w-7xl px-6 py-12">
    
    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F7CFF]">
          <Compass className="h-5 w-5 text-white" />
        </div>

        <span className="text-lg font-semibold text-[#FAFAFA]">
          PathForge AI
        </span>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <Link
          to="/features"
          className="text-sm text-[#A1A1AA] transition-colors hover:text-[#FAFAFA]"
        >
          Features
        </Link>

        <Link
          to="/pricing"
          className="text-sm text-[#A1A1AA] transition-colors hover:text-[#FAFAFA]"
        >
          Pricing
        </Link>

        <Link
          to="/login"
          className="text-sm text-[#A1A1AA] transition-colors hover:text-[#FAFAFA]"
        >
          Login
        </Link>
      </div>

      {/* Copyright */}
      <p className="text-sm text-[#A1A1AA]">
        &copy; {new Date().getFullYear()} PathForge AI. All rights reserved.
      </p>

    </div>

  </div>
</footer>
  )
}

export default Footer