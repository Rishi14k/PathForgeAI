import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {  useDispatch, useSelector } from "react-redux";
import { Sparkles, Target, Clock, Trophy, ChevronRight, ArrowLeft } from "lucide-react";
import CareerCard from "./CareerCard";
import { useNavigate } from "react-router-dom";
import { getDiscoveryResultThunk } from "../../../redux/features/dashboard/usageSlice";

const DiscoveryResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { result, loading } = useSelector((state) => state.discovery);
  const {results} = useSelector((state)=>state.usage)

  // Use the specific nested array you mentioned: discoveryProfile.aiSuggestions
  const suggestions = result.data || results.data || [];
  // console.log("data", suggestions);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (!loading && suggestions.length === 0) {
      navigate("/dashboard/discovery"); // or wherever your start page is
    }
  }, [suggestions, loading, navigate]);

  useEffect(()=>{
    dispatch(getDiscoveryResultThunk)
  },[dispatch])

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <button
            onClick={() => navigate("/dashboard/discovery")}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Discovery
          </button>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            Discovery Results <Sparkles className="text-yellow-400" />
          </h2>
          <p className="text-gray-400">
            Based on your style, here are your best matched career paths.
          </p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {suggestions.length > 0 ? (
          suggestions?.map((career, index) => (
            <motion.div variants={item} key={index}>
              <CareerCard
                career={{
                  title: career?.title,
                  description: career?.description,
                  matchScore: career?.matchScore,
                  skills: career?.skills,
                  duration: career?.duration,
                }}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-dashed border-gray-800 rounded-3xl">
            <p className="text-gray-500">
              No suggestions found. Try adjusting your inputs.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DiscoveryResults;
