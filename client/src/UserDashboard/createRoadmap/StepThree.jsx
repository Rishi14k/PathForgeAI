
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
const generationSteps = [
  { id: 'gen-analyze', label: 'Analyzing your learning profile...', duration: 1200 },
  { id: 'gen-structure', label: 'Structuring week-by-week curriculum...', duration: 1400 },
  { id: 'gen-resources', label: 'Curating best-in-class resources...', duration: 1600 },
  { id: 'gen-projects', label: 'Designing hands-on projects...', duration: 1200 },
  { id: 'gen-optimize', label: 'Optimizing for your schedule...', duration: 1000 },
  { id: 'gen-finalize', label: 'Finalizing your personalized roadmap...', duration: 800 },
];


const StepThree = ({formData, onComplete}) => {

      const [completedSteps, setCompletedSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [logLines, setLogLines] = useState([]);
  const [done, setDone] = useState(false);

  const topic = formData.customTopic || formData.topic || 'your topic';

  useEffect(() => {
    let totalDelay = 0;
    generationSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStepIndex(index);
        setLogLines((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ${step.label.replace('...', '')}`,
        ]);
      }, totalDelay);

      totalDelay += step.duration;

      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step.id]);
      }, totalDelay - 200);
    });

    setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        onComplete();
      }, 1200);
    }, totalDelay + 200);
  }, [onComplete]);

  const overallProgress = Math.round((completedSteps.length / generationSteps.length) * 100);


  return (
     <div
      className="rounded-2xl p-6 lg:p-10"
      style={{ background: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(45, 55, 72, 0.5)' }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="relative inline-flex items-center justify-center mb-6">
          {/* Outer ring */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: done
                ? 'rgba(16, 185, 129, 0.15)'
                : 'rgba(124, 58, 237, 0.12)',
              border: done
                ? '2px solid rgba(16, 185, 129, 0.4)'
                : '2px solid rgba(124, 58, 237, 0.3)',
              boxShadow: done
                ? '0 0 30px rgba(16, 185, 129, 0.2)'
                : '0 0 30px rgba(124, 58, 237, 0.2)',
              transition: 'all 0.5s ease',
            }}
          >
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done-icon"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <CheckCircle2 size={40} style={{ color: '#10B981' }} />
                </motion.div>
              ) : (
                <motion.div
                  key="loading-icon"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 size={40} style={{ color: '#7C3AED' }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Orbiting dot */}
          {!done && (
            <motion.div
              className="absolute w-3 h-3 rounded-full"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                transformOrigin: '0 0',
                top: '50%',
                left: '50%',
                marginTop: '-6px',
                marginLeft: '44px',
                position: 'absolute',
                background: '#9F67FF',
                boxShadow: '0 0 8px rgba(159, 103, 255, 0.8)',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
              }}
            />
          )}
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done-text"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#F9FAFB' }}>
                Your roadmap is ready! 🎉
              </h3>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>
                Redirecting to your personalized {topic} roadmap...
              </p>
            </motion.div>
          ) : (
            <motion.div key="generating-text">
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#F9FAFB' }}>
                Generating your roadmap...
              </h3>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>
                SkillOrbit AI is crafting a personalized path for{' '}
                <span style={{ color: '#9F67FF', fontWeight: 600 }}>{topic}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overall progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: '#9CA3AF' }}>Overall progress</span>
          <span className="text-xs font-bold mono" style={{ color: '#9F67FF', fontVariantNumeric: 'tabular-nums' }}>
            {overallProgress}%
          </span>
        </div>
        <div className="progress-bar-bg h-2">
          <motion.div
            className="progress-bar-fill h-2"
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Generation steps */}
      <div className="space-y-3 mb-8">
        {generationSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStepIndex === index && !isCompleted;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: index <= currentStepIndex ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <CheckCircle2 size={18} style={{ color: '#10B981' }} />
                  </motion.div>
                ) : isCurrent ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 size={16} style={{ color: '#7C3AED' }} />
                  </motion.div>
                ) : (
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: 'rgba(45, 55, 72, 0.5)', border: '1px solid rgba(45, 55, 72, 0.6)' }}
                  />
                )}
              </div>
              <span
                className="text-sm"
                style={{
                  color: isCompleted ? '#9CA3AF' : isCurrent ? '#F9FAFB' : '#4B5563',
                  textDecoration: isCompleted ? 'line-through' : 'none',
                  fontWeight: isCurrent ? 500 : 400,
                }}
              >
                {step.label}
              </span>
              {isCurrent && (
                <span className="text-xs mono" style={{ color: '#7C3AED' }}>
                  <span className="blink">▋</span>
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Terminal log */}
      <div
        className="rounded-xl p-4 font-mono text-xs overflow-y-auto"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(45, 55, 72, 0.5)',
          maxHeight: '120px',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#EF4444' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F59E0B' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#10B981' }} />
          <span className="text-xs ml-2" style={{ color: '#6B7280' }}>skillorbit-ai — generate</span>
        </div>
        {logLines.map((line, i) => (
          <p key={`log-${i}`} style={{ color: '#10B981' }}>
            {line}
          </p>
        ))}
        {!done && (
          <p style={{ color: '#7C3AED' }}>
            {'>'} <span className="blink">▋</span>
          </p>
        )}
        {done && (
          <p style={{ color: '#10B981' }}>
            {'>'} Roadmap generation complete ✓
          </p>
        )}
      </div>
    </div>
  )
}

export default StepThree