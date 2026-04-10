const express = require("express");
const {
  generateRoadmap,
  getRoadmapById,
  toggleTaskCompletion,
  getProgreesForRoadmap,
  getWeekProgress,
  getMyRoadMap,
  getStreak,
  dashBoardState,
  toggleProjectCompletion,
  getUserProgress,
  getUsageStatus,
} = require("../controllers/roadmapController");
const {analyzeDiscovery, getDiscoveryResult}  = require('../controllers/discoveryController')
const authMiddleware = require("../middlewares/authMiddleware");
const roadmapLimiter = require("../middlewares/roadmapLimiter");
const router = express.Router();

router.post(
  "/generate-roadmap",
  authMiddleware,
  roadmapLimiter,
  generateRoadmap,
);
router.get("/roadmap/:id", authMiddleware, getRoadmapById);

router.patch("/tasks/:taskId/toggle", authMiddleware,toggleTaskCompletion);
router.patch("/weeks/:id/toggle-project",authMiddleware,toggleProjectCompletion)

router.get("/progress/roadmaps/:roadmapId", getProgreesForRoadmap);

router.get("/progress/roadmaps/:roadmapId/weeks/:weekNumber", getWeekProgress);

router.get("/user/roadmaps", authMiddleware, getMyRoadMap);

router.get("/streak", authMiddleware, getStreak);
router.get("/dashboard/state", authMiddleware, dashBoardState);

router.get('/user/progress',authMiddleware,getUserProgress)


router.post('/discovery/analyze',authMiddleware,analyzeDiscovery)
router.get('/discovery/result',authMiddleware,getDiscoveryResult)


router.get('/usage-status',authMiddleware,getUsageStatus)

module.exports = router;
