import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Plus,
  Palette,
  Puzzle,
  Cpu,
  Globe,
  BarChart3,
  Gamepad2,
  Hammer,
  BookOpenCheck,
  SearchCode,
  Users2,
  BugPlay,
  Eye,
  FileText,
  Ear,
  Zap,
} from "lucide-react";
import { toast } from "react-toastify";

const predefinedInterests = [
  { id: "int-design", label: "Designing", icon: <Palette size={20} /> },
  { id: "int-solve", label: "Problem Solving", icon: <Puzzle size={20} /> },
  { id: "int-ai", label: "AI & Technology", icon: <Cpu size={20} /> },
  { id: "int-web", label: "Building Websites", icon: <Globe size={20} /> },
  { id: "int-data", label: "Data Analysis", icon: <BarChart3 size={20} /> },
  { id: "int-games", label: "Games", icon: <Gamepad2 size={20} /> },
];

const experienceLevels = [
  { id: "lvl-beg", value: "beginner", label: "Beginner", color: "#10B981" },
  {
    id: "lvl-int",
    value: "intermediate",
    label: "Intermediate",
    color: "#F59E0B",
  },
  { id: "lvl-adv", value: "advanced", label: "Advanced", color: "#EF4444" },
];

const predefinedActivities = [
  { id: "act-build", label: "Building Projects", icon: <Hammer size={20} /> },
  {
    id: "act-learn",
    label: "Learning New Skills",
    icon: <BookOpenCheck size={20} />,
  },
  {
    id: "act-research",
    label: "Researching Ideas",
    icon: <SearchCode size={20} />,
  },
  { id: "act-team", label: "Team Collaboration", icon: <Users2 size={20} /> },
  { id: "act-debug", label: "Debugging Problems", icon: <BugPlay size={20} /> },
];

