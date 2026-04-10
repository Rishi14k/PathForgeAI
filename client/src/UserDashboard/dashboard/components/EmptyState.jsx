import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Orbit, Sparkles, Compass, Lightbulb, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="relative min-h-[600px] w-full flex items-center justify-center p-4">
      {/* Abstract Background Elements - Adds depth without clutter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.2, 0.3] 
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[100px] rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero Card */}
          <div className="lg:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-gray-900/40 backdrop-blur-xl border border-white/10 p-10 lg:p-14">
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-8"
              >
                <Sparkles size={14} className="animate-pulse" />
                Ready for your next chapter?
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Your future isn't <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">calculated</span>. <br />
                It's choreographed.
              </h2>

              <p className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed">
                Move beyond static courses. Get a living, breathing learning roadmap 
                that evolves with your progress and adapts to your rhythm.
              </p>

              <Link to="/dashboard/create-roadmap">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group/btn relative flex items-center gap-3 px-8 py-4 bg-white text-gray-950 rounded-2xl font-bold transition-all hover:bg-violet-50"
                >
                  Create Your Path
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>

            {/* Decorative Floating Icon */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 hidden lg:block opacity-20 group-hover:opacity-40 transition-opacity"
            >
              <Orbit size={180} className="text-violet-400" strokeWidth={1} />
            </motion.div>
          </div>

          {/* Side Info Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Discovery Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex-1 rounded-[2rem] bg-white/5 border border-white/10 p-8 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Compass size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Lost in Choice?</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Let our AI analyze your DNA—your interests and skills—to suggest your ideal career path.
                </p>
              </div>
              <Link to="/dashboard/discovery" className="mt-6 flex items-center gap-2 text-indigo-400 text-sm font-bold group-hover:gap-3 transition-all">
                Explore Careers <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Micro Stats Card */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] bg-violet-500/10 border border-violet-500/20 p-5">
                <Zap size={20} className="text-violet-400 mb-2" />
                <div className="text-white font-bold">2min</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500">Setup</div>
              </div>
              <div className="rounded-[1.5rem] bg-fuchsia-500/10 border border-fuchsia-500/20 p-5">
                <Lightbulb size={20} className="text-fuchsia-400 mb-2" />
                <div className="text-white font-bold">Smart</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500">Adaptive</div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyState;