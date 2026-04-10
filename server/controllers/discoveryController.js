const Discovery = require("../models/Discovery");
const User = require("../models/User");
const { demorunDiscovery } = require("../services/demoDiscovery");
const { runDiscoveryAI } = require("../services/discoveryAiService");
const { canUseDiscovery } = require("../utils/accessControl");

const analyzeDiscovery = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const user = await User.findById(userId);

    if (!canUseDiscovery(user)) {
      return res.status(403).json({
        code: "PAYMENT_REQUIRED",
        message: "Upgrade to use more discovery",
      });
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
      discoveryCount: discoveryCount.discoveryGenerated,
    });
  } catch (error) {
    console.error("Discovery Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze discovery profile",
    });
  }
};

const getDiscoveryResult = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User identity not verified",
      });
    }

    const latestDiscovery = await Discovery.findOne({ userId }).sort({
      createdAt: -1,
    });
    if (!latestDiscovery) {
      return res.status(404).json({
        success: false,
        message: "No discovery history found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      data: latestDiscovery.aiSuggestions,
      createdAt: latestDiscovery.createdAt // Optional: useful to show "Generated on..."
    });

  } catch (error) {
    console.error("Error fetching latest discovery:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while retrieving results",
    });
  }
};

module.exports = {
  analyzeDiscovery,
  getDiscoveryResult
};
