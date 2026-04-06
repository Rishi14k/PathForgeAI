import React from "react";

const ProgressLoading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 bg-gray-900/70 border border-gray-800"
          >
            <div className="w-9 h-9 rounded-xl bg-gray-800 mb-4" />
            <div className="h-6 w-16 bg-gray-800 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-800 rounded" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-2xl bg-gray-900/70 border border-gray-800"
          />
        ))}
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-gray-900/70 border border-gray-800"
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressLoading;
