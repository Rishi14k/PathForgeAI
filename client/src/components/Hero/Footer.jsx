import React from 'react';
import { Compass, Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Features", path: "/features" },
      { name: "Pricing", path: "/pricing" },
      { name: "Roadmaps", path: "/dashboard" },
      { name: "Discovery", path: "/dashboard/discovery" },
    ],
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
    ],
    Social: [
      { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
      { name: "GitHub", icon: Github, href: "https://github.com" },
      { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    ]
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#05060A] pt-20 pb-10 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[#9F67FF]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9F67FF] to-[#7C3AED] shadow-lg shadow-[#9F67FF]/20 transition-transform group-hover:rotate-12">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">
                SkillOrbit
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Empowering the next generation of creators with AI-driven learning paths. 
              Evolution isn't an option; it's a journey.
            </p>
            
            {/* Social Icons */}
            <div className="mt-8 flex gap-4">
              {footerLinks.Social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-[#9F67FF] hover:bg-[#9F67FF]/10 transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:ml-auto">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Product</h4>
              <ul className="space-y-4">
                {footerLinks.Product.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Company</h4>
              <ul className="space-y-4">
                {footerLinks.Company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter / Contact */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Stay updated with new features and AI trends.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-[#9F67FF] focus:outline-none transition-all"
              />
              <button className="absolute right-2 top-2 p-1.5 rounded-lg bg-[#9F67FF] text-white hover:bg-[#8B5CF6] transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-600 font-medium">
            &copy; {currentYear} SkillOrbit. Designed for the curious.
          </p>
          
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart size={12} className="fill-[#9F67FF] text-[#9F67FF]" />
            </motion.div>
            <span>by SkillOrbit Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;