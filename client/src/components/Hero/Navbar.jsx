import React, { useState, useEffect } from "react";
import { Compass, LayoutDashboard, LogOut, Menu, X, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutThunk } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    try {
      dispatch(logoutThunk());
      toast.success("See you soon, Voyager!");
    } catch (error) {
      toast.error("Logout failed. Stay a bit longer?");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-[#05060A]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" 
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6, ease: "anticipate" }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9F67FF] to-[#7C3AED] shadow-lg shadow-[#9F67FF]/20"
          >
            <Compass className="h-6 w-6 text-white" />
          </motion.div>
          <span className="text-xl font-black tracking-tighter text-white">
            SkillOrbit
          </span>
        </Link>

        {/* Desktop Navigation - Pill Style */}
        <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/5 p-1 backdrop-blur-md md:flex">
          {[
            { name: "Features", href: "#features" },
            { name: "Pricing", href: "#pricing" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-5 py-2 text-sm font-medium text-gray-400 transition-all hover:text-white hover:bg-white/5 rounded-full"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {!token ? (
            <div className="flex items-center gap-2">
              <Link to="/login" className="hidden sm:block">
                <button className="px-5 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-[#9F67FF] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#9F67FF]/20 transition-all hover:bg-[#8B5CF6]"
                >
                  Join Orbit
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <motion.button 
                  whileHover={{ backgroundColor: "rgba(159, 103, 255, 0.1)" }}
                  className="p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-[#9F67FF] transition-all"
                >
                  <LayoutDashboard size={20} />
                </motion.button>
              </Link>
              <motion.button 
                onClick={handleLogout}
                whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                className="p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-red-400 transition-all"
              >
                <LogOut size={20} />
              </motion.button>
            </div>
          )}

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0E1016] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 text-lg">Features</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 text-lg">Pricing</a>
            <hr className="border-white/5" />
            {!token && (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-white font-bold">Login</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;