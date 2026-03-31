import { CheckCircle2, Circle, Clock, ExternalLink, ChevronRight, BookOpen, Code2, Play, Layers } from 'lucide-react';
import React, { useState } from 'react'
import {AnimatePresence, motion} from "framer-motion"


const roadmapData = {
  id: 'roadmap-react-2024',
  title: 'Full-Stack React Developer',
  totalWeeks: 8,
  currentWeek: 2,
  overallProgress: 28,
  weeks: [
    {
      id: 'week-001',
      weekNumber: 1,
      title: 'React Foundations',
      status: 'completed',
      progress: 100,
      tasks: [
        { id: 'task-001', title: 'React Component Architecture', duration: '45 min', resourceUrl: 'https://react.dev/learn', resourceLabel: 'React Docs', completed: true, type: 'read' },
        { id: 'task-002', title: 'JSX & Props Deep Dive', duration: '30 min', resourceUrl: 'https://react.dev/learn/describing-the-ui', resourceLabel: 'React Docs', completed: true, type: 'read' },
        { id: 'task-003', title: 'State & Event Handling', duration: '50 min', resourceUrl: 'https://react.dev/learn/adding-interactivity', resourceLabel: 'React Docs', completed: true, type: 'read' },
        { id: 'task-004', title: 'useEffect & Lifecycle', duration: '40 min', resourceUrl: 'https://react.dev/reference/react/useEffect', resourceLabel: 'React Docs', completed: true, type: 'read' },
      ],
      project: {
        id: 'proj-001',
        title: 'Week 1 Project: Todo App with Hooks',
        description: 'Build a fully functional todo app using useState, useEffect, and custom hooks.',
        completed: true,
        estimatedTime: '2–3 hrs',
      },
    },
    {
      id: 'week-002',
      weekNumber: 2,
      title: 'Advanced Hooks & Context',
      status: 'active',
      progress: 50,
      tasks: [
        { id: 'task-005', title: 'Custom Hooks Pattern', duration: '35 min', resourceUrl: 'https://react.dev/learn/reusing-logic-with-custom-hooks', resourceLabel: 'React Docs', completed: true, type: 'read', current: false },
        { id: 'task-006', title: 'useReducer for Complex State', duration: '45 min', resourceUrl: 'https://react.dev/learn/extracting-state-logic-into-a-reducer', resourceLabel: 'React Docs', completed: true, type: 'read', current: false },
        { id: 'task-007', title: 'React Context API', duration: '40 min', resourceUrl: 'https://react.dev/learn/passing-data-deeply-with-context', resourceLabel: 'React Docs', completed: false, type: 'read', current: true },
        { id: 'task-008', title: 'Performance with useMemo & useCallback', duration: '30 min', resourceUrl: 'https://react.dev/reference/react/useMemo', resourceLabel: 'React Docs', completed: false, type: 'video', current: false },
      ],
      project: {
        id: 'proj-002',
        title: 'Week 2 Project: Global State Manager',
        description: 'Build a multi-page app using Context + useReducer to manage global state without Redux.',
        completed: false,
        estimatedTime: '3–4 hrs',
      },
    },
  ],
};

const taskTypeIcon = (type)=>{
  switch(type){
      case 'video': return <Play size={11} />;
    case 'code': return <Code2 size={11} />;
    default: return <BookOpen size={11} />;
  }
}



