
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepIndicator from './StepIndicator';

export const defaultFormData = {
  topic: '',
  customTopic: '',
  skillLevel: '',
  weeklyHours: '8',
  durationWeeks: '6',
  learningStyle: [],
  resourceTypes: [],
  includeProjects: true,
  includeQuizzes: false,
  goal: '',
};

const steps = [
  { id: 'step-topic', number: 1, label: 'Topic & Level' },
  { id: 'step-prefs', number: 2, label: 'Preferences' },
  { id: 'step-generate', number: 3, label: 'Generating' },
  { id: 'step-preview', number: 4, label: 'Preview' },
];




const CreateRoadmapContent = () => {
     const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(defaultFormData);


   const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
<div className="max-w-3xl mx-auto">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-1" style={{ color: '#F9FAFB' }}>Generate AI Learning Roadmap</h2>
        <p className="text-sm" style={{ color: '#9CA3AF' }}>
          Tell SkillOrbit what you want to master and get a personalized week-by-week plan in seconds.
        </p>
      </motion.div>

      {/* Step indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Step content */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepOne formData={formData} updateFormData={updateFormData} onNext={goNext} />
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepTwo formData={formData} updateFormData={updateFormData} onNext={goNext} onPrev={goPrev} />
            </motion.div>
          )}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <StepThree formData={formData} onComplete={goNext} />
            </motion.div>
          )}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <StepFour formData={formData} onRegenerate={() => setCurrentStep(1)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>  )
}

export default CreateRoadmapContent