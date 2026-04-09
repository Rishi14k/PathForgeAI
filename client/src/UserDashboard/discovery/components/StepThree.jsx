import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Search,
  Cpu,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { discoveryThunk } from "../../../redux/features/dashboard/discoverySlice";
import { useNavigate } from "react-router-dom";

const generationSteps = [
  {
    id: "gen-traits",
    label: "Extracting personality traits...",
    duration: 1200,
  },
  { id: "gen-skills", label: "Mapping skill compatibility...", duration: 1400 },
  {
    id: "gen-market",
    label: "Scanning real-time market demand...",
    duration: 1600,
  },
  {
    id: "gen-logic",
    label: "Applying career matching logic...",
    duration: 1200,
  },
  {
    id: "gen-finalize",
    label: "Finalizing your discovery profile...",
    duration: 1000,
  },
];

const StepThree = ({ formData, onComplete }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.discovery);
  const navigate = useNavigate();

  console.log("status", status);

  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [logLines, setLogLines] = useState([]);
  const timersRef = useRef([]);
  const calledRef = useRef(false);

  // 1. Fake Loading UI Logic
  useEffect(() => {
    let totalDelay = 0;
    generationSteps.forEach((step, index) => {
      const startTimer = setTimeout(() => {
        setCurrentStepIndex(index);
        setLogLines((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ${step.label.replace("...", "")}`,
        ]);
      }, totalDelay);
      timersRef.current.push(startTimer);

      totalDelay += step.duration;

      const completeTimer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step.id]);
      }, totalDelay - 200);
      timersRef.current.push(completeTimer);
    });

    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  // 2. Real API Call
  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true;

      // 3. Chain the navigation to the successful dispatch
      dispatch(discoveryThunk(formData))
        .unwrap()
        .then(() => {
          // Navigate to the new path after the data is successfully in Redux
          navigate("/dashboard/discovery/results");
        })
        .catch((error) => {
          console.error("Discovery failed:", error);
          // Optional: Reset ref if you want them to be able to try again on error
          // calledRef.current = false;
        });
    }
  }, [dispatch, formData, navigate]);

  // useEffect(() => {
  //   if (status === "succeeded") {
  //     // 1. Instantly finish visual progress
  //     setCompletedSteps(generationSteps.map((step) => step.id));
  //     setCurrentStepIndex(generationSteps.length - 1);

  //     // 2. Wait a beat for the user to see the "100%" before switching
  //     const timer = setTimeout(() => {
  //       onComplete(); // This will now successfully call setCurrentStep(4) in the parent
  //     }, 1500);

  //     return () => clearTimeout(timer);
  //   }
  // }, [status, onComplete]);

  const overallProgress =
    status === "succeeded"
      ? 100
      : Math.min(
          Math.round((completedSteps.length / generationSteps.length) * 100),
          95,
        );

  return (
    <div
      className="rounded-2xl p-6 lg:p-10"
      style={{
        background: "rgba(17,24,39,0.8)",
        border: "1px solid rgba(45,55,72,0.5)",
      }}
    >
      <div className="text-center mb-10">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center bg-violet-500/10 border-2 border-violet-500/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Cpu size={40} className="text-violet-500" />
            </motion.div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Analyzing your Potential...
        </h3>
        <p className="text-gray-400">
          Our AI is processing your inputs to find your perfect career match.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-gray-400">Analysis Progress</span>
          <span className="text-violet-400 font-bold">{overallProgress}%</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-violet-500"
            animate={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {generationSteps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${currentStepIndex === index ? "bg-violet-500/5" : ""}`}
          >
            {completedSteps.includes(step.id) ? (
              <CheckCircle2 size={18} className="text-emerald-500" />
            ) : currentStepIndex === index ? (
              <Loader2 size={18} className="text-violet-500 animate-spin" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-gray-800" />
            )}
            <span
              className={`text-sm ${completedSteps.includes(step.id) ? "text-gray-500" : currentStepIndex === index ? "text-white" : "text-gray-700"}`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Terminal Output */}
      <div className="bg-black/40 border border-gray-800 rounded-xl p-4 text-[10px] font-mono h-24 overflow-y-auto scrollbar-hide">
        {logLines.map((line, i) => (
          <p key={i} className="text-emerald-400/80 mb-1">
            {">"} {line} ✓
          </p>
        ))}
        <p className="text-violet-400 animate-pulse">
          {">"} Processing data packets...
        </p>
      </div>
    </div>
  );
};

export default StepThree;
