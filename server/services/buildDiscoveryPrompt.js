const buildDiscoveryPrompt = (data) => {
  // Helper to safely handle both arrays and strings
  // console.log("dayaa",data)
  const safeJoin = (val) => {
    if (Array.isArray(val)) return val.join(", ");
    return val || "Not provided";
  };

  return `
Analyze this beginner user's personality and recommend 5 suitable tech career paths.

USER PROFILE:

Interests: ${safeJoin(data.interests)}
Activities Enjoyed: ${safeJoin(data.activities)}
Thinking Style: ${safeJoin(data.thinkingStyle)}
Problem Approach: ${safeJoin(data.problemApproach)}
Work Preference: ${safeJoin(data.workPreference)}
Motivations: ${safeJoin(data.motivations)}
Learning Style: ${safeJoin(data.learningStyle)}
Experience Level: ${data.experienceLevel || "Beginner"}
Current Situation: ${data.currentSituation || "Not specified"}
Additional Notes: ${data.customInput || "None"}

IMPORTANT RULES:
- Recommend 5 career options
- Keep explanations simple
- Provide realistic matches
- Score match between 60–100

Return ONLY JSON in this format:
{
  "careers": [
    {
      "title": "",
      "description": "",
      "matchScore": 0,
      "skills": [],
      "duration": "",
      "why": ""
    }
  ]
}
`;
};

module.exports = buildDiscoveryPrompt;
