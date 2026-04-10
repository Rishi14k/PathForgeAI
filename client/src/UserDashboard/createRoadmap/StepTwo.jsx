import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
const learningStyles = [
  {
    id: "style-visual",
    value: "visual",
    label: "Visual",
    desc: "Diagrams, videos, illustrations",
    icon: "👁️",
  },
  {
    id: "style-reading",
    value: "reading",
    label: "Reading",
    desc: "Articles, docs, books",
    icon: "📖",
  },
  {
    id: "style-handson",
    value: "hands-on",
    label: "Hands-on",
    desc: "Projects, coding exercises",
    icon: "🛠️",
  },
  {
    id: "style-structured",
    value: "structured",
    label: "Structured",
    desc: "Courses with clear progression",
    icon: "📋",
  },
];

const resourceTypes = [
  {
    id: "res-docs",
    value: "documentation",
    label: "Official Docs",
    icon: "📄",
  },
  { id: "res-video", value: "video", label: "Video Courses", icon: "🎬" },
  { id: "res-blog", value: "blog", label: "Blog Posts", icon: "✍️" },
  { id: "res-github", value: "github", label: "GitHub Repos", icon: "🐙" },
  {
    id: "res-interactive",
    value: "interactive",
    label: "Interactive (Codecademy, etc.)",
    icon: "💻",
  },
  { id: "res-books", value: "books", label: "Books / PDFs", icon: "📚" },
];

const StepTwo = ({ formData, updateFormData, onNext, onPrev }) => {
  

  const { handleSubmit } = useForm();

  const toggleLearningStyle = (value) => {
    const current = formData.learningStyle;
    const updated = current.includes(value)
      ? current.filter((s) => s !== value)
      : [...current, value];
    updateFormData({ learningStyle: updated });
  };

  const toggleResourceType = (value) => {
    const current = formData.resourceTypes;
    const updated = current.includes(value)
      ? current.filter((r) => r !== value)
      : [...current, value];
    updateFormData({ resourceTypes: updated });
  };

  const onSubmit = () => {
    if(!learningStyles){
      return toast.error("Select one learning style!")
    }
    if(!resourceTypes){
      return toast.error("Select one resource type!")
    }

    onNext();
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
        {/* Learning style */}
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            style={{ color: "#F9FAFB" }}
          >
            How do you learn best?
          </label>
          <p className="text-xs mb-4" style={{ color: "#9CA3AF" }}>
            Select all that apply — AI will prioritize these in your roadmap.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {learningStyles.map((style) => {
              const isSelected = formData.learningStyle.includes(style.value);
              return (
                <motion.button
                  key={style.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleLearningStyle(style.value)}
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl transition-all duration-200"
                  style={{
                    background: isSelected
                      ? "rgba(124, 58, 237, 0.15)"
                      : "rgba(45, 55, 72, 0.3)",
                    border: isSelected
                      ? "1px solid rgba(124, 58, 237, 0.5)"
                      : "1px solid rgba(45, 55, 72, 0.5)",
                    boxShadow: isSelected
                      ? "0 0 12px rgba(124, 58, 237, 0.15)"
                      : "none",
                  }}
                >
                  <span className="text-2xl">{style.icon}</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: isSelected ? "#F9FAFB" : "#9CA3AF" }}
                  >
                    {style.label}
                  </span>
                  <span
                    className="text-xs text-center"
                    style={{ color: "#6B7280" }}
                  >
                    {style.desc}
                  </span>
                  {isSelected && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(124, 58, 237, 0.3)",
                        border: "1px solid rgba(124, 58, 237, 0.5)",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="#9F67FF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Resource types */}
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            style={{ color: "#F9FAFB" }}
          >
            Preferred resource types
          </label>
          <p className="text-xs mb-4" style={{ color: "#9CA3AF" }}>
            SkillOrbit will prioritize these resource formats when curating your
            tasks.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {resourceTypes.map((res) => {
              const isSelected = formData.resourceTypes.includes(res.value);
              return (
                <motion.button
                  key={res.id}
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleResourceType(res.value)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: isSelected
                      ? "rgba(124, 58, 237, 0.12)"
                      : "rgba(45, 55, 72, 0.3)",
                    border: isSelected
                      ? "1px solid rgba(124, 58, 237, 0.4)"
                      : "1px solid rgba(45, 55, 72, 0.5)",
                  }}
                >
                  <span className="text-xl flex-shrink-0">{res.icon}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: isSelected ? "#F9FAFB" : "#9CA3AF" }}
                  >
                    {res.label}
                  </span>
                  {isSelected && (
                    <div className="ml-auto flex-shrink-0">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "#7C3AED" }}
                      >
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 5l2 2 4-4"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4">
          <label
            className="block text-sm font-semibold"
            style={{ color: "#F9FAFB" }}
          >
            Roadmap extras
          </label>
          <div className="space-y-3">
            {[
              {
                key: "includeProjects",
                label: "Include weekly projects",
                desc: "Hands-on projects at the end of each week to reinforce learning",
                value: formData.includeProjects,
              },
              // {
              //   key: "includeQuizzes",
              //   label: "Include knowledge checks",
              //   desc: "Short quizzes after key topics to test your understanding",
              //   value: formData.includeQuizzes,
              // },
            ].map((toggle) => (
              <div
                key={`toggle-${toggle.key}`}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl"
                style={{
                  background: "rgba(45, 55, 72, 0.3)",
                  border: "1px solid rgba(45, 55, 72, 0.5)",
                }}
              >
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#F9FAFB" }}
                  >
                    {toggle.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                    {toggle.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateFormData({ [toggle.key]: !toggle.value })
                  }
                  className="relative flex-shrink-0 w-11 h-6 rounded-full transition-all duration-300 ml-4"
                  style={{
                    background: toggle.value
                      ? "linear-gradient(135deg, #7C3AED, #9F67FF)"
                      : "rgba(45, 55, 72, 0.6)",
                    boxShadow: toggle.value
                      ? "0 0 10px rgba(124, 58, 237, 0.4)"
                      : "none",
                  }}
                  aria-label={toggle.label}
                  role="switch"
                  aria-checked={toggle.value}
                >
                  <motion.div
                    animate={{ x: toggle.value ? 22 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onPrev}
            className="btn-secondary flex items-center gap-2 px-5 py-3 text-sm font-semibold"
          >
            <ArrowLeft size={15} />
            Back
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary flex items-center gap-2 px-6 py-3 text-sm font-semibold"
          >
            <Sparkles size={15} />
            Generate My Roadmap
            <ArrowRight size={15} />
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default StepTwo;
