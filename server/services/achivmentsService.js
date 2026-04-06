const calculateAchievements = ({
  totalTasksDone,
  roadmapsActive,
  hoursLearned = 0,
  streakDays = 0,
}) => {
  return [
    // ⭐ Beginner Milestones
    {
      id: "a1",
      title: "First Steps",
      earned: totalTasksDone >= 1,
    },
    {
      id: "a2",
      title: "Getting Started",
      earned: totalTasksDone >= 5,
    },
    {
      id: "a3",
      title: "Speed Learner",
      earned: totalTasksDone >= 10,
    },

    // 🚀 Productivity
    {
      id: "a4",
      title: "Task Crusher",
      earned: totalTasksDone >= 25,
    },
    {
      id: "a5",
      title: "Half Century",
      earned: totalTasksDone >= 50,
    },
    {
      id: "a6",
      title: "Centurion",
      earned: totalTasksDone >= 100,
    },

    // 🧠 Learning Hours
    {
      id: "a7",
      title: "Focused Mind",
      earned: hoursLearned >= 5,
    },
    {
      id: "a8",
      title: "Deep Learner",
      earned: hoursLearned >= 25,
    },
    {
      id: "a9",
      title: "Knowledge Master",
      earned: hoursLearned >= 100,
    },

    // 📅 Consistency / Streak
    {
      id: "a10",
      title: "Consistency Begins",
      earned: streakDays >= 3,
    },
    {
      id: "a11",
      title: "Weekly Warrior",
      earned: streakDays >= 7,
    },
    {
      id: "a12",
      title: "Unstoppable",
      earned: streakDays >= 30,
    },

    // 🗺️ Roadmap Achievements
    {
      id: "a13",
      title: "Knowledge Seeker",
      earned: roadmapsActive >= 1,
    },
    {
      id: "a14",
      title: "Multi Learner",
      earned: roadmapsActive >= 3,
    },
    {
      id: "a15",
      title: "Explorer",
      earned: roadmapsActive >= 5,
    },
  ];
};

module.exports = {calculateAchievements}