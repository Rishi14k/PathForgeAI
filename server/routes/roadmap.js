const express = require('express')
const { generateRoadmap, getRoadmapById, toggleTaskCompletion, getProgreesForRoadmap, getWeekProgress, getMyRoadMap, getStreak, dashBoardState } = require('../controllers/roadmapController')
const authMiddleware = require('../middlewares/authMiddleware')
const roadmapLimiter = require('../middlewares/roadmapLimiter')
const router = express.Router()

router.post('/generate-roadmap',authMiddleware,roadmapLimiter,generateRoadmap)
router.get('/roadmap/:id',authMiddleware,getRoadmapById)

router.patch("/tasks/:taskId/toggle", toggleTaskCompletion);

router.get("/progress/roadmaps/:roadmapId", getProgreesForRoadmap);

router.get(
  "/progress/roadmaps/:roadmapId/weeks/:weekNumber",
  getWeekProgress
);

router.get('/user/roadmaps/:roadmapId',authMiddleware,getMyRoadMap)

router.get("/streak", authMiddleware, getStreak);
router.get('/dashboard/state',authMiddleware,dashBoardState)

module.exports = router