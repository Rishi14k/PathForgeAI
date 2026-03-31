import React, { useMemo, useState } from "react";
import RoadmapHeader from "./RoadmapHeader";
import RoadmapFiltersBar from "./RoadmapFiltersBar";
import RoadmapCard from "./RoadmapCard";
import { motion } from "framer-motion";

export const allRoadmaps = [
  {
    id: "roadmap-react-2024",
    title: "Full-Stack React Developer",
    topic: "React",
    description:
      "Master React from hooks to advanced patterns, context, performance optimization, and full-stack integration with Next.js.",
    status: "active",
    totalWeeks: 8,
    completedWeeks: 1,
    totalTasks: 32,
    completedTasks: 14,
    progress: 44,
    weeklyHours: 10,
    skillLevel: "Intermediate",
    tags: ["React", "Next.js", "TypeScript", "Hooks"],
    lastActivity: "2 hours ago",
    createdAt: "Mar 28, 2026",
    aiGenerated: true,
    streak: 7,
  },
  {
    id: "roadmap-python-ml",
    title: "Python for Machine Learning",
    topic: "Machine Learning",
    description:
      "Go from Python basics to building production ML models with scikit-learn, pandas, and PyTorch.",
    status: "active",
    totalWeeks: 10,
    completedWeeks: 3,
    totalTasks: 40,
    completedTasks: 12,
    progress: 30,
    weeklyHours: 8,
    skillLevel: "Beginner",
    tags: ["Python", "ML", "PyTorch", "Data Science"],
    lastActivity: "1 day ago",
    createdAt: "Mar 15, 2026",
    aiGenerated: true,
    streak: 3,
  },
  {
    id: "roadmap-system-design",
    title: "System Design Fundamentals",
    topic: "System Design",
    description:
      "Learn to design scalable distributed systems, databases, caching, load balancing, and microservices.",
    status: "paused",
    totalWeeks: 6,
    completedWeeks: 2,
    totalTasks: 24,
    completedTasks: 8,
    progress: 33,
    weeklyHours: 6,
    skillLevel: "Advanced",
    tags: ["System Design", "Distributed Systems", "Databases"],
    lastActivity: "5 days ago",
    createdAt: "Mar 1, 2026",
    aiGenerated: true,
    streak: 0,
  },
  {
    id: "roadmap-typescript",
    title: "TypeScript Mastery",
    topic: "TypeScript",
    description:
      "Deep dive into TypeScript generics, utility types, decorators, and advanced type inference patterns.",
    status: "completed",
    totalWeeks: 4,
    completedWeeks: 4,
    totalTasks: 16,
    completedTasks: 16,
    progress: 100,
    weeklyHours: 5,
    skillLevel: "Intermediate",
    tags: ["TypeScript", "JavaScript", "Type Safety"],
    lastActivity: "Feb 20, 2026",
    createdAt: "Feb 1, 2026",
    aiGenerated: true,
    streak: 0,
  },
  {
    id: "roadmap-docker-k8s",
    title: "Docker & Kubernetes for Developers",
    topic: "DevOps",
    description:
      "Containerize applications, orchestrate with Kubernetes, set up CI/CD pipelines, and deploy to cloud.",
    status: "active",
    totalWeeks: 5,
    completedWeeks: 0,
    totalTasks: 20,
    completedTasks: 2,
    progress: 10,
    weeklyHours: 7,
    skillLevel: "Intermediate",
    tags: ["Docker", "Kubernetes", "CI/CD", "DevOps"],
    lastActivity: "3 hours ago",
    createdAt: "Mar 29, 2026",
    aiGenerated: true,
    streak: 1,
  },
  {
    id: "roadmap-graphql",
    title: "GraphQL API Development",
    topic: "Backend",
    description:
      "Build powerful GraphQL APIs with Apollo Server, schema design, resolvers, subscriptions, and authentication.",
    status: "completed",
    totalWeeks: 3,
    completedWeeks: 3,
    totalTasks: 12,
    completedTasks: 12,
    progress: 100,
    weeklyHours: 6,
    skillLevel: "Intermediate",
    tags: ["GraphQL", "Apollo", "Node.js", "API"],
    lastActivity: "Jan 15, 2026",
    createdAt: "Jan 1, 2026",
    aiGenerated: false,
    streak: 0,
  },
  {
    id: "roadmap-aws",
    title: "AWS Cloud Practitioner to Solutions Architect",
    topic: "Cloud",
    description:
      "From cloud fundamentals to designing resilient, cost-optimized AWS architectures for production workloads.",
    status: "paused",
    totalWeeks: 12,
    completedWeeks: 1,
    totalTasks: 48,
    completedTasks: 4,
    progress: 8,
    weeklyHours: 12,
    skillLevel: "Beginner",
    tags: ["AWS", "Cloud", "Solutions Architect", "DevOps"],
    lastActivity: "2 weeks ago",
    createdAt: "Feb 10, 2026",
    aiGenerated: true,
    streak: 0,
  },
  {
    id: "roadmap-dsa",
    title: "Data Structures & Algorithms",
    topic: "Computer Science",
    description:
      "Master DSA from arrays and linked lists to dynamic programming, graphs, and competitive programming patterns.",
    status: "active",
    totalWeeks: 8,
    completedWeeks: 4,
    totalTasks: 64,
    completedTasks: 32,
    progress: 50,
    weeklyHours: 9,
    skillLevel: "Intermediate",
    tags: ["DSA", "Algorithms", "LeetCode", "Python"],
    lastActivity: "Yesterday",
    createdAt: "Feb 20, 2026",
    aiGenerated: true,
    streak: 4,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const MyroadmapContent = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const filteredRoadmaps = useMemo(() => {
    let result = [...allRoadmaps];

    if (filter !== "all") {
      result = result.filter((r) => r.status === filter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.topic.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (sortBy === "progress") {
      result.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [filter, searchQuery, sortBy]);

  const counts = useMemo(
    () => ({
      all: allRoadmaps.length,
      active: allRoadmaps.filter((r) => r.status === "active").length,
      paused: allRoadmaps.filter((r) => r.status === "paused").length,
      completed: allRoadmaps.filter((r) => r.status === "completed").length,
    }),
    [],
  );

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
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyroadmapContent;
