import React, { useMemo, useState } from "react";
import RoadmapHeader from "./RoadmapHeader";
import RoadmapFiltersBar from "./RoadmapFiltersBar";
import RoadmapCard from "./RoadmapCard";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRoadmapLoading,
  selectRoadmaps,
} from "../../../redux/features/dashboard/roadmapSelector";
import { useEffect } from "react";
import { fetchMyRoadmapsThunk } from "../../../redux/features/dashboard/roadmapSlice";
import ProgressLoading from "../../progress/ProgressLoading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const MyroadmapContent = () => {
  const dispatch = useDispatch();
  const allRoadmaps = useSelector(selectRoadmaps) || [];
  const loading = useSelector(selectRoadmapLoading);

  // console.log(allRoadmaps)

  useEffect(() => {
    dispatch(fetchMyRoadmapsThunk());
  }, [dispatch]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const filteredRoadmaps = useMemo(() => {
    if (!allRoadmaps) return [];
    let result = [...allRoadmaps];

    // STATUS FILTER
    if (filter !== "all") {
      result = result.filter((r) => r.status === filter);
    }

    // SEARCH
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();

      result = result.filter(
        (r) =>
          r.goal.toLowerCase().includes(q) ||
          r.skillLevel.toLowerCase().includes(q),
      );
    }

    // SORT
    if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sortBy === "title") {
      result.sort((a, b) => a.goal.localeCompare(b.goal));
    }

    return result;
  }, [allRoadmaps, filter, searchQuery, sortBy]);

  const counts = useMemo(
    () => ({
      all: allRoadmaps.length,
      active: allRoadmaps.filter((r) => r.status === "active").length,
      archived: allRoadmaps.filter((r) => r.status === "archived").length,
      completed: allRoadmaps.filter((r) => r.status === "completed").length,
    }),
    [allRoadmaps],
  );

  if (loading) {
    return <ProgressLoading />;
  }

  return (
    <div className="space-y-6">
      <RoadmapHeader totalCount={allRoadmaps.length} />

      <RoadmapFiltersBar
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        counts={counts}
      />

      {filteredRoadmaps.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{
            background: "rgba(17, 24, 39, 0.5)",
            border: "1px dashed rgba(45, 55, 72, 0.5)",
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "rgba(124, 58, 237, 0.1)",
              border: "1px solid rgba(124, 58, 237, 0.2)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <p
            className="text-base font-semibold mb-1"
            style={{ color: "#F9FAFB" }}
          >
            No roadmaps found
          </p>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            {searchQuery
              ? `No results for "${searchQuery}"`
              : `No ${filter === "all" ? "" : filter + " "}roadmaps yet.`}
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
        >
          {filteredRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap._id} roadmap={roadmap} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyroadmapContent;
