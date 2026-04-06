import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRoadmapThunk } from "../../redux/features/dashboard/createRoadmapSlice";

const generationSteps = [
  {
    id: "gen-analyze",
    label: "Analyzing your learning profile...",
    duration: 1200,
  },
  {
    id: "gen-structure",
    label: "Structuring week-by-week curriculum...",
    duration: 1400,
  },
  {
    id: "gen-resources",
    label: "Curating best-in-class resources...",
    duration: 1600,
  },
  {
    id: "gen-projects",
    label: "Designing hands-on projects...",
    duration: 1200,
  },
  {
    id: "gen-optimize",
    label: "Optimizing for your schedule...",
    duration: 1000,
  },
  {
    id: "gen-finalize",
    label: "Finalizing your personalized roadmap...",
    duration: 800,
  },
];

const StepThree = ({ formData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roadmapId, error, status } = useSelector(
    (state) => state.createRoadmap,
  );

  console.log("stat",status )

  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [logLines, setLogLines] = useState([]);

  // ✅ prevents double dispatch
  const calledRef = useRef(false);

  // ✅ store timers safely
  const timersRef = useRef([]);

  const topic = formData.customTopic || formData.topic || "your topic";

  /* -----------------------------------
      Fake AI Generation Animation
  ----------------------------------- */
  useEffect(() => {
    let totalDelay = 0;

    generationSteps.forEach((step, index) => {
      const startTimer = setTimeout(() => {
        setCurrentStepIndex(index);

        setLogLines((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ${step.label.replace(
            "...",
            "",
          )}`,
        ]);
      }, totalDelay);

      timersRef.current.push(startTimer);

      totalDelay += step.duration;

      const completeTimer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step.id]);
      }, totalDelay - 200);

      timersRef.current.push(completeTimer);
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  /* -----------------------------------
      CALL API ONLY ONCE
  ----------------------------------- */
  useEffect(() => {
    if (status === "idle" && !calledRef.current) {
      dispatch(createRoadmapThunk(formData));
      calledRef.current = true;
    }
  }, [dispatch, formData, status]);

  /* -----------------------------------
      SUCCESS NAVIGATION
  ----------------------------------- */
  useEffect(() => {
    if (status === "succeeded" && roadmapId) {
      const redirectTimer = setTimeout(() => {
        navigate(`/dashboard/roadmap/${roadmapId}`);
      }, 1200);

      timersRef.current.push(redirectTimer);
    }
  }, [status, roadmapId, navigate]);

  /* -----------------------------------
      PROGRESS CALCULATION
  ----------------------------------- */
  const overallProgress =
    status === "succeeded"
      ? 100
      : Math.min(
          Math.round((completedSteps.length / generationSteps.length) * 100),
          92,
        );

  return (
    <div
      className="rounded-2xl p-6 lg:p-10"
      style={{
        background: "rgba(17,24,39,0.8)",
        border: "1px solid rgba(45,55,72,0.5)",
      }}
    >
      {/* HEADER */}
      <div className="text-center mb-10">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: status === "succeeded"
                ? "rgba(16,185,129,0.15)"
                : "rgba(124,58,237,0.12)",
              border: status === "succeeded"
                ? "2px solid rgba(16,185,129,0.4)"
                : "2px solid rgba(124,58,237,0.3)",
            }}
          >
            <AnimatePresence mode="wait">
              {status === "succeeded" ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle2 size={40} color="#10B981" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Loader2 size={40} color="#7C3AED" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {status === "succeeded" ? (
          <>
            <h3 className="text-2xl font-bold text-white mb-2">
              Your roadmap is ready! 🎉
            </h3>
            <p className="text-gray-400">
              Redirecting to your personalized {topic} roadmap...
            </p>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white mb-2">
              Generating your roadmap...
            </h3>
            <p className="text-gray-400">
              SkillOrbit AI is crafting a personalized path for{" "}
              <span className="text-purple-400 font-semibold">{topic}</span>
            </p>
          </>
        )}
      </div>

      {/* PROGRESS BAR */}
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-gray-400">Overall progress</span>
          <span className="text-purple-400 font-bold">{overallProgress}%</span>
        </div>

        <div className="h-2 bg-gray-800 rounded">
          <motion.div
            className="h-2 bg-purple-500 rounded"
            animate={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* STEPS */}
      <div className="space-y-3 mb-8">
        {generationSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStepIndex === index && !isCompleted;

          return (
            <div key={step.id} className="flex items-center gap-3">
              {isCompleted ? (
                <CheckCircle2 size={18} color="#10B981" />
              ) : isCurrent ? (
                <Loader2 size={16} color="#7C3AED" className="animate-spin" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-gray-700" />
              )}

              <span
                className={`text-sm ${
                  isCompleted
                    ? "text-gray-400 line-through"
                    : isCurrent
                      ? "text-white"
                      : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* TERMINAL */}
      <div className="bg-black/40 border border-gray-700 rounded-xl p-4 text-xs font-mono max-h-[120px] overflow-y-auto">
        {logLines.map((line, i) => (
          <p key={i} className="text-green-400">
            {line}
          </p>
        ))}

        {status !== "succeeded" && <p className="text-purple-400">{">"} ▋</p>}

        {status === "succeeded" && (
          <p className="text-green-400">{">"} Roadmap generation complete ✓</p>
        )}
      </div>

      {/* ERROR */}
      {status === "failed" && (
        <p className="text-red-400 text-center mt-4">
          {error || "Something went wrong"}
        </p>
      )}
    </div>
  );
};

export default StepThree;
