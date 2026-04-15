import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Target, Flame, BarChart3, Zap, Layers, MousePointer2 } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Generated Roadmaps",
    description: "Get personalized study plans tailored to your goals, skill level, and available time. Our AI creates the perfect learning path for you.",
    size: "lg", // This will span more columns
    gradient: "from-violet-500/20 to-fuchsia-500/20"
  },
  {
    icon: Target,
    title: "Task-Based Learning",
    description: "Break down complex topics into manageable daily tasks with resources.",
    size: "sm",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Visualize your learning journey with detailed completion metrics.",
    size: "sm",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    icon: Flame,
    title: "Study Streaks",
    description: "Build momentum with daily streaks. Stay motivated by tracking consistency and celebrating milestones.",
    size: "md",
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: Layers,
    title: "Resource Aggregator",
    description: "AI finds the best YouTube videos, docs, and articles for every specific task.",
    size: "md",
    gradient: "from-indigo-500/20 to-purple-500/20"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-32 bg-[#05060A] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#9F67FF]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9F67FF]/10 border border-[#9F67FF]/20 text-[#9F67FF] text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Zap size={14} fill="currentColor" /> Features
            </motion.div>
            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F67FF] to-[#C4B5FD]">Rapid Mastery</span>
            </h2>
          </div>
          <p className="max-w-md text-gray-400 text-lg leading-relaxed">
            We combine smart AI with proven learning methods to help you learn faster — without feeling overwhelmed.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`
                group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0E1016] p-8
                hover:border-[#9F67FF]/50 transition-all duration-500
                ${feature.size === "lg" ? "md:col-span-6 lg:col-span-7" : ""}
                ${feature.size === "md" ? "md:col-span-3 lg:col-span-5" : ""}
                ${feature.size === "sm" ? "md:col-span-3 lg:col-span-3" : ""}
              `}
            >
              {/* Card Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-[#9F67FF] group-hover:shadow-[0_0_20px_rgba(159,103,255,0.4)]">
                  <feature.icon className="h-6 w-6" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-white tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                {/* Decorative element for large cards */}
                {feature.size === "lg" && (
                  <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-[#0E1016] bg-gray-800" />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 self-center font-medium">
                      +2k learners used this today
                    </div>
                  </div>
                )}
              </div>
              
              {/* Interactive Corner Icon */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-white/20">
                <MousePointer2 size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;