const RoadmapTimeline = () => {

    const [tasks, setTasks] = useState(roadmapData.weeks.flatMap((w) => w.tasks));
    const [expandedWeeks, setExpandedWeeks] = useState({
    'week-001': false,
    'week-002': true,
  });

  const getTaskById = (id)=> tasks.find((t)=>t.id === id)

 const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

   const toggleWeek = (weekId) => {
    setExpandedWeeks((prev) => ({ ...prev, [weekId]: !prev[weekId] }));
  };

  const getWeekProgress = (week) => {
  // Defensive check: if week or tasks don't exist
  if (!week?.tasks || week.tasks.length === 0) return 0;

  const weekTasks = week.tasks.map((t) => getTaskById(t.id) || t);
  const completed = weekTasks.filter((t) => t.completed).length;
  
  // Calculate percentage
  return Math.round((completed / weekTasks.length) * 100);
};




  return (
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{delay:0.3,duration:0.5}}
    >
      {/* header  */}
       <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: '#6B7280', letterSpacing: '0.08em' }}>
            Continue Learning
          </h3>
          <h2 className="text-xl font-bold" style={{ color: '#F9FAFB' }}>{roadmapData.title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs" style={{ color: '#9CA3AF' }}>Overall Progress</p>
            <p className="text-lg font-bold mono" style={{ color: '#9F67FF', fontVariantNumeric: 'tabular-nums' }}>
              {roadmapData.overallProgress}%
            </p>
          </div>
          <button
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
            style={{
              background: 'rgba(124, 58, 237, 0.1)',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              color: '#9F67FF',
            }}
          >
            Full Roadmap
            <ChevronRight size={14} />
          </button>
        </div>
      </div>


        {/* Overall progress bar */}
      <div className="mb-6">
        <div className="progress-bar-bg h-2">
          <motion.div
            className="progress-bar-fill h-2"
            initial={{ width: 0 }}
            animate={{ width: `${roadmapData.overallProgress}%` }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs" style={{ color: '#6B7280' }}>
            Week {roadmapData.currentWeek} of {roadmapData.totalWeeks}
          </span>
          <span className="text-xs" style={{ color: '#6B7280' }}>
            {roadmapData.overallProgress}% complete
          </span>
        </div>
      </div>



      {/* time=line  */}

       <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-5 top-8 bottom-8 w-px"
          style={{ background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.6) 0%, rgba(124, 58, 237, 0.1) 100%)' }}
        />

        <div className="space-y-4">
          {roadmapData.weeks.map((week) => {
            const isExpanded = expandedWeeks[week.id];
            const weekProgress = getWeekProgress(week);
            const isActive = week.status === 'active';

            return (
              <div key={week.id} className="relative pl-14">
                {/* Week dot */}
                <div
                  className="absolute left-0 top-3 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold z-10"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #7C3AED, #9F67FF)'
                      : week.status === 'completed' ?'rgba(16, 185, 129, 0.2)' :'rgba(45, 55, 72, 0.5)',
                    border: isActive ? 'none' : week.status === 'completed' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(45, 55, 72, 0.5)',
                    color: isActive ? 'white' : week.status === 'completed' ? '#10B981' : '#9CA3AF',
                    boxShadow: isActive ? '0 0 16px rgba(124, 58, 237, 0.5)' : 'none',
                  }}
                >
                  W{week.weekNumber}
                </div>

                {/* Week card */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(17, 24, 39, 0.7)',
                    border: isActive ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid rgba(45, 55, 72, 0.4)',
                    boxShadow: isActive ? '0 4px 24px rgba(124, 58, 237, 0.08)' : 'none',
                  }}
                >
                  {/* Week header */}
                  <button
                    onClick={() => toggleWeek(week.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold" style={{ color: '#F9FAFB' }}>
                            Week {week.weekNumber}: {week.title}
                          </span>
                          {isActive && (
                            <span className="badge badge-active">Current</span>
                          )}
                          {week.status === 'completed' && (
                            <span className="badge badge-completed">Done</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="progress-bar-bg h-1.5 w-32">
                            <motion.div
                              className="progress-bar-fill h-1.5"
                              initial={{ width: 0 }}
                              animate={{ width: `${weekProgress}%` }}
                              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                          <span className="text-xs mono" style={{ color: '#9CA3AF', fontVariantNumeric: 'tabular-nums' }}>
                            {weekProgress}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={16} style={{ color: '#9CA3AF' }} />
                    </motion.div>
                  </button>

                  {/* Week content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          className="px-5 pb-5 space-y-3"
                          style={{ borderTop: '1px solid rgba(45, 55, 72, 0.4)' }}
                        >
                          <div className="pt-4 space-y-2">
                            {week.tasks.map((task) => {
                              const liveTask = getTaskById(task.id) || task;
                              const isCurrent = 'current' in task && task.current && !liveTask.completed;
                              return (
                                <TaskCard
                                  key={task.id}
                                  task={(liveTask || task)}
                                  isCurrent={isCurrent}
                                  onToggle={() => toggleTask(task.id)}
                                />
                              );
                            })}
                          </div>

                          {/* Project card */}
                          <div
                            className="mt-4 rounded-xl p-4"
                            style={{
                              background: 'rgba(124, 58, 237, 0.06)',
                              border: '1px solid rgba(124, 58, 237, 0.2)',
                            }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                  style={{ background: 'rgba(124, 58, 237, 0.2)' }}
                                >
                                  <Layers size={15} style={{ color: '#9F67FF' }} />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold" style={{ color: '#F9FAFB' }}>
                                      {week.project.title}
                                    </span>
                                    {week.project.completed && (
                                      <CheckCircle2 size={14} style={{ color: '#10B981' }} />
                                    )}
                                  </div>
                                  <p className="text-xs" style={{ color: '#9CA3AF' }}>{week.project.description}</p>
                                  <div className="flex items-center gap-1.5 mt-2">
                                    <Clock size={11} style={{ color: '#6B7280' }} />
                                    <span className="text-xs" style={{ color: '#6B7280' }}>{week.project.estimatedTime}</span>
                                  </div>
                                </div>
                              </div>
                              {!week.project.completed && (
                                <button
                                  className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                                  style={{
                                    background: 'rgba(124, 58, 237, 0.2)',
                                    border: '1px solid rgba(124, 58, 237, 0.4)',
                                    color: '#9F67FF',
                                  }}
                                >
                                  Start Project
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </motion.div>
  )
}

export default RoadmapTimeline


function TaskCard({ task, isCurrent, onToggle }) {
  return (
    <motion.div
      layout
      className={`task-card flex items-start gap-3 ${task.completed ? 'completed' : ''} ${isCurrent ? 'current-task-highlight' : ''}`}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className="flex-shrink-0 mt-0.5 transition-all duration-200"
        style={{ color: task.completed ? '#10B981' : '#6B7280' }}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        <AnimatePresence mode="wait">
          {task.completed ? (
            <motion.div
              key="checked"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, type: 'spring', stiffness: 400 }}
            >
              <CheckCircle2 size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="unchecked"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Circle size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span
            className="text-sm font-medium leading-snug"
            style={{
              color: task.completed ? '#6B7280' : '#F9FAFB',
              textDecoration: task.completed ? 'line-through' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {task.title}
          </span>
          {isCurrent && (
            <span
              className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: 'rgba(124, 58, 237, 0.2)',
                color: '#9F67FF',
                border: '1px solid rgba(124, 58, 237, 0.3)',
              }}
            >
              Current
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex items-center gap-1" style={{ color: '#6B7280' }}>
            <Clock size={11} />
            <span className="text-xs">{task.duration}</span>
          </div>
          <a
            href={task.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium transition-colors"
            style={{ color: '#7C3AED' }}
            onClick={(e) => e.stopPropagation()}
          >
            {taskTypeIcon(task.type)}
            <span>{task.resourceLabel}</span>
            <ExternalLink size={9} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}