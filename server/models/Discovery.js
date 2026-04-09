const mongoose = require("mongoose");

const discoverySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interests: [String],
  activities: [String],
  thinkingStyle: [String],
  problemApproach: String,
  workPreference: [String],
  motivations: [String],
  learningStyle: [String],
  experienceLevel: String,
  currentSituation: String,
  customInput: String,

     aiSuggestions: [
      {
        title: String,
        description: String,
        matchScore: Number,
        skills: [String],
        duration: String,
        why: String,
      },
    ],
},{timestamps:true});

const Discovery = mongoose.model("Discovery",discoverySchema)

module.exports = Discovery
