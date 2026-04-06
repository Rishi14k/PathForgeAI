import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import WelcomeHero from "./WelcomeHero";
import StateCard from "./StateCard";
import RoadmapTimeline from "./RoadmapTimeline";
import ProgressChart from "./ProgressChart";
import EmptyState from "./EmptyState";
import { useSelector } from "react-redux";

const DashboardContent = () => {

  const hasroadmap = useSelector((state)=>state.dashboard.data?.data?.roadmapGenerated)
//   console.log("first",hasroadmap)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <WelcomeHero />
      <StateCard />

      {hasroadmap !== 0 ? (
        <>
          {/* <RoadmapTimeline/> */}
          <ProgressChart />
        </>
      ) : (
        <EmptyState />
      )}
    </motion.div>
  );
};

export default DashboardContent;