const predefinedLearningStyles = [
  { id: "ls-visual", label: "Visual", icon: <Eye size={20} /> },
  { id: "ls-reading", label: "Reading/Writing", icon: <FileText size={20} /> },
  { id: "ls-audio", label: "Listening", icon: <Ear size={20} /> },
  { id: "ls-hands", label: "Hands-on Practice", icon: <Zap size={20} /> },
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
      interests: formData.interests || [],
      thinkingStyle: formData.thinkingStyle || "",
      experienceLevel: formData.experienceLevel || "beginner",
      activities: formData.activities || [],
      problemApproach: formData.problemApproach || "",
      learningStyle: formData.learningStyle || [],
    },
  });

  const selectedInterests = watch("interests");
  const selectedLevel = watch("experienceLevel");
  const selectedActivities = watch("activities");
  const selectedLearningStyles = watch("learningStyle");
  const [customInput, setCustomInput] = React.useState("");
  const [activityInput, setActivityInput] = React.useState("");
  const [learningInput, setLearningInput] = React.useState("");

  const toggleMultiSelect = (field, value, selected) => {
    const updated = selected.includes(value)
      ? selected.filter((i) => i !== value)
      : [...selected, value];

    setValue(field, updated);
    updateFormData({ [field]: updated });
  };

  const toggleInterest = (label) => {
    const current = selectedInterests;
    const updated = current.includes(label)
      ? current.filter((i) => i !== label)
      : [...current, label];
    setValue("interests", updated);
    updateFormData({ interests: updated });
  };

  const addCustomValue = (e, field, inputValue, setInput, selected) => {
    e.preventDefault();

    const value = inputValue.trim();

    if (!value) return;

    if (selected.includes(value)) return;

    const updated = [...selected, value];

    setValue(field, updated);
    updateFormData({ [field]: updated });

    setInput("");
  };

  const onSubmit = (data) => {
    if (!data.interests?.length)
      return toast.error("Select at least one interest");

    if (!data.activities?.length) {
      return toast.error("Select at least one activity");
    }

    if (!data.thinkingStyle) return toast.error("Select thinking style");

    if (!data.experienceLevel) return toast.error("Select experience level");

    if (!data.activities?.length)
      return toast.error("Select at least one activity");

    if (!data.learningStyle?.length)
      return toast.error("Select learning style");

    // problemApproach OPTIONAL ✅

    // console.log("form data", data);
    updateFormData(data);
    onNext();
  };

  const cardStyle = (isSelected) => ({
    background: isSelected
      ? "rgba(124, 58, 237, 0.2)"
      : "rgba(45, 55, 72, 0.3)",
    border: isSelected
      ? "1px solid rgba(124, 58, 237, 0.5)"
      : "1px solid rgba(45, 55, 72, 0.5)",
    color: isSelected ? "#9F67FF" : "#9CA3AF",
    boxShadow: isSelected ? "0 0 12px rgba(124, 58, 237, 0.2)" : "none",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-0">
      <div
        className="rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8"
        style={{
          background: "rgba(17, 24, 39, 0.8)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
        }}
      >
        {/* --- Interests Section --- */}
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            style={{ color: "#F9FAFB" }}
          >
            What sparks your interest?
          </label>
          <p className="text-xs mb-4" style={{ color: "#9CA3AF" }}>
            Select the areas you're most passionate about.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {predefinedInterests.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleInterest(item.label)}
                // Added 'group' and hover border color
                className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:border-violet-500/50 border border-transparent"
                style={cardStyle(selectedInterests.includes(item.label))}
              >
                {/* Icon scales slightly on hover */}
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>

                {/* Label with hover gradient */}
                <span className="truncate transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400">
                  {item.label}
                </span>
              </motion.button>
            ))}

            {/* Custom Tags Section */}
            {selectedInterests
              .filter((i) => !predefinedInterests.find((p) => p.label === i))
              .map((tag) => (
                <motion.button
                  key={tag}
                  type="button"
                  onClick={() => toggleInterest(tag)}
                  // Consistent hover logic for custom tags
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:border-violet-500/50 border border-transparent"
                  style={cardStyle(true)}
                >
                  <span className="transition-transform duration-300 group-hover:rotate-12">
                    ✨
                  </span>
                  <span className="truncate transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400">
                    {tag}
                  </span>
                </motion.button>
              ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Add other interest..."
              className="flex-1 bg-transparent border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:border-violet-500 outline-none"
            />
            <button
              onClick={(e) =>
                addCustomValue(
                  e,
                  "interests",
                  customInput,
                  setCustomInput,
                  selectedInterests,
                )
              }
              className="p-2 bg-gray-800 rounded-xl text-gray-400 hover:text-white"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* --- Activities Section --- */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">
            Activities you enjoy
          </label>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            {predefinedActivities.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() =>
                  toggleMultiSelect(
                    "activities",
                    item.label,
                    selectedActivities,
                  )
                }
                style={cardStyle(selectedActivities.includes(item.label))}
                // Added 'group', 'transition-all', and hover border reveal
                className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all border border-transparent hover:border-violet-500/40"
              >
                {/* Icon with scaling micro-interaction */}
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>

                {/* Label with hover gradient effect */}
                <span className="truncate transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>

          {selectedActivities
            .filter((i) => !predefinedActivities.find((p) => p.label === i))
            .map((tag) => (
              <motion.button
                key={tag}
                type="button"
                onClick={() =>
                  toggleMultiSelect(
                    "activities",
                    item.label,
                    selectedActivities,
                  )
                }
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={cardStyle(true)}
              >
                <span>✨</span>
                <span className="truncate">{tag}</span>
              </motion.button>
            ))}

          {/* Custom Activity */}
          <div className="flex mt-4 gap-2">
            <input
              value={activityInput}
              onChange={(e) => setActivityInput(e.target.value)}
              placeholder="Add custom activity..."
              className="flex-1 bg-transparent border border-gray-700 rounded-xl px-4 py-2 text-sm text-white"
            />

            <button
              type="button"
              onClick={(e) =>
                addCustomValue(
                  e,
                  "activities",
                  activityInput,
                  setActivityInput,
                  selectedActivities,
                )
              }
              className="p-2 bg-gray-800 rounded-xl"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        {/* --- Thinking Style & Experience --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: "#F9FAFB" }}
            >
              Thinking Style
            </label>
            <select
              {...register("thinkingStyle")}
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-3 text-sm text-white outline-none focus:ring-1 focus:ring-violet-500"
            >
              <option value="">Select your style</option>
              <option value="analytical">Analytical / Logical</option>
              <option value="creative">Creative / Visionary</option>
              <option value="practical">Practical / Hands-on</option>
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: "#F9FAFB" }}
            >
              Experience Level
            </label>
            <div className="flex gap-2">
              {experienceLevels.map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => {
                    setValue("experienceLevel", lvl.value);
                    updateFormData({ experienceLevel: lvl.value });
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${selectedLevel === lvl.value ? "opacity-100 scale-105" : "opacity-40 border-gray-700 grayscale"}`}
                  style={{
                    backgroundColor: `${lvl.color}20`,
                    borderColor: lvl.color,
                    color: lvl.color,
                  }}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- Open Ended Inputs --- */}
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-semibold mb-1"
              style={{ color: "#F9FAFB" }}
            >
              Approach
            </label>
            <textarea
              {...register("problemApproach")}
              placeholder="How do you usually approach a complex problem?"
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-3 text-sm text-white h-20 outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
          {/* --- Learning Style --- */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Preferred Learning Style
            </label>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
              {predefinedLearningStyles.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    toggleMultiSelect(
                      "learningStyle",
                      item.label,
                      selectedLearningStyles,
                    )
                  }
                  style={cardStyle(selectedLearningStyles.includes(item.label))}
                  // Added group and hover border reveal
                  className="group flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all border border-transparent hover:border-violet-500/40"
                >
                  {/* Icon with scale effect */}
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>

                  {/* Label with hover gradient */}
                  <span className="truncate transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {selectedLearningStyles
              .filter(
                (i) => !predefinedLearningStyles.find((p) => p.label === i),
              )
              .map((tag) => (
                <motion.button
                  key={tag}
                  type="button"
                  onClick={() =>
                    toggleMultiSelect(
                      "learningStyle",
                      item.label,
                      selectedLearningStyles,
                    )
                  }
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={cardStyle(true)}
                >
                  <span>✨</span>
                  <span className="truncate">{tag}</span>
                </motion.button>
              ))}

            {/* Custom Learning Style */}
            <div className="flex mt-4 gap-2">
              <input
                value={learningInput}
                onChange={(e) => setLearningInput(e.target.value)}
                placeholder="Add learning preference..."
                className="flex-1 bg-transparent border border-gray-700 rounded-xl px-4 py-2 text-sm text-white"
              />

              <button
                type="button"
                onClick={(e) =>
                  addCustomValue(
                    e,
                    "learningStyle",
                    learningInput,
                    setLearningInput,
                    selectedLearningStyles,
                  )
                }
                className="p-2 bg-gray-800 rounded-xl"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* --- Continue Button --- */}
        <div className="flex justify-end pt-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg shadow-violet-500/20"
          >
            <Sparkles size={16} />
            Analyze & Continue
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default StepOne;
