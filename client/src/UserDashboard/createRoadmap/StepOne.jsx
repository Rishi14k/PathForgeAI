
import React from 'react';
import { set, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';


const popularTopics = [
  { id: 'topic-react', label: 'React', icon: '⚛️' },
  { id: 'topic-python', label: 'Python', icon: '🐍' },
  { id: 'topic-ml', label: 'Machine Learning', icon: '🤖' },
  { id: 'topic-typescript', label: 'TypeScript', icon: '🔷' },
  { id: 'topic-nodejs', label: 'Node.js', icon: '🟢' },
  { id: 'topic-aws', label: 'AWS', icon: '☁️' },
  { id: 'topic-dsa', label: 'Data Structures', icon: '🌳' },
  { id: 'topic-docker', label: 'Docker & K8s', icon: '🐳' },
  { id: 'topic-rust', label: 'Rust', icon: '🦀' },
  { id: 'topic-go', label: 'Go Lang', icon: '🔵' },
];

const skillLevels = [
  { id: 'level-beginner', value: 'beginner', label: 'Beginner', desc: 'Little to no prior experience', color: '#10B981' },
  { id: 'level-intermediate', value: 'intermediate', label: 'Intermediate', desc: 'Some experience, want to go deeper', color: '#F59E0B' },
  { id: 'level-advanced', value: 'advanced', label: 'Advanced', desc: 'Experienced, targeting mastery', color: '#EF4444' },
];


const StepOne = ({formData, updateFormData,onNext}) => {

    const { register, handleSubmit, setValue, watch, formState:{errors} } = useForm({
      defaultValues: {
      topic: formData.topic,
      customTopic: formData.customTopic,
      skillLevel: (formData.skillLevel) || 'beginner',
      weeklyHours: formData.weeklyHours,
      durationWeeks: formData.durationWeeks,
      goal: formData.goal,
    },
  });

  const selectedTopic = watch('topic')
  const selectedLevel = watch('skillLevel')

  const onSubmit = (data)=>{
    updateFormData(data)
    onNext()
  }

  const selectTopic = (topic)=>{
    setValue('topic',topic)
    updateFormData({topic})
  }    

   return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="rounded-2xl p-6 lg:p-8 space-y-8"
        style={{ background: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(45, 55, 72, 0.5)' }}
      >
        {/* Topic selection */}
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: '#F9FAFB' }}>
            What do you want to learn?
          </label>
          <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>
            Choose a popular topic or describe your own learning goal.
          </p>

          {/* Popular topics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
            {popularTopics.map((topic) => (
              <motion.button
                key={topic.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => selectTopic(topic.label)}
                className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: selectedTopic === topic.label ? 'rgba(124, 58, 237, 0.2)' : 'rgba(45, 55, 72, 0.3)',
                  border: selectedTopic === topic.label ? '1px solid rgba(124, 58, 237, 0.5)' : '1px solid rgba(45, 55, 72, 0.5)',
                  color: selectedTopic === topic.label ? '#9F67FF' : '#9CA3AF',
                  boxShadow: selectedTopic === topic.label ? '0 0 12px rgba(124, 58, 237, 0.2)' : 'none',
                }}
              >
                <span className="text-lg">{topic.icon}</span>
                <span className="text-xs text-center leading-tight">{topic.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Custom topic input */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>
              Or describe a custom topic
            </label>
            <input
              {...register('customTopic')}
              type="text"
              placeholder="e.g. Building REST APIs with FastAPI and PostgreSQL"
              className="input-field"
              onChange={(e) => updateFormData({ customTopic: e.target.value })}
            />
          </div>

          {/* Hidden topic register for validation */}
          <input type="hidden" {...register('topic')} />
        </div>

        {/* Skill level */}
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: '#F9FAFB' }}>
            What is your current skill level?
          </label>
          <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>
            This helps SkillOrbit calibrate the difficulty and pacing of your roadmap.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {skillLevels.map((level) => (
              <motion.button
                key={level.id}
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setValue('skillLevel', level.value);
                  updateFormData({ skillLevel: level.value });
                }}
                className="text-left px-4 py-4 rounded-xl transition-all duration-200"
                style={{
                  background: selectedLevel === level.value ? `rgba(${level.color === '#10B981' ? '16,185,129' : level.color === '#F59E0B' ? '245,158,11' : '239,68,68'}, 0.1)` : 'rgba(45, 55, 72, 0.3)',
                  border: selectedLevel === level.value ? `1px solid ${level.color}40` : '1px solid rgba(45, 55, 72, 0.5)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: level.color, boxShadow: selectedLevel === level.value ? `0 0 8px ${level.color}` : 'none' }}
                  />
                  <span className="text-sm font-semibold" style={{ color: selectedLevel === level.value ? '#F9FAFB' : '#9CA3AF' }}>
                    {level.label}
                  </span>
                </div>
                <p className="text-xs pl-4" style={{ color: '#6B7280' }}>{level.desc}</p>
              </motion.button>
            ))}
          </div>
          {errors.skillLevel && (
            <p className="mt-1.5 text-xs" style={{ color: '#EF4444' }}>Please select your skill level.</p>
          )}
        </div>

        {/* Weekly hours & duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: '#F9FAFB' }}>
              Hours available per week
            </label>
            <p className="text-xs mb-2" style={{ color: '#9CA3AF' }}>
              Realistic estimate helps with task distribution.
            </p>
            <select
              {...register('weeklyHours', { required: true })}
              className="input-field"
              onChange={(e) => updateFormData({ weeklyHours: e.target.value })}
            >
              {['2', '4', '6', '8', '10', '15', '20'].map((h) => (
                <option key={`hours-${h}`} value={h}>{h} hours / week</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: '#F9FAFB' }}>
              Roadmap duration
            </label>
            <p className="text-xs mb-2" style={{ color: '#9CA3AF' }}>
              Total weeks to complete the learning path.
            </p>
            <select
              {...register('durationWeeks', { required: true })}
              className="input-field"
              onChange={(e) => updateFormData({ durationWeeks: e.target.value })}
            >
              {['2', '4', '6', '8', '10', '12', '16'].map((w) => (
                <option key={`weeks-${w}`} value={w}>{w} weeks</option>
              ))}
            </select>
          </div>
        </div>

        {/* Learning goal */}
        <div>
          <label className="block text-sm font-semibold mb-1" style={{ color: '#F9FAFB' }}>
            What is your learning goal? <span style={{ color: '#6B7280', fontWeight: 400 }}>(optional)</span>
          </label>
          <p className="text-xs mb-2" style={{ color: '#9CA3AF' }}>
            e.g. "Get a job as a React developer" or "Build a SaaS side project"
          </p>
          <textarea
            {...register('goal')}
            rows={2}
            placeholder="Describe what you want to achieve after completing this roadmap..."
            className="input-field resize-none"
            onChange={(e) => updateFormData({ goal: e.target.value })}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary flex items-center gap-2 px-6 py-3 text-sm font-semibold"
          >
            <Sparkles size={15} />
            Continue to Preferences
            <ArrowRight size={15} />
          </motion.button>
        </div>
      </div>
    </form>
   )
}

export default StepOne