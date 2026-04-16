import React from "react";

const StateCardSkeleton = () => {
  return (
    <div>
      {/* Title Skeleton */}
      <div className="h-3 w-28 bg-[#1f2937] rounded mb-4 animate-pulse" />

      {/* Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="relative rounded-2xl p-5 bg-[#0f172a] border border-[#1f2937] overflow-hidden"
          >
            {/* shimmer */}
            <div className="absolute inset-0 shimmer" />

            {/* icon */}
            <div className="h-10 w-10 bg-[#1f2937] rounded-xl mb-6" />

            {/* value */}
            <div className="h-8 w-16 bg-[#1f2937] rounded mb-2" />

            {/* label */}
            <div className="h-3 w-24 bg-[#1f2937] rounded mb-3" />

            {/* trend */}
            <div className="h-3 w-20 bg-[#1f2937] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateCardSkeleton;