import React from "react";
import { set, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Atom,
  Bot,
  Box,
  Cloud,
  Code2,
  Container,
  GitGraph,
  Server,
  Shell,
  Sparkles,
  Terminal,
} from "lucide-react";
import { toast } from "react-toastify";

const popularTopics = [
  { id: "topic-react", label: "React", icon: <Atom size={20} /> },
  { id: "topic-python", label: "Python", icon: <Terminal size={20} /> },
  { id: "topic-ml", label: "Machine Learning", icon: <Bot size={20} /> },
  { id: "topic-typescript", label: "TypeScript", icon: <Code2 size={20} /> },
  { id: "topic-nodejs", label: "Node.js", icon: <Server size={20} /> },
  { id: "topic-aws", label: "AWS", icon: <Cloud size={20} /> },
  { id: "topic-dsa", label: "Data Structures", icon: <GitGraph size={20} /> },
  { id: "topic-docker", label: "Docker & K8s", icon: <Container size={20} /> },
  { id: "topic-rust", label: "Rust", icon: <Shell size={20} /> },
  { id: "topic-go", label: "Go Lang", icon: <Box size={20} /> },
];

const skillLevels = [
  {
    id: "level-beginner",
    value: "beginner",
    label: "Beginner",
    desc: "Little to no prior experience",
    color: "#10B981",
  },
  {
    id: "level-intermediate",
    value: "intermediate",
    label: "Intermediate",
    desc: "Some experience, want to go deeper",
    color: "#F59E0B",
  },
  {
    id: "level-advanced",
    value: "advanced",
    label: "Advanced",
    desc: "Experienced, targeting mastery",
    color: "#EF4444",
  },
];

