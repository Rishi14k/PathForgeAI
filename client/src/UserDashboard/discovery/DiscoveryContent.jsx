import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Compass, Sparkles, TrendingUp } from "lucide-react";

// Components
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import ProgressBar from "./components/ProgressBar";
import { useEffect } from "react";
import UpgradeModal from "../../components/UpgradeModal";
import {
  getDiscoveryResultThunk,
  getUsageStatusThunk,
} from "../../redux/features/dashboard/usageSlice";
import { useNavigate } from "react-router-dom";

const DiscoveryContent = () => {
  const { loading } = useSelector((state) => state.discovery);
  const { results } = useSelector((state) => state.usage);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usage = useSelector((s) => s.usage.data);
  const usageStatus = useSelector((s) => s.usage.status);
  // console.log("usage stst",usageStatus)

  // console.log("red", results);
  const [showUpgrade, setShowUpgrade] = useState(false);
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

  // console.log("res", result, "loading", loading, "stepstr", isStarted);

  // Animation Variants
  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  useEffect(() => {
    if (usageStatus === "idle") {
      dispatch(getUsageStatusThunk());
    }
  }, [usageStatus, dispatch]);

  useEffect(() => {
    if (!results || results?.length === 0) {
      dispatch(getDiscoveryResultThunk());
    }
  }, [dispatch, results]);

  useEffect(() => {
    if (usage && !usage?.discovery?.allowed) {
      setShowUpgrade(true);
    }
  }, [usage]);

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
    <div className="max-w-5xl mx-auto p-6 min-h-screen selection:bg-violet-500/30">
      <UpgradeModal
        open={showUpgrade}
        onClose={() => {
          setShowUpgrade(false);
          navigate("/dashboard");
        }}
        onUpgrade={() => navigate("/dashboard/pricing")}
      />

      {/* 1. Intro Screen */}
      {!showUpgrade && !isStarted && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center py-12 md:py-24"
        >
          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-violet-500/10 text-violet-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            AI Discovery Engine v2.0
          </motion.div>

          {/* Hero Title with Gradient */}
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tighter leading-[1.1]">
            Find Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-500">
              Perfect Career
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-medium">
            Our neural engine maps your{" "}
            <span className="text-gray-200">cognitive DNA</span> to real-world
            roles, identifying high-growth opportunities tailored to your unique
            workflow.
          </p>

          {/* Discovery Details Grid - Improved UX with Hover States */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full group/container">
            {[
              {
                title: "Cognitive Profiling",
                desc: "Analyzing logic patterns and problem-solving DNA.",
                icon: <BrainCircuit size={24} />,
              },
              {
                title: "Market Alignment",
                desc: "Real-time 2026 market trends and future-proofing.",
                icon: <TrendingUp size={24} />,
              },
              {
                title: "Value Mapping",
                desc: "Aligning career growth with personal fulfillment.",
                icon: <Compass size={24} />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white/[0.03] border border-white/10 p-8 rounded-2xl transition-all duration-500 hover:bg-white/[0.01] hover:border-violet-500/50 hover:-translate-y-2 overflow-hidden"
              >
                {/* 1. Subtle Background Glow on Hover */}
                <div className="absolute -inset-px bg-gradient-to-br from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* 2. Icon Container with Glow */}
                <div className="relative z-10 w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center m-auto mb-6 text-violet-400 group-hover:text-violet-600 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-500">
                  {item.icon}
                </div>

                {/* 3. Title with Hover Gradient */}
                <h3 className="relative z-10 text-xl font-bold mb-3 text-white transition-all duration-500 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400">
                  {item.title}
                </h3>

                {/* 4. Description */}
                <p className="relative z-10 text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                  {item.desc}
                </p>

                {/* 5. Decorative Corner Beam */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-violet-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>

          {/* Secondary & Primary CTA Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setIsStarted(true)}
              className="group relative bg-white text-black hover:bg-violet-500 hover:text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Start Discovery</span>
              <Sparkles
                className="relative z-10 group-hover:rotate-12 transition-transform"
                size={20}
              />
            </button>

            {results?.data?.length > 0 && (
              <button
                onClick={() => navigate("/dashboard/discovery/results")}
                className="px-10 py-4 rounded-2xl font-bold text-lg text-white border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3"
              >
                View Results
              </button>
            )}
          </div>

          <div className="mt-10 flex items-center gap-4 text-gray-500">
            <div className="h-px w-8 bg-gray-800" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
              4 MINUTE ASSESSMENT
            </span>
            <div className="h-px w-8 bg-gray-800" />
          </div>
        </motion.div>
      )}

      {/* 2. Form Flow - UX Improvement */}
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
    </div>
  );
};

export default DiscoveryContent;
