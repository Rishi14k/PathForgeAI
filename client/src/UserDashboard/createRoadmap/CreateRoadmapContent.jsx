import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepIndicator from "./StepIndicator";
import { useDispatch, useSelector } from "react-redux";
import { getUsageStatusThunk } from "../../redux/features/dashboard/usageSlice";
import UpgradeModal from "../../components/UpgradeModal";
import { useNavigate } from "react-router-dom";

export const defaultFormData = {
  topic: "",
  customTopic: "",
  skillLevel: "",
  weeklyHours: "4",
  durationWeeks: "6",
  learningStyle: [],
  resourceTypes: [],
  includeProjects: true,
  includeQuizzes: false,
  goal: "",
};

const steps = [
  { id: "step-topic", number: 1, label: "Topic & Level" },
  { id: "step-prefs", number: 2, label: "Preferences" },
  { id: "step-generate", number: 3, label: "Generating" },
];

const CreateRoadmapContent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(defaultFormData);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const usage = useSelector((s) => s.usage.data);
  const usageStatus = useSelector((s) => s.usage.status);

  useEffect(() => {
    dispatch(getUsageStatusThunk());
  }, [dispatch]);

  useEffect(() => {
    if (usage && !usage.roadmap.allowed) {
      setShowUpgrade(true);
    }
  }, [usage]);

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

if (usageStatus === "loading" || !usage) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-14 h-14 rounded-full border-2 border-indigo-500 border-t-transparent mb-6"
      />

      <h3 className="text-lg font-semibold text-white mb-2">
        Preparing your AI workspace
      </h3>

      <p className="text-gray-400 text-sm max-w-sm">
        Checking your plan access and available roadmap generations...
      </p>

    </div>
  );
}

  return (
    <div className="max-w-3xl mx-auto">
      <UpgradeModal
        open={showUpgrade}
        onClose={() => {
          setShowUpgrade(false)
          navigate('/dashboard')
        }}
        onUpgrade={() => {
          navigate('/pricing')
        }}
      />
      {/* Page header */}
      <>
        {!showUpgrade && (
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h2
                className="text-2xl font-bold mb-1"
                style={{ color: "#F9FAFB" }}
              >
                Generate AI Learning Roadmap
              </h2>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                Tell SkillOrbit what you want to master and get a personalized
                week-by-week plan in seconds.
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
                    <StepOne
                      formData={formData}
                      updateFormData={updateFormData}
                      onNext={goNext}
                    />
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
                    <StepTwo
                      formData={formData}
                      updateFormData={updateFormData}
                      onNext={goNext}
                      onPrev={goPrev}
                    />
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
              </AnimatePresence>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CreateRoadmapContent;
