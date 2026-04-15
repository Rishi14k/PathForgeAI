import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  FileText,
  Github,
  Library,
  ListChecks,
  MonitorPlay,
  PenTool,
  Sparkles,
  Terminal,
  Youtube,
} from "lucide-react";
import { toast } from "react-toastify";
const learningStyles = [
  {
    id: "style-visual",
    value: "visual",
    label: "Visual",
    desc: "Diagrams, videos, illustrations",
    icon: <MonitorPlay size={24} />,
  },
  {
    id: "style-reading",
    value: "reading",
    label: "Reading",
    desc: "Articles, docs, books",
    icon: <BookOpen size={24} />,
  },
  {
    id: "style-handson",
    value: "hands-on",
    label: "Hands-on",
    desc: "Projects, coding exercises",
    icon: <Code2 size={24} />,
  },
  {
    id: "style-structured",
    value: "structured",
    label: "Structured",
    desc: "Courses with progression",
    icon: <ListChecks size={24} />,
  },
];

const resourceTypes = [
  {
    id: "res-docs",
    value: "documentation",
    label: "Official Docs",
    icon: <FileText size={18} />,
  },
  {
    id: "res-video",
    value: "video",
    label: "Video Courses",
    icon: <Youtube size={18} />,
  },
  {
    id: "res-blog",
    value: "blog",
    label: "Blog Posts",
    icon: <PenTool size={18} />,
  },
  {
    id: "res-github",
    value: "github",
    label: "GitHub Repos",
    icon: <Github size={18} />,
  },
  {
    id: "res-interactive",
    value: "interactive",
    label: "Interactive",
    icon: <Terminal size={18} />,
  },
  {
    id: "res-books",
    value: "books",
    label: "Books / PDFs",
    icon: <Library size={18} />,
  },
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
    if (!learningStyles) {
      return toast.error("Select one learning style!");
    }
    if (!resourceTypes) {
      return toast.error("Select one resource type!");
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
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleLearningStyle(style.value)}
                  className="group relative flex flex-col items-center gap-3 px-4 py-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-violet-500/40"
                  style={{
                    background: isSelected
                      ? "rgba(124, 58, 237, 0.12)"
                      : "rgba(45, 55, 72, 0.25)",
                    border: isSelected
                      ? "1px solid rgba(124, 58, 237, 0.5)"
                      : undefined,
                    boxShadow: isSelected
                      ? "0 0 20px rgba(124, 58, 237, 0.1)"
                      : "none",
                  }}
                >
                  {/* Icon Container */}
                  <div
                    className={`transition-all duration-300 group-hover:scale-110 ${isSelected ? "text-violet-400" : "text-gray-400 group-hover:text-white"}`}
                  >
                    {style.icon}
                  </div>

                  {/* Text Group */}
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={`text-sm font-bold transition-all duration-300 
              ${
                isSelected
                  ? "text-white"
                  : "text-gray-400 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400"
              }`}
                    >
                      {style.label}
                    </span>
                    <span className="text-[10px] text-center leading-tight text-gray-500 font-medium opacity-80 group-hover:opacity-100">
                      {style.desc}
                    </span>
                  </div>

                  {/* Selected Checkmark (Simplified) */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center bg-violet-500 shadow-lg shadow-violet-500/40"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
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
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleResourceType(res.value)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 border border-transparent hover:border-violet-500/40"
                  style={{
                    background: isSelected
                      ? "rgba(124, 58, 237, 0.12)"
                      : "rgba(45, 55, 72, 0.3)",
                    border: isSelected
                      ? "1px solid rgba(124, 58, 237, 0.4)"
                      : undefined,
                  }}
                >
                  {/* Icon with scaling effect */}
                  <span
                    className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isSelected ? "text-violet-400" : "text-gray-400 group-hover:text-white"}`}
                  >
                    {res.icon}
                  </span>

                  {/* Label with hover gradient */}
                  <span
                    className={`text-sm font-medium transition-all duration-300 truncate
            ${
              isSelected
                ? "text-white"
                : "text-gray-400 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400"
            }`}
                  >
                    {res.label}
                  </span>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="ml-auto flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                    >
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
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
