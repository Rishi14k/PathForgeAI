import { Flame, Zap } from 'lucide-react';
import {motion} from "framer-motion"
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WelcomeHero = () => {

  const streak = useSelector((state) => state.dashboard.data?.data?.streak) || 0;
const taskComp = useSelector((state) => state.dashboard.data?.data?.completedTasks) || 0;

 return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl px-8 py-10"
      style={{
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.18) 0%, rgba(159, 103, 255, 0.08) 40%, rgba(11, 15, 25, 0.6) 100%)',
        border: '1px solid rgba(124, 58, 237, 0.25)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Decorative glow blobs */}
      <div
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(124, 58, 237, 0.12)' }}
      />
      <div
        className="absolute -bottom-12 right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(159, 103, 255, 0.08)' }}
      />
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(124,58,237,0.15) 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          {/* Streak badge */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#F59E0B',
              }}
            >
              <Flame size={13} />
              <span>{streak || 0}-day streak active</span>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                color: '#9F67FF',
              }}
            >
              <Zap size={13} />
              <span>AI Roadmap Active</span>
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold leading-tight" style={{ color: '#F9FAFB' }}>
            Welcome back to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #9F67FF, #C084FC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SkillOrbit
            </span>
          </h2>
          <p className="mt-2 text-base" style={{ color: '#9CA3AF' }}>
            Continue building your learning orbit. You have completed <strong style={{ color: '#C084FC' }}>{taskComp || 0} tasks.</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/dashboard/create-roadmap">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary px-5 py-2.5 text-sm font-semibold flex items-center gap-2"
            >
              <Zap size={15} />
              Generate Roadmap
            </motion.button>
          </Link>
          <Link to="/dashboard/my-roadmaps">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary px-5 py-2.5 text-sm font-semibold"
            >
              View All Roadmaps
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeHero