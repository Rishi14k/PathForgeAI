import React from "react";
import { motion } from "framer-motion";
import { Terminal, Database, Code, Lock, FolderGit2, BookOpenText, Box } from "lucide-react";

const roadmapData = [
  {
    week: 1,
    title: "Epoch: Backend Foundations",
    progress: 100,
    status: "Completed",
    tasks: [
      { icon: Terminal, title: "Node.js Event Loop Deep Dive", type: "Concept" },
      { icon: Box, title: "Express.js Middleware Architecture", type: "Framework" },
      { icon: Database, title: "SQL vs NoSQL: Schema Design", type: "Database" },
    ],
    project: {
      title: "Build & Deploy a RESTful API with Auth",
      tech: ["Node", "Express", "Postgres", "JWT"],
    },
  },
  {
    week: 2,
    title: "Epoch: Scalability & Caching",
    progress: 45,
    status: "Active",
    tasks: [
      { icon: Database, title: "Advanced MongoDB Indexing", type: "Database" },
      { icon: Code, title: "Redis Integration for Express", type: "Caching" },
      { icon: Box, title: "Containerization with Docker", type: "DevOps" },
    ],
    project: {
      title: "Dockerize and Scale Week 1 API with Redis Caching",
      tech: ["Docker", "Redis", "Mongo"],
    },
  },
  // Future weeks would be simplified for the preview...
];

const RoadmapPreview = () => {
  return (
   <div className="mx-auto w-full max-w-7xl px-4 py-8">
  <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 bg-[#0E1016]/80 backdrop-blur-2xl shadow-2xl">
    
    {/* OS-Style Window Header */}
    <div className="flex items-center gap-3 border-b border-white/5 bg-white/5 px-4 py-4 md:px-6 md:py-5">
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-red-500/30" />
        <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-amber-500/30" />
        <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-emerald-500/30" />
      </div>
      <div className="mx-auto text-[9px] md:text-[11px] text-gray-500 font-mono tracking-widest uppercase truncate px-2">
        skillorbit.ai / engine_v3.0
      </div>
    </div>

    <div className="p-5 md:p-8 lg:p-12">
      {/* Main Title & Overall Progress */}
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
        <div>
          <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#9F67FF] mb-2">Active Orbit</h3>
          <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">Full-Stack Architect</p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl w-full md:w-auto">
          <span className="text-[10px] md:text-xs text-gray-500 font-medium tracking-wide">Total Path Mastery</span>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="h-1.5 flex-grow md:w-32 rounded-full bg-white/5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "68%" }}
                transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-[#9F67FF] via-[#C4B5FD] to-[#9F67FF] bg-[length:200%_auto] animate-gradient"
              />
            </div>
            <span className="text-xl md:text-2xl font-black font-mono text-white tracking-tight">68%</span>
          </div>
        </div>
      </div>

      {/* Weekly Epochs */}
      <div className="space-y-6 md:space-y-10">
        {roadmapData.map((item, index) => (
          <div key={index} className={`relative p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border ${item.status === 'Active' ? 'border-[#9F67FF]/30 bg-[#9F67FF]/5' : 'border-white/5 bg-white/[0.01]'}`}>
            
            {/* Animated Indicator for Active Week */}
            {item.status === 'Active' && (
              <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 px-3 py-1 rounded-full bg-[#9F67FF]/20 border border-[#9F67FF]/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9F67FF] animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-bold text-[#9F67FF] uppercase tracking-wider">In Progress</span>
              </div>
            )}

            {/* Week Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="flex h-12 w-12 md:h-16 md:w-16 flex-shrink-0 flex-col items-center justify-center rounded-xl md:rounded-2xl border-2 border-white/10 bg-[#05060A] text-white">
                <span className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Week</span>
                <span className="text-xl md:text-3xl font-black tracking-tight">{item.week}</span>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1">{item.title}</h4>
                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <BookOpenText size={14} />
                    <span>{item.tasks.length} Core Tasks</span>
                  </div>
                  <span className="hidden sm:inline mx-1">•</span>
                  <div className="flex items-center gap-1.5">
                    <FolderGit2 size={14} />
                    <span>1 Capstone Project</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks & Project Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left: Tasks List */}
              <div className="lg:col-span-2 space-y-2 md:space-y-3">
                <h5 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-600 mb-2 md:mb-4">Weekly Focus Tasks</h5>
                {item.tasks.map((task, tIndex) => (
                  <motion.div 
                    key={tIndex}
                    whileHover={{ x: 3 }}
                    className={`flex items-center justify-between p-3 md:p-4 rounded-xl border ${item.status === 'Completed' ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-white/5 bg-white/[0.02]'}`}
                  >
                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                      <div className={`p-1.5 md:p-2 rounded-lg flex-shrink-0 ${item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-400'}`}>
                        <task.icon size={16} />
                      </div>
                      <span className={`text-xs md:text-sm font-semibold truncate ${item.status === 'Completed' ? 'text-gray-300' : 'text-white'}`}>{task.title}</span>
                    </div>
                    <span className={`text-[8px] md:text-[10px] px-2 py-0.5 md:px-2.5 md:py-1 rounded-full font-bold uppercase tracking-wider flex-shrink-0 ml-2 ${item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-500'}`}>
                      {item.status === 'Completed' ? 'Done' : task.type}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Right: Weekly Project */}
              <div className={`p-5 md:p-6 rounded-2xl border flex flex-col h-full ${item.status === 'Active' ? 'border-[#9F67FF]/40 bg-[#9F67FF]/10' : 'border-white/5 bg-white/[0.02]'}`}>
                <div className="flex items-center gap-3 mb-4 md:mb-5 text-[#9F67FF]">
                  <FolderGit2 size={18} />
                  <h5 className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em]">Week {item.week} Project</h5>
                </div>
                <h6 className="text-base md:text-lg font-bold text-white tracking-tight mb-4 leading-snug">{item.project.title}</h6>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {item.project.tech.map(tech => (
                    <span key={tech} className="text-[9px] md:text-[10px] px-2 py-0.5 md:px-2.5 md:py-1 rounded-full font-mono font-bold bg-[#05060A] border border-white/5 text-gray-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  );
};

export default RoadmapPreview;