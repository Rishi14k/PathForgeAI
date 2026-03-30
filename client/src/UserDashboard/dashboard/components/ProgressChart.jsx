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

const weeklyData = [
  { day: "Mon", tasks: 4, target: 5 },
  { day: "Tue", tasks: 6, target: 5 },
  { day: "Wed", tasks: 3, target: 5 },
  { day: "Thu", tasks: 5, target: 5 },
  { day: "Fri", tasks: 7, target: 5 },
  { day: "Sat", tasks: 2, target: 5 },
  { day: "Sun", tasks: 1, target: 5 },
];

const completionData = [{ name: "Progress", value: 68, fill: "#7C3AED" }];

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl px-3 py-2.5"
        style={{
          background: "rgba(17, 24, 39, 0.98)",
          border: "1px solid rgba(45, 55, 72, 0.6)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <p className="text-xs font-semibold mb-1" style={{ color: "#F9FAFB" }}>
          {label}
        </p>
        {payload.map((entry, i) => (
          <p key={`tt-${i}`} className="text-xs" style={{ color: "#9CA3AF" }}>
            <span
              style={{ color: entry.name === "tasks" ? "#7C3AED" : "#374151" }}
            >
              ●
            </span>{" "}
            {entry.name === "tasks" ? "Completed" : "Target"}:{" "}
            <strong style={{ color: "#F9FAFB" }}>{entry.value}</strong>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const ProgressChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-5"
    >
      <div
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
          React Developer path
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
              68%
            </span>
            <span className="text-xs" style={{ color: "#9CA3AF" }}>
              complete
            </span>
          </div>
        </div>

        <div className="w-full space-y-3 mt-4">
          {[
            { label: "Tasks done", value: "14/20", color: "#10B981" },
            { label: "Weeks done", value: "1/8", color: "#7C3AED" },
            { label: "Est. remaining", value: "~18 hrs", color: "#F59E0B" },
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
