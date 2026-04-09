import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

const ProgressChart = ({ roadmap, progress, weeks }) => {
  // console.log("roadmap", roadmap);
  // console.log("progress", progress);

  const navigate = useNavigate();

  const styleIcon = {
    visual: "👁️",
    "hands-on": "🛠️",
    reading: "📚",
    auditory: "🎧",
  };

  const weekDone = weeks.filter((week) => week.isCompleted).length;
  const totalWeeks = weeks.length;
  const completionData = [
    {
      name: "Progress",
      value: `${progress?.progressPercent}`,
      fill: "#7C3AED",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-5"
    >
      {/* <div
        className="lg:col-span-2 rounded-2xl p-6"
        style={{
          background: "rgba(17, 24, 39, 0.8)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>
              Weekly Task Activity
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
              Tasks completed per day this week
            </p>
          </div>
          <div
            className="text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{
              background: "rgba(124, 58, 237, 0.1)",
              color: "#9F67FF",
              border: "1px solid rgba(124, 58, 237, 0.2)",
            }}
          >
            This Week
          </div>
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyData} barCategoryGap="30%" barGap={4}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9F67FF" stopOpacity={1} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.7} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(45,55,72,0.4)"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#6B7280", fontSize: 12, fontFamily: "DM Sans" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#6B7280",
                fontSize: 11,
                fontFamily: "IBM Plex Mono",
              }}
              axisLine={false}
              tickLine={false}
              width={24}
            />

            <Tooltip
              content={<CustomBarTooltip />}
              cursor={{ fill: "rgba(124, 58, 237, 0.06)", radius: 6 }}
            />
            <Bar
              dataKey="target"
              fill="rgba(45,55,72,0.4)"
              radius={[4, 4, 0, 0]}
            />
            <Bar dataKey="tasks" fill="url(#barGradient)" radius={[4, 4, 0, 0]}>
              {weeklyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.tasks >= entry.target
                      ? "url(#barGradient)"
                      : "url(#barGradient)"
                  }
                  opacity={entry.tasks >= entry.target ? 1 : 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{
                background: "linear-gradient(135deg, #9F67FF, #7C3AED)",
              }}
            />
            <span className="text-xs" style={{ color: "#9CA3AF" }}>
              Completed
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ background: "rgba(45,55,72,0.5)" }}
            />
            <span className="text-xs" style={{ color: "#9CA3AF" }}>
              Daily Target
            </span>
          </div>
        </div>
      </div> */}


       <div
        className="rounded-2xl p-6 flex flex-col justify-between"
        style={{
          background: "rgba(17, 24, 39, 0.8)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
        }}
      >
        {/* Header */}
        <div>
          <h3
            className="text-sm font-semibold mb-2"
            style={{ color: "#F9FAFB" }}
          >
            Generate New Roadmap
          </h3>

          <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
            Ready to level up? Create a fresh AI roadmap based on your new
            goals, interests, and learning preferences.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/dashboard/generate-roadmap")}
          className="flex items-center justify-center gap-3 mt-6 w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #9F67FF)",
            color: "#FFFFFF",
            border: "1px solid rgba(124,58,237,0.4)",
          }}
        >
              <span><Zap size={15} /></span>
          Generate Roadmap
        </button>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(17, 24, 39, 0.8)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
        }}
      >
        <h3 className="text-sm font-semibold mb-1" style={{ color: "#F9FAFB" }}>
          Learning Preferences
        </h3>

        <p className="text-xs mb-6" style={{ color: "#9CA3AF" }}>
          Personalized learning style detected by AI
        </p>

        {/* Learning Styles */}
        <div className="mb-5">
          <p className="text-xs mb-2" style={{ color: "#9CA3AF" }}>
            Learning Styles For Roadmap {roadmap?.goal}
          </p>

          <div className="flex flex-wrap gap-2">
            {roadmap?.learningStyles &&
              roadmap?.learningStyles?.map((style, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-md rounded-lg font-medium"
                  style={{
                    background: "rgba(124,58,237,0.12)",
                    color: "#C4B5FD",
                    border: "1px solid rgba(124,58,237,0.25)",
                  }}
                >
                  {styleIcon[style]} {style}{" "}
                </span>
              ))}
          </div>
        </div>

        {/* Resource Preferences */}
        <div>
          <p className="text-xs mb-2" style={{ color: "#9CA3AF" }}>
            Resource Preference
          </p>

          <div className="flex flex-wrap gap-2">
            {roadmap?.resourcePreferences &&
              roadmap?.resourcePreferences?.map((res, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-md rounded-lg font-medium"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    color: "#6EE7B7",
                    border: "1px solid rgba(16,185,129,0.25)",
                  }}
                >
                  {res}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* circular progress  */}

      <div
        className="rounded-2xl p-6 flex flex-col items-center justify-center"
        style={{
          background: "rgba(17, 24, 39, 0.8)",
          border: "1px solid rgba(45, 55, 72, 0.5)",
        }}
      >
        <h3
          className="text-sm font-semibold mb-1 self-start"
          style={{ color: "#F9FAFB" }}
        >
          Roadmap Progress
        </h3>
        <p className="text-xs mb-6 self-start" style={{ color: "#9CA3AF" }}>
          {roadmap?.goal}
        </p>

        <div className="relative flex items-center justify-center">
          <ResponsiveContainer width={160} height={160}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="90%"
              barSize={10}
              data={completionData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={5}
                background={{ fill: "rgba(45,55,72,0.3)" }}
              >
                <Cell fill="url(#radialGradient)" />
              </RadialBar>
              <defs>
                <linearGradient id="radialGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>
              </defs>
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-3xl font-bold mono"
              style={{ color: "#F9FAFB", fontVariantNumeric: "tabular-nums" }}
            >
              {progress?.progressPercent}%
            </span>
            <span className="text-xs" style={{ color: "#9CA3AF" }}>
              complete
            </span>
          </div>
        </div>

        <div className="w-full space-y-3 mt-4">
          {[
            {
              label: "Tasks done",
              value: `${progress?.completedTasks}/${progress?.totalTasks}`,
              color: "#10B981",
            },
            {
              label: "Weeks done",
              value: `${weekDone}/${totalWeeks}`,
              color: "#7C3AED",
            },
            {
              label: "Daily Study Time",
              value: `${roadmap?.dailyStudyTime} hrs`,
              color: "#F59E0B",
            },
          ].map((item) => (
            <div
              key={`progress-meta-${item.label}`}
              className="flex items-center justify-between"
            >
              <span className="text-xs" style={{ color: "#9CA3AF" }}>
                {item.label}
              </span>
              <span
                className="text-xs font-semibold mono"
                style={{
                  color: item.color,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

     
    </motion.div>
  );
};

export default ProgressChart;
