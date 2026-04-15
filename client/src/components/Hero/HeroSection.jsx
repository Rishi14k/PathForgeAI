import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Play,
  Code,
  Database,
  Lock,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";
import RoadmapPreview from "./RoadmapPreview";
import SkillOrbitCanvas from "../skillorbit/SkillOrbitCanvas";
import SkillOrbitBackground from "./SkillOrbitBackground";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden bg-[#05060A]">
      {/* Dynamic Background Elements */}

      <div className=""></div>
    <SkillOrbitBackground/>

      <div className="relative mx-auto max-w-7xl px-6 z-10 mt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          {/* <motion.div variants={itemVariants} className="mt-4 mb-8 inline-flex items-center gap-2 rounded-full border border-[#9F67FF]/30 bg-[#9F67FF]/5 px-4 py-1.5 text-sm font-medium text-[#C4B5FD] backdrop-blur-md shadow-[0_0_20px_rgba(159,103,255,0.1)]">
            <Sparkles className="h-4 w-4 text-[#9F67FF]" />
            <span className="tracking-wide uppercase text-[10px]">The Future of Personal Growth</span>
          </motion.div> */}

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-balance text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Master Any Skill. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F67FF] via-[#C4B5FD] to-[#9F67FF] bg-[length:200%_auto] animate-gradient">
              Directed by AI.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 md:text-xl leading-relaxed"
          >
            Stop wandering through endless tutorials. SkillOrbit crafts a
            <span className="text-white"> hyper-personalized roadmap</span> that
            evolves with your speed and ambition.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-2 rounded-2xl bg-[#9F67FF] px-8 py-4 text-sm font-bold text-white transition-all shadow-[0_0_30px_rgba(159,103,255,0.3)] hover:shadow-[#9F67FF]/50"
              >
                Launch Your Journey
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link to="/dashboard/create-roadmap">
              <motion.button
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all backdrop-blur-sm"
              >
                <Play className="h-4 w-4 fill-current" />
                See the Magic
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Mockup Experience */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-24 max-w-5xl"
        >
          {/* Subtle Glow behind mockup */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#9F67FF]/20 to-indigo-500/20 blur-3xl opacity-50" />

          {/* <RoadmapPreview /> */}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
