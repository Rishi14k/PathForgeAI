import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, LineChart, ChevronRight } from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Define Your Goal",
    icon: Target,
    description: "Tell SkillOrbit what you want to master. Our AI considers your current level and daily schedule to build a realistic commitment.",
    color: "#9F67FF"
  },
  {
    step: "02",
    title: "AI Generation",
    icon: Cpu,
    description: "The engine cross-references top educational frameworks to generate a week-by-week roadmap with curated resources.",
    color: "#C4B5FD"
  },
  {
    step: "03",
    title: "Track Mastery",
    icon: LineChart,
    description: "Execute daily tasks, maintain your streak, and watch your skill-orbit expand as you complete structured milestones.",
    color: "#8B5CF6"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-32 bg-[#05060A] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9F67FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight text-white md:text-5xl"
          >
            Three Steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F67FF] to-[#C4B5FD]">Evolution</span>
          </motion.h2>
          <p className="mt-6 text-lg text-gray-400">
            PathForge AI simplifies the complexity of learning into a streamlined, actionable experience.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative mt-16 grid gap-12 md:grid-cols-3">
          
          {/* Animated Connector Line (Desktop Only) */}
          <div className="absolute top-12 left-[15%] right-[15%] hidden md:block">
            <svg width="100%" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 1H1000" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="8 8" />
              <defs>
                <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop stopColor="#9F67FF" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#9F67FF" />
                  <stop offset="1" stopColor="#9F67FF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {/* Traveling Light Pulse */}
            <motion.div 
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-2px] w-20 h-[6px] bg-gradient-to-r from-transparent via-[#9F67FF] to-transparent blur-sm"
            />
          </div>

          {steps.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step Icon/Number Node */}
              <div className="relative mb-8">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[2rem] border-2 border-[#9F67FF]/20 bg-[#0E1016] text-[#9F67FF] shadow-2xl transition-colors group-hover:border-[#9F67FF] group-hover:shadow-[#9F67FF]/20"
                >
                  <item.icon size={32} strokeWidth={1.5} />
                  
                  {/* Floating Step Number */}
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#9F67FF] text-[10px] font-black text-white shadow-lg">
                    {item.step}
                  </div>
                </motion.div>
                
                {/* Outer decorative ring */}
                <div className="absolute inset-[-10px] rounded-[2.5rem] border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text Content */}
              <div className="relative px-4">
                <h3 className="mb-4 text-2xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>

              {/* Mobile Arrow (Visible only on small screens) */}
              {index < steps.length - 1 && (
                <div className="mt-8 text-[#9F67FF]/30 md:hidden">
                  <ChevronRight size={32} className="rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Link below steps */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-500 text-sm flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Join 1,200+ learners currently following their path
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorksSection;