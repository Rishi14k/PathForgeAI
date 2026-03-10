const rateLimit = require('express-rate-limit')

const roadmapLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.user.userId, // limit per user
  message: {
    success: false,
    message: "Too many roadmap requests. Please wait a minute.",
  },
});

module.exports = roadmapLimiter