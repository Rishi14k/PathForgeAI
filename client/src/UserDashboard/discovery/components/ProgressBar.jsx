import React from "react";

const ProgressBar = ({ currentStep, totalSteps = 4 }) => {
  // Ensure progress never exceeds 100% or goes below 0%
  const percentage = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <div className="w-full mb-10 group">
      <div className="flex justify-between items-end mb-3">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Current Progress
          </p>
          <p className="text-2xl font-black text-white">
            Step {currentStep} <span className="text-gray-600">/ {totalSteps}</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm font-mono font-medium text-primary">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      <div className="w-full h-3 bg-gray-800/50 rounded-full overflow-hidden p-[2px] border border-gray-700/50">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(147,51,234,0.4)]"
        />
      </div>
    </div>
  );
};

export default ProgressBar;