import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// Components
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/DiscoveryResults";
import ProgressBar from "./components/ProgressBar";

const steps = [
  { id: "step-basics", number: 1, label: "Interests" },
  { id: "step-thinking", number: 2, label: "Style" },
  { id: "step-work", number: 3, label: "Preferences" },
  { id: "step-final", number: 4, label: "Goals" },
];

const DiscoveryContent = () => {
  const { result, loading } = useSelector((state) => state.discovery);

  console.log("red", result);

  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    interests: [],
    activities: "",
    thinkingStyle: "",
    problemApproach: "",
    workPreference: "",
    motivations: "",
    learningStyle: "",
    experienceLevel: "beginner",
    currentSituation: "",
    customInput: "",
  });

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  console.log("res", result, "loading", loading, "stepstr", isStarted);

  // Animation Variants
  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      {/* 1. Intro Screen */}
      {!isStarted && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center py-20"
        >
          {/* Badge */}
          <div className="bg-violet-500/10 text-violet-400 px-4 py-1 rounded-full text-sm font-semibold mb-4 border border-violet-500/20">
            AI Discovery Engine
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
            Find Your <span className="text-violet-500">Perfect</span> Career
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg max-w-2xl mb-12 leading-relaxed">
            Move beyond basic aptitude tests. Our neural engine maps your
            cognitive DNA to real-world roles, identifying high-growth
            opportunities tailored to your unique workflow.
          </p>

          {/* Discovery Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left max-w-5xl">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <h3 className="text-violet-400 font-bold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full" />
                Cognitive Profiling
              </h3>
              <p className="text-gray-500 text-sm">
                We analyze how you solve puzzles and process logic to determine
                your ideal working environment.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <h3 className="text-violet-400 font-bold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full" />
                Market Alignment
              </h3>
              <p className="text-gray-500 text-sm">
                Cross-referencing your skills with 2026 market trends to ensure
                your path is future-proof.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <h3 className="text-violet-400 font-bold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full" />
                Value Mapping
              </h3>
              <p className="text-gray-500 text-sm">
                Identify careers that align with your personal values, from
                work-life balance to social impact.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setIsStarted(true)}
            className="group relative bg-violet-600 hover:bg-violet-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-violet-500/20 flex items-center gap-3 active:scale-95"
          >
            Start Discovery{" "}
            <Sparkles
              className="group-hover:rotate-12 transition-transform"
              size={20}
            />
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-violet-400/20 blur-xl group-hover:blur-2xl transition-all -z-10" />
          </button>

          <p className="mt-6 text-gray-500 text-xs uppercase tracking-widest font-medium">
            Takes approximately 4 minutes • Grow with SkillOrbit
          </p>
        </motion.div>
      )}

      {/* 2. Form Flow */}
      {isStarted && (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Career Discovery
            </h2>
            <ProgressBar currentStep={currentStep} totalSteps={3} />
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${currentStep}`}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <StepOne
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={goNext}
                  />
                )}
                {currentStep === 2 && (
                  <StepTwo
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={goNext}
                    onPrev={goPrev}
                  />
                )}
                {currentStep === 3 && (
                  <StepThree formData={formData} onComplete={goNext} />
                )}
                {/* {currentStep === 4 && (
                  <StepFour />
                )} */}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}

      {/* 3. Loading State */}
    </div>
  );
};

export default DiscoveryContent;