const StepOne = ({ formData, updateFormData, onNext }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      topic: formData.topic,
      customTopic: formData.customTopic,
      skillLevel: formData.skillLevel || "beginner",
      weeklyHours: formData.weeklyHours,
      durationWeeks: formData.durationWeeks,
      goal: formData.goal,
    },
  });

  const selectedTopic = watch("topic");
  const selectedLevel = watch("skillLevel");

  const onSubmit = (data) => {
    if (!data.topic && !data.customTopic?.trim()) {
      return toast.error("Please select or enter a topic!");
    }
    if (!data.skillLevel) {
      return toast.error("Skill level is required!");
    }
    if (!data.weeklyHours) {
      return toast.error("Weekly hours is required!");
    }
    if (!data.durationWeeks) {
      return toast.error("Duration week is required!");
    }
    updateFormData(data);
    onNext();
  };

  const selectTopic = (topic) => {
    setValue("topic", topic);
    updateFormData({ topic });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="rounded-2xl p-6 lg:p-8 space-y-8"
        style={{
          background: "rgba(17, 24, 39, 0.8)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
        }}
      >
        {/* Topic selection */}
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            style={{ color: "#F9FAFB" }}
          >
            What do you want to learn?
          </label>
          <p className="text-xs mb-4" style={{ color: "#9CA3AF" }}>
            Choose a popular topic or describe your own learning goal.
          </p>

          {/* Popular topics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
            {popularTopics.map((topic) => {
              const isSelected = selectedTopic === topic.label;

              return (
                <motion.button
                  key={topic.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => selectTopic(topic.label)}
                  className="group flex flex-col items-center justify-center gap-2 px-3 py-4 rounded-xl text-sm font-medium transition-all duration-300 border border-transparent hover:border-violet-500/40"
                  style={{
                    background: isSelected
                      ? "rgba(124, 58, 237, 0.15)"
                      : "rgba(45, 55, 72, 0.25)",
                    border: isSelected
                      ? "1px solid rgba(124, 58, 237, 0.5)"
                      : undefined,
                    color: isSelected ? "#9F67FF" : "#9CA3AF",
                    boxShadow: isSelected
                      ? "0 0 15px rgba(124, 58, 237, 0.15)"
                      : "none",
                  }}
                >
                  {/* Icon with scaling & glow effect */}
                  <span
                    className={`transition-all duration-300 group-hover:scale-110 ${isSelected ? "text-violet-400" : "text-gray-400 group-hover:text-white"}`}
                  >
                    {topic.icon}
                  </span>

                  {/* Label with hover gradient */}
                  <span
                    className={`text-[11px] text-center leading-tight transition-all duration-300 
          ${
            isSelected
              ? "font-bold"
              : "group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400"
          }`}
                  >
                    {topic.label}
                  </span>

                  {/* Subtle Indicator for Selection */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-violet-500/5 blur-xl rounded-xl -z-10"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Custom topic input */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "#9CA3AF" }}
            >
              Or describe a custom topic
            </label>
            <input
              {...register("customTopic")}
              type="text"
              placeholder="e.g. Building REST APIs with FastAPI and PostgreSQL"
              className="input-field"
              onChange={(e) => updateFormData({ customTopic: e.target.value })}
            />
          </div>

          {/* Hidden topic register for validation */}
          <input type="hidden" {...register("topic")} />
        </div>

        {/* Skill level */}
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            style={{ color: "#F9FAFB" }}
          >
            What is your current skill level?
          </label>
          <p className="text-xs mb-4" style={{ color: "#9CA3AF" }}>
            This helps SkillOrbit calibrate the difficulty and pacing of your
            roadmap.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {skillLevels.map((level) => (
              <motion.button
                key={level.id}
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setValue("skillLevel", level.value);
                  updateFormData({ skillLevel: level.value });
                }}
                className="text-left px-4 py-4 rounded-xl transition-all duration-200"
                style={{
                  background:
                    selectedLevel === level.value
                      ? `rgba(${level.color === "#10B981" ? "16,185,129" : level.color === "#F59E0B" ? "245,158,11" : "239,68,68"}, 0.1)`
                      : "rgba(45, 55, 72, 0.3)",
                  border:
                    selectedLevel === level.value
                      ? `1px solid ${level.color}40`
                      : "1px solid rgba(45, 55, 72, 0.5)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      background: level.color,
                      boxShadow:
                        selectedLevel === level.value
                          ? `0 0 8px ${level.color}`
                          : "none",
                    }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color:
                        selectedLevel === level.value ? "#F9FAFB" : "#9CA3AF",
                    }}
                  >
                    {level.label}
                  </span>
                </div>
                <p className="text-xs pl-4" style={{ color: "#6B7280" }}>
                  {level.desc}
                </p>
              </motion.button>
            ))}
          </div>
          {errors.skillLevel && (
            <p className="mt-1.5 text-xs" style={{ color: "#EF4444" }}>
              Please select your skill level.
            </p>
          )}
        </div>

        {/* Weekly hours & duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              className="block text-sm font-semibold mb-1"
              style={{ color: "#F9FAFB" }}
            >
              Hours available per Day
            </label>
            <p className="text-xs mb-2" style={{ color: "#9CA3AF" }}>
              Realistic estimate helps with task distribution.
            </p>
            <select
              {...register("weeklyHours", { required: true })}
              className="input-field"
              onChange={(e) => updateFormData({ weeklyHours: e.target.value })}
            >
              {["2", "4", "6", "8", "10", "15", "20"].map((h) => (
                <option key={`hours-${h}`} value={h}>
                  {h} hours / day
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-semibold mb-1"
              style={{ color: "#F9FAFB" }}
            >
              Roadmap duration
            </label>
            <p className="text-xs mb-2" style={{ color: "#9CA3AF" }}>
              Total weeks to complete the learning path.
            </p>
            <select
              {...register("durationWeeks", { required: true })}
              className="input-field"
              onChange={(e) =>
                updateFormData({ durationWeeks: e.target.value })
              }
            >
              {["2", "4", "6", "8", "10", "12", "16"].map((w) => (
                <option key={`weeks-${w}`} value={w}>
                  {w} weeks
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Learning goal */}
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            style={{ color: "#F9FAFB" }}
          >
            What is your learning goal?{" "}
            <span style={{ color: "#6B7280", fontWeight: 400 }}>
              (optional)
            </span>
          </label>
          <p className="text-xs mb-2" style={{ color: "#9CA3AF" }}>
            e.g. "Get a job as a React developer" or "Build a SaaS side project"
          </p>
          <textarea
            {...register("goal")}
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
  );
};

export default StepOne;
