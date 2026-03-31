import { Check } from "lucide-react";
import React from "react";

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center gap-0 ">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step;
        const isActive = currentStep === step;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`step-indicator ${isCompleted ? "step-completed" : isActive ? "step-active" : "step-inactive"}`}
              >
                {isCompleted ? <Check size={14} /> : <span>{step.number}</span>}
              </div>
              <span
                className="text-xs font-medium hidden sm:block"
                style={{
                  color: isActive
                    ? "#F9FAFB"
                    : isCompleted
                      ? "#10B981"
                      : "#6B7280",
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className="flex-1 h-px mx-3 mb-5"
                style={{
                  background:
                    currentStep > step.number
                      ? "linear-gradient(90deg, #10B981, rgba(16,185,129,0.3))"
                      : "rgba(45, 55, 72, 0.5)",
                  transition: "background 0.4s ease",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
