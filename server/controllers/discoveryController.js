const Discovery = require("../models/Discovery");
const User = require("../models/User");
const { demorunDiscovery } = require("../services/demoDiscovery");
const { runDiscoveryAI } = require("../services/discoveryAiService");

const analyzeDiscovery = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const {
      interests,
      activities,
      thinkingStyle,
      problemApproach,
      workPreference,
      motivations,
      learningStyle,
      experienceLevel,
      currentSituation,
      customInput,
    } = req.body;

    if (!interests || interests.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one interest",
      });
    }

    const aiResponse = await demorunDiscovery({
      interests,
      activities,
      thinkingStyle,
      problemApproach,
      workPreference,
      motivations,
      learningStyle,
      experienceLevel,
      currentSituation,
      customInput,
    });

  


    const careers = aiResponse.careers;
    const discoveryProfile = await Discovery.create({
      userId,
      interests,
      activities,
      thinkingStyle,
      problemApproach,
      workPreference,
      motivations,
      learningStyle,
      experienceLevel,
      currentSituation,
      customInput,
      aiSuggestions: careers,
    });

      const discoveryCount = await User.findByIdAndUpdate(userId, {
      $inc: { discoveryGenerated: 1 },
    });
    return res.status(200).json({
      success: true,
      message: "Career discovery completed",
      data: discoveryProfile.aiSuggestions,
      discoveryCount:discoveryCount.discoveryGenerated
    });
  } catch (error) {
    console.error("Discovery Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze discovery profile",
    });
  }
};

module.exports = {
  analyzeDiscovery,
};
