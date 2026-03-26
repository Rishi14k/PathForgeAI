import { Compass } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-[#0E0F14]/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F7CFF]">
            <Compass className="h-5 w-5 text-[#FAFAFA]" />
          </div>
          <span className="text-lg font-semibold text-[#FAFAFA]">PathForge AI</span>
        </Link>
        
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features"  className="text-sm text-[#7d8caf] transition-colors hover:text-[#fafafa]">
            Features
          </a>
          <a href="#pricing" className="text-sm text-[#7d8caf] transition-colors hover:text-[#fafafa]">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <button className="text-[#7d8caf] hover:text-[#fafafa]">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-primary p-2 rounded text-[#fafafa] hover:bg-[#4F7CFF]/90">
              Get Started
            </button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar