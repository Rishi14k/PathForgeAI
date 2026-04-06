const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    skillLevel: {
      type: String,
      required: true,
    },
    dailyStudyTime: {
      type: Number,
      required: true,
    },
    durationWeeks: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "archived"],
    },
    aiRawResponse: {
      type: String,
      required: true,
    },
    aiProvider: {
      type: String,
      default: "gemini",
    },
    learningStyles: {
      type: [String],
      default: [],
    },

    resourcePreferences: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

roadmapSchema.index({ userId: 1 });
const Roadmap = mongoose.model("Roadmap", roadmapSchema);

module.exports = Roadmap;
