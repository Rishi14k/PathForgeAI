import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Trophy, ChevronRight, Sparkles, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CareerCard = ({ career }) => {
  const navigate = useNavigate()
  const { title, description, matchScore, skills, duration} = career;

  // Determine color based on match score
  const getScoreColor = (score) => {
    if (score >= 90) return '#10B981'; // Emerald
    if (score >= 75) return '#7C3AED'; // Violet
    return '#F59E0B'; // Amber
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className="relative group rounded-3xl p-6 h-full flex flex-col transition-all duration-300"
      style={{
        background: 'rgba(31, 41, 55, 0.4)',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* 1. Header: Title & Match Score */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
            <Clock size={14} />
            <span>Preparation: {duration || '3-6 months'}</span>
          </div>
        </div>
        
        <div 
          className="flex flex-col items-center justify-center p-2 rounded-2xl border"
          style={{ 
            borderColor: `${getScoreColor(matchScore)}40`,
            background: `${getScoreColor(matchScore)}10` 
          }}
        >
          <span className="text-xs font-bold uppercase tracking-tighter" style={{ color: getScoreColor(matchScore) }}>
            Match
          </span>
          <span className="text-lg font-black" style={{ color: getScoreColor(matchScore) }}>
            {matchScore}%
          </span>
        </div>
      </div>

      {/* 2. Description */}
      <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
        {description}
      </p>

      {/* 4. Skills Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {skills?.slice(0, 4).map((skill, index) => (
          <span 
            key={index}
            className="px-3 py-1 rounded-full text-[10px] font-medium bg-gray-800/50 text-gray-300 border border-gray-700/50"
          >
            {skill}
          </span>
        ))}
        {skills?.length > 4 && (
          <span className="text-[10px] text-gray-500 self-center">+{skills.length - 4} more</span>
        )}
      </div>

      {/* 5. Footer Action */}
      <div className="mt-auto pt-4 border-t border-gray-800/50 flex items-center justify-between">
        <button onClick={()=>{
          navigate('/dashboard/create-roadmap')
        }} className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all cursor-pointer">
          Explore Path <ChevronRight size={16} className="text-violet-500" />
        </button>
        
        <div className="flex -space-x-2">
           <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
             <Trophy size={12} className="text-emerald-400" />
           </div>
           <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
             <Target size={12} className="text-violet-400" />
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerCard;