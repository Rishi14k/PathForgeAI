import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import WelcomeHero from "./WelcomeHero";
import StateCard from "./StateCard";
import RoadmapTimeline from "./RoadmapTimeline";
import ProgressChart from "./ProgressChart";
import EmptyState from "./EmptyState";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoadmapByIdThunk } from "../../../redux/features/dashboard/singleRoadmapSlice";
import UpgradeButton from "../../../components/UpgradeButton";

const DashboardContent = () => {

  const roadmaps = useSelector((state) => state.dashboard.data?.data);
  const roadmapId = roadmaps?.currentRoadmap;
  // const allRoadmaps = useSelector(selectRoadmaps) || [];
  // const roadmapId = allRoadmaps[0]?._id;
  // console.log("id", roadmapId);

    const { roadmap, weeks, progress, loading } = useSelector(
      (state) => state.singleRoadmap,
    );

  // console.log("week",weeks)

  const currentWeekIndex = weeks.findIndex((w) => !w?.isCompleted);
  // console.log("current", currentWeekIndex);

  const dashboardWeeks =
    currentWeekIndex !== -1
      ? weeks.slice(currentWeekIndex, currentWeekIndex + 2)
      : [];

  // console.log("ds", dashboardWeeks);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!roadmapId) return;
    dispatch(fetchRoadmapByIdThunk(roadmapId));
  }, [dispatch, roadmapId]);
 

  const hasroadmap = useSelector(
    (state) => state.dashboard.data?.data?.roadmapGenerated,
  );

  // console.log("has", roadmap);
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
      {/* <UpgradeButton/> */}
      <WelcomeHero />
      <StateCard />

      {hasroadmap !== 0 ? (
        <>
          {roadmapId && <RoadmapTimeline weeksToShow={dashboardWeeks || []} progress={progress} roadmap={roadmap}/>}
          <ProgressChart roadmap={roadmap} progress={progress} weeks={weeks}/>
        </>
      ) : (
        <EmptyState />
      )}
    </motion.div>
  );
};

export default DashboardContent;
