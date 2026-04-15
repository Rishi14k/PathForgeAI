import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Zap,
  Plus,
  Paintbrush,
  Binary,
  Wrench,
  Users,
  User,
} from "lucide-react";
import { toast } from "react-toastify";

const workStyles = [
  { id: "style-creative", label: "Creative", icon: <Paintbrush size={20} /> },
  { id: "style-logical", label: "Logical", icon: <Binary size={20} /> },
  { id: "style-hands", label: "Hands-on", icon: <Wrench size={20} /> },
  { id: "style-team", label: "Team Work", icon: <Users size={20} /> },
  { id: "style-indie", label: "Independent", icon: <User size={20} /> },
];
const StepTwo = ({ formData, updateFormData, onNext, onPrev }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      workPreference: formData.workPreference || [],
      motivations: formData.motivations || "",
      currentSituation: formData.currentSituation || "",
      customInput: formData.customInput || "",
    },
  });

  const selectedPrefs = watch("workPreference");
  const [customTag, setCustomTag] = React.useState("");

  const togglePreference = (label) => {
    const current = selectedPrefs;
    const updated = current.includes(label)
      ? current.filter((i) => i !== label)
      : [...current, label];
    setValue("workPreference", updated);
    updateFormData({ workPreference: updated });
  };

  const addCustomTag = (e) => {
    e.preventDefault();
    if (customTag && !selectedPrefs.includes(customTag)) {
      const updated = [...selectedPrefs, customTag];
      setValue("workPreference", updated);
      updateFormData({ workPreference: updated });
      setCustomTag("");
    }
  };

  const onSubmit = (data) => {
    if (!data.workPreference.length) {
      return toast.error("please select at least one work style");
    }
    if (!data.motivations.length) {
      return toast.error("please enter what motivates you");
    }
    if (!data.currentSituation.length) {
      return toast.error("please enter your current situation");
    }

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div
        className="rounded-2xl p-6 lg:p-8 space-y-8"
        style={{
          background: "rgba(17, 24, 39, 0.8)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
        }}
      >
        {/* --- Work Preference Section --- */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-white">
            How do you like working?
          </label>
          <p className="text-xs mb-4 text-gray-400">
            Select your preferred environments or work styles.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {workStyles.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => togglePreference(item.label)}
                // Added 'group', 'border-transparent', and hover border
                className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border border-transparent hover:border-violet-500/40"
                style={cardStyle(selectedPrefs.includes(item.label))}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="truncate transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400">
                  {item.label}
                </span>
              </motion.button>
            ))}

            {/* Custom tags rendered as selected buttons */}
            {selectedPrefs
              .filter((p) => !workStyles.find((ws) => ws.label === p))
              .map((tag) => (
                <motion.button
                  key={tag}
                  type="button"
                  onClick={() => togglePreference(tag)}
                  // Applied the same hover logic to custom tags
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border border-transparent hover:border-violet-500/40"
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
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Add another work style..."
              className="flex-1 bg-transparent border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:border-violet-500 outline-none"
            />
            <button
              onClick={addCustomTag}
              className="p-2 bg-gray-800 rounded-xl text-gray-400 hover:text-white"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* --- Motivations & Current Situation --- */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              What motivates you?
            </label>
            <div className="relative">
              <Heart
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <input
                {...register("motivations")}
                placeholder="e.g. Financial freedom, solving complex problems, helping others..."
                className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-3 pl-10 text-sm text-white outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Current Situation
            </label>
            <div className="relative">
              <Zap className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                {...register("currentSituation")}
                placeholder="e.g. 3rd year CS student, looking for career change, intern..."
                className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-3 pl-10 text-sm text-white outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>

        {/* --- Custom Input / Anything Else --- */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-white">
            Anything else we should know?
          </label>
          <textarea
            {...register("customInput")}
            placeholder="Tell us any specific goals or unique traits..."
            className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-3 text-sm text-white h-24 outline-none focus:ring-1 focus:ring-violet-500 resize-none"
          />
        </div>

        {/* --- Navigation Buttons --- */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 px-4 py-2 sm:px-8 sm:py-3 rounded-xl font-bold shadow-lg shadow-violet-500/20"
          >
            Discover
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default StepTwo;
